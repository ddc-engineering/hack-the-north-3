import uuid
import json
import random
import urllib.parse

import requests
from flask import Flask, request, Response
import contentloader as contentloader
from provisions import ProvisionsEngine
from flask_cors import CORS

application = Flask(__name__)

CORS(application)

application.munjoe_db = dict()


small_words = []

with open('/app/small_words.txt') as f:
    for word in f.readlines():
        small_words.append(word.replace("\n", ""))


class SlinkyApp:
    def __init__(self, session_id=None):

        if not session_id:
            session_id = generate_session()
            application.munjoe_db[session_id] = dict()
            application.munjoe_db[session_id]['answers'] = []

            friendly_code = "-".join([random.choice(small_words) for _ in range(0, 2)])
            application.munjoe_db[session_id]['friendlyCode'] = friendly_code

        else:
            if session_id not in application.munjoe_db:
                raise ValueError(f"The session id {session_id} was not found in the database")

        self.session_id = session_id
        self.data = application.munjoe_db[session_id]

        self.questions = contentloader.load_questions('/app/questions.yaml')
        self.provisions = contentloader.load_provisions('/app/questions.yaml')
        print(self.questions)
        self.provisions_engine = ProvisionsEngine(self.provisions)

    def retrieve_last_question(self, question_id):
        return next((question for question in self.questions if question.get('id') == question_id), None)

    def get_first_question(self):
        return self.get_question_by_id(1)

    def get_question_by_id(self, question_id):
        question = next((question for question in self.questions if question.get('id') == question_id), None)
        print(question)
        print(question_id)
        return question
        
    def get_next_question(self, question_id, answer_id):
        self.data['answers'].append({
            'question_id': question_id,
            'answer_id': answer_id
        })

        next_items = self.get_question_by_id(question_id)['questions'][0].get('next')
        if not next_items:
            return None

        next_question_id = next((item.get('question') for item in next_items if item.get('option') == answer_id), None)
        if next_question_id:
            return self.get_question_by_id(next_question_id)

    def get_answers(self):
        answers = self.data
        return answers

    @staticmethod
    def load_from_friendly_code(friendly_code):
        for key in application.munjoe_db.keys():
            if 'friendly_code' in application.munjoe_db[key]:
                if lower(application.munjoe_db[key]['friendly_code']) == lower(friendly_code):
                    return SlinkyApp(key)


def generate_session():
    return str(uuid.uuid4())

def create_provisions_response(provisions, passphrase=None):
    return _create_question_response({
        "friendly_code": passphrase,
        "provisions": [
            {
                "name": "Training",
                "items": [
                    "https://www.leeds.gov.uk/residents/learning-and-job-opportunities/learning-opportunities",
                    "https://doinggoodleeds.org.uk/training-courses/",
                    "You might want to consider booking an appointment with a work coach at your local Jobcentre Plus",
                ],
            }
        ],
    })

def _create_question_response(page_view: dict, session_id=None):
    if session_id:
        page_view['sessionId'] = session_id
    resp = Response(json.dumps(page_view))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Content-Type'] = 'application/json'
    return resp


@application.route("/api/start", methods=['GET'])
def start():
    app = SlinkyApp()

    q = app.get_first_question()

    return _create_question_response(q, app.session_id)


@application.route('/api/response', methods=['POST'])
def response():
    post_body = request.json
    question_id = post_body["question_id"]
    answer_id = post_body["answer_id"]
    free_text = post_body.get("free_text")
    session_id = post_body["sessionId"]
    app = SlinkyApp(session_id)

    print('FRIENDLY CODE')
    print(app.data['friendlyCode'])
    #friendly_code = "friendly.code" # app.data["friendlyCode"]

    friendly_code = "-".join([random.choice(small_words) for _ in range(0, 2)])

    if free_text and is_sentiment_concerning(free_text):
        return _create_question_response({'angry_customer': True})

    q = app.get_next_question(question_id, answer_id)
    if not q:
        return create_provisions_response({
            "friendly_code": "steep-horse",
            "provisions": [
                {
                    "name": "Training",
                    "items": [
                        "https://www.leeds.gov.uk/residents/learning-and-job-opportunities/learning-opportunities",
                        "https://doinggoodleeds.org.uk/training-courses/",
                        "You might want to consider booking an appointment with a work coach at your local Jobcentre Plus",
                    ],
                }
            ],
        })

    return _create_question_response(q, app.session_id)


@application.route('/api/answers', methods=['GET'])
def answers():
    session_id = request.args.get('sessionId', '')

    friendly_code = None
    if not session_id:
        friendly_code = request.args.get('friendlyCode', '')
        app = SlinkyApp.load_from_friendly_code(friendly_code)
        if not app:
            raise ValueError(f"A session for the friendly code '{friendly_code}' was not found")
    else:
        app = SlinkyApp(session_id)
    a = app.get_answers()

    questions = [ q['question_id'] for q in app.data['answers'] ]
    if len(questions) == 0:
        return _create_question_response({'title': 'There has been a problem fetching your answers.'})
        
    provisions = app.provisions_engine.get_provisions_for_questions(questions)
    if provisions is None or len(provisions) == 0:
        return _create_question_response({'title': 'No provisions were found'})

    return create_provisions_response(provisions, friendly_code)
    #return _create_question_response(a)


def is_sentiment_concerning(text):
    html_text = urllib.parse.quote(text, safe='')
    r = requests.get(f"http://ec2-3-8-124-198.eu-west-2.compute.amazonaws.com:5000/sentiment/{html_text}").json()
    if r['Sentiment'] == "NEGATIVE":
        return True

    return False
