import pytest
from slinky.wsgi import application

@pytest.fixture
def client():
    client = application.test_client()
    yield client


def test(client):
    rs = client.get('/api/start')

    assert rs.status == '200 OK'


