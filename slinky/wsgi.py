from flask import Flask, jsonify
application = Flask(__name__)


@application.route("/question/<int:question_id>")
def question(question_id: str):
    return jsonify({
        "answerIds": [1, 4],
        "question": { "test": f"test {question_id}" }
    })
