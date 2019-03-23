import pytest
import json

from slinky.wsgi import application


@pytest.fixture
def client():
    client = application.test_client()
    yield client


def test(client):
    rs = client.get('/api/start')
    assert rs.status == '200 OK'


def test_response(client):

    rs = client.get('/api/start')

    response_json = json.loads(rs.get_data())

    session_id = response_json["sessionId"]

    rs = client.post('/api/response', data=json.dumps(dict(sessionId=session_id,
                                                           question_id=1,
                                                           answer_id=1)),
                     content_type='application/json')

    assert rs.status == "200 OK"

    rs = client.post('/api/response', data=json.dumps(dict(sessionId=session_id,
                                                           question_id=2,
                                                           answer_id=3)),
                     content_type='application/json')

    assert rs.status == "200 OK"

    rs = client.get(f'/api/answers?sessionId={session_id}')
    assert rs.data == b'{"answers": [{"question_id": 1, "answer_id": 1}, {"question_id": 2, "answer_id": 3}]}'


