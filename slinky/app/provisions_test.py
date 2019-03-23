import pytest
from provisions import ProvisionsEngine

@pytest.fixture
def engine():
    provisions = [
        {
            "name": "Training",
            "questions": [1,2],
        },
        {
            "name": "IT Work",
            "questions": [1,4],
        },
        {
            "name": "Physical Work",
            "questions": [2,4],
        },
    ]
    engine = ProvisionsEngine(provisions)
    yield engine

def test_it_returns_provisions_for_questions(engine):
    actual = engine.get_provisions_for_questions([1, 3])
    assert actual == [
        {
            "name": "Training",
            "questions": [1,2],
        },
        {
            "name": "IT Work",
            "questions": [1,4],
        },
    ]

def test_it_returns_empty_list_with_no_provisison():
    engine = ProvisionsEngine([])
    actual = engine.get_provisions_for_questions([1, 3])
    assert actual == []
