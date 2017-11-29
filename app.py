import boto3
import json
import programcreek
import uuid
from flask import Flask
from flask import jsonify
from flask_cors import CORS
from flask import request
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
from Twitter import TwitterClient
import decimal
app = Flask(__name__)
CORS(app)

def update_database():
    # INITIALIZE DATABASE CONNECTION
    dynamodb = boto3.resource('dynamodb')

    # GET QUESTIONS
    questions = programcreek.getData()
    interviewQuestionsTable = dynamodb.Table('interview-questions')

    for question in questions:
        name = question.name
        description = question.description
        link = question.link
        source = question.source
        category = question.category

        if (name != "" and description != ""):
            response = interviewQuestionsTable.put_item(
                Item={
                    'name':str(name),
                    'description':description,
                    'link':str(link),
                    'source':str(source),
                    'id':str(uuid.uuid4().hex),
                    'category':str(category)
                }
            )

@app.route("/questions")
def getLeetcodeQuestions():
    # INITIALIZE DATABASE CONNECTION
    dynamodb = boto3.resource('dynamodb')
    interviewQuestionsTable = dynamodb.Table('interview-questions')

    questions = interviewQuestionsTable.scan()
    return jsonify(questions)

@app.route("/question/<questionId>")
def getQuestionWithId(questionId):
    dynamodb = boto3.resource('dynamodb')
    interviewQuestionsTable = dynamodb.Table('interview-questions')

    filtering_exp = Key("id").eq(questionId)
    response = interviewQuestionsTable.scan(FilterExpression=filtering_exp)

    if response["Count"] == 1:
        return jsonify(response["Items"][0])
    else:
        return jsonify({})

@app.route("/recommendQuestionToFollowers", methods=['POST'])
def shareQuestion():
    dynamodb = boto3.resource('dynamodb')
    interviewShared = dynamodb.Table('interview-shared')

    jsonBody = json.loads(request.data)
    questionId = jsonBody["questionId"]
    username = jsonBody["username"]
    sId = uuid.uuid4().hex

    response = interviewShared.put_item(
        Item={
            'id':str(sId),
            'username':str(username),
            'questionId':questionId
        }
    )

    return jsonify(response)

@app.route("/getRecommendedFromFollowing/<username>", methods=['GET'])
def getRecommendedFromFollowing(username):
    dynamodb = boto3.resource('dynamodb')
    interviewShared = dynamodb.Table('interview-shared')

    friendsDict = getFriends(username)

    questions = []
    for f in friendsDict:
        friend = f["usernameB"]
        filtering_exp = Key("username").eq(friend)
        response = interviewShared.scan(FilterExpression=filtering_exp)

        for item in response["Items"]:
            questions.append(item)

    return jsonify(questions)


@app.route("/getHomeData/<username>")
def getHomeData(username):
    dynamodb = boto3.resource('dynamodb')
    suitesTable = dynamodb.Table('interview-suites')

    filtering_exp = Key("person").eq(username)
    response = suitesTable.scan(FilterExpression=filtering_exp)

    return jsonify(response)

@app.route("/createSuite", methods=['POST'])
def createSuite():
    dynamodb = boto3.resource('dynamodb')
    suitesTable = dynamodb.Table('interview-suites')

    jsonBody = json.loads(request.data)
    person = jsonBody["person"]
    suiteName = jsonBody["suiteName"]
    questions = jsonBody["questions"]
    suiteId = uuid.uuid4().hex

    response = suitesTable.put_item(
        Item={
            'suiteName':str(suiteName),
            'person':str(person),
            'questions':questions,
            'suiteId':str(suiteId)
        }
    )

    return jsonify(response)

@app.route("/deleteSuite", methods=['POST'])
def deleteSuite():
    dynamodb = boto3.resource('dynamodb')
    suitesTable = dynamodb.Table('interview-suites')

    jsonBody = json.loads(request.data)
    name = jsonBody["suiteName"]
    person = jsonBody["person"]

    try:
        response = suitesTable.delete_item(
            Key={
                'suiteName':name,
                'person':person
            }
        )
    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])
        else:
            raise
    else:
        return jsonify(response)

