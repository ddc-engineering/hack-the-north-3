import boto3
import flask
import requests

app = flask.Flask(__name__, static_url_path="/static")


comprehend = boto3.client(service_name='comprehend', region_name='eu-west-1')
translate = boto3.client(service_name='translate', region_name='eu-west-1')


def _sentiment(text, lang):
    return comprehend.detect_sentiment(
        Text=text,
        LanguageCode=lang
    )


def _phrases(text, lang):
    return comprehend.detect_key_phrases(
        Text=text,
        LanguageCode=lang
    )


def _translate(text, srcLang, trgLang):
    return translate.translate_text(
        Text=text,
        SourceLanguageCode=srcLang,
        TargetLanguageCode=trgLang
    )


@app.route('/sentiment/<text>', methods=['GET'])
def sentiment_(text):
    lang = flask.request.args.get('lang', 'en')
    return flask.jsonify(_sentiment(text, lang))


@app.route('/phrases/<text>', methods=['GET'])
def phrases_(text):
    lang = flask.request.args.get('lang', 'en')
    return flask.jsonify(_phrases(text, lang))


@app.route('/translate/<text>', methods=['GET'])
def translate_(text):
    srcLang = flask.request.args.get('sl', 'es')
    trgLang = flask.request.args.get('tl', 'es')
    return flask.jsonify(_translate(text, srcLang, trgLang))


@app.route('/alive')
def get_alive():
    """ Returns a 200 OK """
    return flask.jsonify(status='OK')
