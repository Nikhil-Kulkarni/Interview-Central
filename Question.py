class Question(object):
    """docstring for Question."""
    def __init__(self, name, description, link, source, difficulty=-1, tags=[], successRate=-1, submissions=-1):
        self.name = name
        self.description = description
        self.link = link
        self.source = source
        self.difficulty = difficulty
        self.tags = tags
        self.successRate = successRate
        self.successRate = successRate
        self.submissions = submissions
