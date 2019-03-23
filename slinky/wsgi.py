import uuid
import json

from flask import Flask, request, Response

application = Flask(__name__)

application.db = dict()


def generate_session():
    return str(uuid.uuid1())


def _create_question_response(page_view: dict):
    resp = Response(json.dumps(page_view))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Content-Type'] = 'application/json'
    return resp


@application.route("/api/start", methods=['GET'])
def start():
    session_id = generate_session()

    application.db[session_id] = dict()

    resp_data = {
            "sessionId": f"{session_id}",
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

    return _create_question_response(resp_data)


@application.route('/api/response', methods=['POST'])
def response():
    post_body = request.json

    session_id = post_body["sessionId"]

    question_name = post_body["name"]

    print(application.db.keys())

    if session_id not in application.db:
        raise ValueError(f"The session id {session_id} was not found in the database")

    application.db[session_id][question_name] = post_body["value"]

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

    return _create_question_response(resp_data)
