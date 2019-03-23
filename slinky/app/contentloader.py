from yaml import load, Loader

def load_questions(filepath) -> dict:
    with open(filepath, 'r') as content_yaml:
        content = load(content_yaml, Loader=Loader)
    return content['pages']

def load_provisions(filepath) -> dict:
    content = {}
    with open(filepath, 'r') as content_yaml:
        content = load(content_yaml, Loader=Loader)
    return content['provisions']
