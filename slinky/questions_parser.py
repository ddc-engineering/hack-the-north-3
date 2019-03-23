from yaml import load, Loader


def load_questions(filepath: str) -> dict:
    with open(filepath, 'r') as questions_yaml:
        questions = load(questions_yaml, Loader=Loader)

    return questions
