import uuid
import json

from flask import Flask, request, Response, jsonify
import contentloader as contentloader
from flask_cors import CORS

application = Flask(__name__)

CORS(application)

application.munjoe_db = dict()

class SlinkyApp:

    def __init__(self, session_id=None):

        if not session_id:
            session_id = generate_session()
            application.munjoe_db[session_id] = dict()
            application.munjoe_db[session_id]['answers'] = []
        else:
            if session_id not in application.munjoe_db:
                raise ValueError(f"The session id {session_id} was not found in the database")

        self.session_id = session_id
        self.data = application.munjoe_db[session_id]

        self.questions = contentloader.load_questions('/app/questions.yaml')

    def retrieve_last_question(self, question_id):
        return next(question_id for question in self.questions if question.get('id') == id)

    def get_first_question(self):
        return self.get_question_by_id(1)

    def get_question_by_id(self, id):
        return next(question for question in self.questions if question.get('id') == id)

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


def generate_session():
    return str(uuid.uuid4())


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
    session_id = app.session_id

    return _create_question_response(q, app.session_id)


@application.route('/api/response', methods=['POST'])
def response():
    post_body = request.json

    session_id = post_body["sessionId"]
    question_id = post_body["question_id"]

    app = SlinkyApp(session_id)
    q = app.get_next_question(question_id, post_body["answer_id"])
    if not q:
        # should get the helpful urls
        q = {'helpful_url': 'xxxxx'}
    return _create_question_response(q, app.session_id)


@application.route('/api/answers', methods=['GET'])
def answers():
    session_id = request.args.get('sessionId', '')

    app = SlinkyApp(session_id)
    a = app.get_answers()
    return _create_question_response(a)


@application.route('/alive')
def get_alive():
    """ Returns a 200 OK """
    return jsonify(status='OK')
