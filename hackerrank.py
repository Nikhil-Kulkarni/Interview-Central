# from bs4 import BeautifulSoup
# import urllib2
#
# base = "https://www.hackerrank.com/"
# questions = base + "domains/algorithms/warmup"
# page = urllib2.urlopen(questions).read()
# soup = BeautifulSoup(page, 'html.parser')
#
# challenges = []
# domains = []
# for anchor in soup.findAll('a', href=True):
#     link = anchor['href']
#     if "challenges" in link:
#         challenges.append(link)
#     elif "domains" in link:
#         domains.append(link)
#
# for challenge in challenges:
#     challengeLink = base + challenge
#     page = urllib2.urlopen(challengeLink)
#     soup2 = BeautifulSoup(page, 'html.parser')

# from ghost import Ghost
# ghost = Ghost()
#
# with ghost.start() as session:
#     page, resources = session.open('https://www.hackerrank.com/domains/java/java-introduction')
#     print page
#
#     result, resources = session.evaluate(
#         "document.getElementById('nav-links');")
#     # print result

from splinter import Browser

browser = Browser('phantomjs')
browser.visit('https://soundcloud.com/passionpit/sets/favorites')
songs = browser.find_by_xpath("//a[contains(@class, 'soundTitle__title')]")
if songs:
    for song in songs:
        print song.text
else:
    print "there aren't any songs"
