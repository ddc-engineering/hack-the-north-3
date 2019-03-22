from flask import Flask, jsonify
application = Flask(__name__)

questions = {
    "1": {"title":"Demographics","hint":"AdditionalInformation","questions":[{"title":"Are you male or female?","hint":"This is a test radio hint","type":"radio","name":"gender","inline":True,"options":[{"id":1,"value":"male","hint":"Male Hint","text":"Male"},{"id":2,"hint":"Female hint","value":"female","text":"Female"},{"id":3,"hint":"Other hint","value":"other","text":"Other"}]}]}
};

def get_question(id):
    return questions[id]

@application.route("/start")
def start():
    return jsonify(get_question("1"))
