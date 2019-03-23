class ProvisionsEngine:
    def __init__(self, provisions):
        self.provisions = provisions

    def get_provisions_for_question(self, question):
        return [p for p in self.provisions if question in p['questions']]

    def get_provisions_for_questions(self, questions):
        question_provisions = []
        for question in questions:
            question_provisions.extend(self.get_provisions_for_question(question))
        return question_provisions

