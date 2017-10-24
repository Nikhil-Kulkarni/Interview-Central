from bs4 import BeautifulSoup
import urllib2

base = "https://www.hackerrank.com/"
questions = base + "domains/algorithms/warmup"
page = urllib2.urlopen(questions).read()
soup = BeautifulSoup(page, 'html.parser')

challenges = []
domains = []
for anchor in soup.findAll('a', href=True):
    link = anchor['href']
    if "challenges" in link:
        challenges.append(link)
    elif "domains" in link:
        domains.append(link)

for challenge in challenges:
    challengeLink = base + challenge
    page = urllib2.urlopen(challengeLink)
    soup2 = BeautifulSoup(page, 'html.parser')
