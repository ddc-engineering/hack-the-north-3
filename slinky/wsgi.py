import uuid

from flask import Flask, jsonify, request

application = Flask(__name__)


db = dict()


def generate_session():
    return uuid.uuid1()


@application.route("/api/start", methods=['GET'])
def start():

    session_id = generate_session()

    db[session_id] = dict()

    return jsonify(
        {
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

    )


@application.route('/api/response', methods=['POST'])
def response():
    post_body = request.json
    session_id = post_body["sessionId"]
    question_name = post_body["name"]

    if session_id not in db:
        raise ValueError(f"The session id {session_id} was not found in the database")

    db[session_id][question_name] = post_body["value"]

    # TODO: return the next question

    return jsonify(
        db[session_id]
    )