@app.route("/getSuite/<suiteId>", methods=['GET'])
def getSuite(suiteId):
    dynamodb = boto3.resource('dynamodb')
    suitesTable = dynamodb.Table('interview-suites')

    filtering_exp = Key("suiteId").eq(suiteId)
    response = suitesTable.scan(FilterExpression=filtering_exp)

    if response["Count"] == 1:
        return jsonify(response["Items"][0])
    else:
        return jsonify({})

@app.route("/addFriend", methods=['POST'])
def addFriend():
    dynamodb = boto3.resource('dynamodb')
    friendsTable = dynamodb.Table('interview-friends')

    jsonBody = json.loads(request.data)
    usernameA = jsonBody["usernameA"]
    usernameB = jsonBody["usernameB"]

    response = friendsTable.put_item(
        Item={
            'usernameA':str(usernameA),
            'usernameB':str(usernameB)
        }
    )

    return jsonify(response)

@app.route("/getFriends/<username>", methods=['GET'])
def getFriends(username):
    dynamodb = boto3.resource('dynamodb')
    friendsTable = dynamodb.Table('interview-friends')

    filtering_exp = Key("usernameA").eq(username)
    response = friendsTable.scan(FilterExpression=filtering_exp)

    return response["Items"]

@app.route("/register", methods=['POST'])
def registerUser():
    dynamodb = boto3.resource('dynamodb')
    usersTable = dynamodb.Table('interview-users')

    dynamodb = boto3.resource('dynamodb')
    categoriesTables = dynamodb.Table('interview-categories')

    jsonBody = json.loads(request.data)
    username = jsonBody["username"]
    password = jsonBody["password"]

    response = usersTable.put_item(
        Item={
            'username':str(username),
            'password':str(password)
        }
    )

    res = categoriesTables.put_item(
        Item={
            'username':username,
            'CombinationsandPermutations':0,
            'HashMap': 0,
            'Tree': 0,
            'BitManipulation': 0,
            'Math': 0,
            'LinkedList': 0,
            'Matrix':0,
            'String/Array':0,
            'Heap':0,
            'Sorting':0,
            'Trie':0,
            'DynamicProgramming':0,
            'Graph':0,
            'SegmentTree':0
        }
    )

    return jsonify(response)

@app.route("/login", methods=['POST'])
def loginUser():
    dynamodb = boto3.resource('dynamodb')
    usersTable = dynamodb.Table('interview-users')

    jsonBody = json.loads(request.data)
    username = jsonBody["username"]
    password = jsonBody["password"]

    filtering_exp = Key("username").eq(username)
    response = usersTable.query(KeyConditionExpression=filtering_exp)

    if response["Count"] == 0:
        return jsonify({"success": False, "error": "Username does not exist"})
    else:
        passwordCheck = response["Items"][0]["password"]
        if password == passwordCheck:
            return jsonify({"success": True, "username": username})
        else:
            return jsonify({"success": False, "error": "Incorrect password"})

@app.route("/getSentiment/<category>/<question>", methods=['GET'])
def getCategorySentiment(category, question):
    # creating object of TwitterClient Class
    api = TwitterClient()
    # calling function to get tweets
    tweets = api.get_tweets(query = question, count = 200)

    if (len(tweets) != 0):
        ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
        ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']


        positive = 100*len(ptweets)/len(tweets)
        negative = 100*len(ntweets)/len(tweets)

        sentiment = {
            'positive': positive,
            'negative': negative
        }

        return jsonify(sentiment)
    else:
        if category == "CombinationsandPermutations":
            category = "Combinations"
        elif category == "String%2FArray":
            category = "String Array"

        tweets = api.get_tweets(query = category, count = 200)

        ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
        ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']

        positive = 100*len(ptweets)/len(tweets)
        negative = 100*len(ntweets)/len(tweets)

        sentiment = {
            'positive': positive,
            'negative': negative
        }

        return jsonify(sentiment)

@app.route("/getRecommendedCategory/<username>", methods=['GET'])
def getRecommendedCategory(username):
    dynamodb = boto3.resource('dynamodb')
    categoriesTables = dynamodb.Table('interview-categories')

    filtering_exp = Key("username").eq(username)
    response = categoriesTables.scan(FilterExpression=filtering_exp)

    items = response["Items"][0]
    category = min(items, key=items.get)
    itemsDict = {
        "category":category
    }
    return jsonify(itemsDict)

