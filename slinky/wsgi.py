from flask import Flask
application = Flask(__name__)


@application.route("/question/<int:question_id>")
def question(question_id: str):
    return {
        "answerIds": [1, 4],
        "question": { f"test {question_id}" }
    }
