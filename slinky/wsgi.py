import uuid
import json
import os
import psycopg2

from flask import Flask, request, Response, g
from yaml import load, Loader
from flask_cors import CORS


application = Flask(__name__)

CORS(application)

DATABASE_URL = os.environ['DATABASE_URL']


schema = """
CREATE TABLE IF NOT EXISTS user_sessions (session_id text PRIMARY KEY, current_question text);
CREATE TABLE IF NOT EXISTS questions (session_id text, question_name text, question_value text);
"""


def get_db_cursor():
    if 'conn' not in g:
        g.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        g.cur = g.conn.cursor()
        g.cur.execute(schema)
    return g.cur


# @application.teardown_appcontext
# def teardown_db(g):
#     conn = g.pop('conn', None)
#     if conn:
#         conn.close()


def load_questions() -> dict:

    with open('slinky/questions.yaml', 'r') as questions_yaml:
        questions = load(questions_yaml, Loader=Loader)

    return questions


class SlinkyApp:

    def __init__(self, session_id=None):

        conn = get_db_cursor()

        if not session_id:
            session_id = generate_session()

            sql = """insert into user_sessions(session_id, current_question) values (%s, %s)"""
            conn.execute(sql, (session_id, 0))
        else:
            #if session_id not in db:
            #    raise ValueError(f"The session id {session_id} was not found in the database")
            pass

        self.session_id = session_id
        #self.data = db[session_id]

        self.question_index = 0

        self.questions = load_questions()

    def retrieve_last_question(self):
        if self.question_index == 0:
            return self.questions[0]
        else:
            return self.questions[self.question_index-1]

    def update_question(self, session_id, name, val):
        # self.data[name] = val

        # self.data['answers'].append({
        #     "name": name,
        #     "val": val
        # })

        sql = """insert into questions (session_id, question_name, question_value) values (%s, %s, %s)"""

        conn = get_db_cursor()
        conn.execute(sql, (session_id, name, val))

    def get_next_question(self):
        question = self.questions[self.question_index]

        question["sessionId"] = self.session_id

        self.question_index += 1

        return question

    def get_answers(self):
        answers = self.data['answers']
        return answers


def generate_session():
    return str(uuid.uuid4())


def _create_question_response(page_view: dict):
    resp = Response(json.dumps(page_view))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Content-Type'] = 'application/json'
    return resp


@application.route("/api/start", methods=['GET'])
def start():

    app = SlinkyApp()

    q = app.get_next_question()

    return _create_question_response(q)


@application.route('/api/response', methods=['POST'])
def response():
    post_body = request.json

    session_id = post_body["sessionId"]
    question_name = post_body["name"]

    app = SlinkyApp(session_id)
    app.update_question(question_name, post_body["value"])

    q = app.get_next_question()

    return _create_question_response(q)


@application.route('/api/restore', methods=['GET'])
def restore():
    session_id = request.args.get('sessionId', '')

    app = SlinkyApp(session_id)
    q = app.retrieve_last_question()
    return _create_question_response(q)


@application.route('/api/answers', methods=['GET'])
def answers():
    session_id = request.args.get('sessionId', '')

    app = SlinkyApp(session_id)
    a = app.get_answers()
    return _create_question_response(a)