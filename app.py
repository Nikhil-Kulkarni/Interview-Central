import boto3
import json
import programcreek
import uuid
from flask import Flask
from flask import jsonify
from flask_cors import CORS
from flask import request
from boto3.dynamodb.conditions import Key, Attr
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

        if (name != "" and description != ""):
            response = interviewQuestionsTable.put_item(
                Item={
                    'name':str(name),
                    'description':description,
                    'link':str(link),
                    'source':str(source),
                    'id':str(uuid.uuid4().hex)
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

@app.route("/register", methods=['POST'])
def registerUser():
    dynamodb = boto3.resource('dynamodb')
    usersTable = dynamodb.Table('interview-users')

    jsonBody = json.loads(request.data)
    username = jsonBody["username"]
    password = jsonBody["password"]

    response = usersTable.put_item(
        Item={
            'username':str(username),
            'password':str(password)
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

if __name__ == "__main__":
    update_database()
