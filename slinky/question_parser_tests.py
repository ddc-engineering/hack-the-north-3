from slinky.questions_parser import load_questions


def test_load_questions():
    path = "slinky/questions.yaml"
    loaded_yaml = load_questions(path)
    assert loaded_yaml == {'page': {'title': 'Questions', 'hint': 'The questions page', 'questions': [{'title': 'Are you male or female', 'hint': 'This is a test radio hint', 'type': 'radio', 'name': 'gender', 'inline': 'true', 'options': [{'id': 1, 'value': 'male', 'hint': 'male hint', 'text': 'Male'}, {'id': 2, 'value': 'female', 'hint': 'female hint', 'text': 'Female'}, {'id': 3, 'value': 'other', 'hint': 'other hint', 'text': 'Other'}]}]}}