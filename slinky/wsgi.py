import uuid

from flask import Flask, jsonify

application = Flask(__name__)


db = dict()


def generate_session():
    return uuid.uuid1()


@application.route("/api/start")
def start():

    session_id = generate_session()

    db[session_id] = dict()

    return jsonify(
        {
            "answerIds": [1],
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