@app.route("/getQuestionLeaderboard", methods=['GET'])
def getQuestionLeaderboard():
    dynamodb = boto3.resource('dynamodb')
    questionCountTable = dynamodb.Table('interview-questions-click')

    response = questionCountTable.scan()
    items = response["Items"]

    newlist = sorted(items, key=lambda k: k['numClicks'], reverse=True)

    for item in newlist:
        item['numClicks'] = int(item['numClicks'])

    return jsonify(newlist)

@app.route("/increaseQuestionCount", methods=['POST'])
def increaseQuestionCount():
    dynamodb = boto3.resource('dynamodb')
    questionCountTable = dynamodb.Table('interview-questions-click')

    jsonBody = json.loads(request.data)
    question = jsonBody["name"]

    filtering_exp = Key("name").eq(question)
    response = questionCountTable.scan(FilterExpression=filtering_exp)

    if response['Count'] == 0:
        response = questionCountTable.put_item(
            Item = {
                'name': str(question),
                'numClicks': 1
            }
        )

        return jsonify(response)
    else:
        newNumClicks = response['Items'][0]['numClicks'] + 1
        response = questionCountTable.put_item(
            Item = {
                'name': str(question),
                'numClicks': newNumClicks
            }
        )
        return jsonify(response)


@app.route("/viewedQuestionCategory", methods=['POST'])
def viewedQuestionCategory():
    dynamodb = boto3.resource('dynamodb')
    categoriesTables = dynamodb.Table('interview-categories')

    jsonBody = json.loads(request.data)
    category = jsonBody["category"]
    username = jsonBody["username"]

    filtering_exp = Key("username").eq(username)
    response = categoriesTables.scan(FilterExpression=filtering_exp)

    if response["Count"] != 0:
        items = response["Items"][0]
        ncStrArr = items["String/Array"]
        ncMatrix = items["Matrix"]
        ncLL = items["LinkedList"]
        ncMath = items["Math"]
        ncBit = items["BitManipulation"]
        ncTree = items["Tree"]
        ncHashMap = items["HashMap"]
        ncComb = items["CombinationsandPermutations"]
        ncHeap = items["Heap"]
        ncSorting = items["Sorting"]
        ncTrie = items["Trie"]
        ncDP = items["DynamicProgramming"]
        ncGraph = items["Graph"]
        ncSegTree = items["SegmentTree"]

        if category == "String/Array":
            ncStrArr = ncStrArr + 1
        elif category == "Matrix":
            ncMatrix = ncMatrix + 1
        elif category == "LinkedList":
            ncLL = ncLL + 1
        elif category == "Math":
            ncMath = ncMath + 1
        elif category == "BitManipulation":
            ncBit = ncBit + 1
        elif category == "Tree":
            ncTree = ncTree + 1
        elif category == "HashMap":
            ncHashMap = ncHashMap + 1
        elif category == "CombinationsandPermutations":
            ncComb = ncComb + 1
        elif category == "Heap":
            ncHeap = ncHeap + 1
        elif category == "Sorting":
            ncSorting = ncSorting + 1
        elif category == "Trie":
            ncTrie = ncTrie + 1
        elif category == "DynamicProgramming":
            ncDP = ncDP + 1
        elif category == "Graph":
            ncGraph = ncGraph + 1
        elif category == "SegmentTree":
            ncSegTree = ncSegTree + 1

        res = categoriesTables.put_item(
            Item={
                'username':username,
                'CombinationsandPermutations':ncComb,
                'HashMap': ncHashMap,
                'Tree': ncTree,
                'BitManipulation': ncBit,
                'Math': ncMath,
                'LinkedList': ncLL,
                'Matrix':ncMatrix,
                'String/Array':ncStrArr,
                'Heap':ncHeap,
                'Sorting':ncSorting,
                'Trie':ncTrie,
                'DynamicProgramming':ncDP,
                'Graph':ncGraph,
                'SegmentTree':ncSegTree
            }
        )

    return jsonify(res)

if __name__ == "__main__":
    update_database()
