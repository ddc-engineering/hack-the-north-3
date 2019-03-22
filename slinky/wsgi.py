from flask import Flask, jsonify
application = Flask(__name__)

db = dict()


@application.route("/api/start")
def start():
    return jsonify(
        {
            "answerIds": [1],
            "sessionId": "testSessionID",
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

