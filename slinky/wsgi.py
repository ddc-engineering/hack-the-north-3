import uuid
import json

from flask import Flask, request, Response

application = Flask(__name__)

application.munjoe_db = dict()


class SlinkyApp:

    def __init__(self, session_id=None):

        if not session_id:
            session_id = generate_session()
            application.munjoe_db[session_id] = dict()
        else:
            if session_id not in application.munjoe_db:
                raise ValueError(f"The session id {session_id} was not found in the database")

        self.session_id = session_id
        self.data = application.munjoe_db[session_id]

    def set_last_question(self, q):
        self.data['last_question'] = q

    def retrieve_last_question(self):
        return self.data['last_question']

    def update_question(self, name, val):
        self.data[name] = val


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

    resp_data = {
            "sessionId": f"{app.session_id}",
            "pageView": {
                "title": "Demographics", "hint": "AdditionalInformation",
                "questions": [
                    {"title": "Are you male or female?",
                     "hint": "This is a test radio hint",
                     "type": "radio",
                     "name": "gender",
                     "inline": True,
                     "options": [{"id": 1, "value": "male", "hint": "Male Hint", "text": "Male"},
                                 {"id": 2, "hint": "Female hint", "value": "female", "text": "Female"},
                                 {"id": 3, "hint": "Other hint", "value": "other", "text": "Other"}]}]}
        }

    app.set_last_question(resp_data)

    return _create_question_response(resp_data)


@application.route('/api/response', methods=['POST'])
def response():
    post_body = request.json

    session_id = post_body["sessionId"]
    question_name = post_body["name"]

    app = SlinkyApp(session_id)
    app.update_question(question_name, post_body["value"])

    resp_data = {
        "sessionId": f"{session_id}",
        "pageView": {
            "title": "Demographics", "hint": "AdditionalInformation",
            "questions": [
                {"title": "Next dummy question?",
                 "hint": "This is a test radio hint",
                 "type": "radio",
                 "name": "dummyq",
                 "inline": True,
                 "options": [{"id": 1, "value": "male", "hint": "Male Hint", "text": "Male"},
                             {"id": 2, "hint": "Female hint", "value": "female", "text": "Female"},
                             {"id": 3, "hint": "Other hint", "value": "other", "text": "Other"}]}]}
    }

    app.set_last_question(resp_data)

    return _create_question_response(resp_data)


@application.route('/api/restore', methods=['GET'])
def restore():
    session_id = request.args.get('sessionId', '')

    app = SlinkyApp(session_id)
    last_q = app.retrieve_last_question()
    return _create_question_response(last_q)