class Question(object):
    """docstring for Question."""
    def __init__(self, name, description, link, source, category, difficulty=-1, successRate=-1, submissions=-1):
        self.name = name
        self.description = description
        self.link = link
        self.source = source
        self.difficulty = difficulty
        self.category = category
        self.successRate = successRate
        self.successRate = successRate
        self.submissions = submissions
