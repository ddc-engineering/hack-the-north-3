import slinky.contentloader as contentloader

fixture_path = './test_content.yaml'

def test_loads_yaml():
    pages = contentloader.load_questions(fixture_path)
    assert pages is not None

def test_loads_provisions():
    provisions = contentloader.load_provisions(fixture_path)
    assert provisions is not None and len(provisions) > 0
