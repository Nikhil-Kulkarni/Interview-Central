from bs4 import BeautifulSoup
import urllib2
from Question import Question

def getData():
    questions = []
    leetcode = "leetcode"
    base = "https://www.programcreek.com/2012/11/top-10-algorithms-for-coding-interview/"
    base_page = urllib2.urlopen(base).read()
    soup = BeautifulSoup(base_page, 'html.parser')

    breaker_words = ["solution", "approach", "analysis"]

    leetcode_source = "LEETCODE"

    question_links = []
    for anchor in soup.findAll('a', href=True):
        link = anchor['href']
        if leetcode in link:
            question_links.append(link)

    for link in question_links[1:]:
        question_page = urllib2.urlopen(link).read()
        soup2 = BeautifulSoup(question_page, 'html.parser')
        div = soup2.find('div', {"class": "entrybody"}).findAll('p')
        header = soup2.find('h1', {"class": "entrytitle"}).findAll('a')

        # QUESTIONOBJ FORMATION
        description = ""
        for head in header:
            name = head.text
        for a in div:
            text = a.encode('utf-8')
            if any(x in text.lower() for x in breaker_words):
                break
            else:
                description = description + a.text + " "

        questions.append(Question(name, description, link, leetcode_source))
        print questions.description
    return questions
