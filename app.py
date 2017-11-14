import boto3
import json
import programcreek
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
                    'source':str(source)
                }
            )

@app.route("/questions")
def getLeetcodeQuestions():
    # INITIALIZE DATABASE CONNECTION
    dynamodb = boto3.resource('dynamodb')
    interviewQuestionsTable = dynamodb.Table('interview-questions')

    questions = interviewQuestionsTable.scan()
    return jsonify(questions)

@app.route("/getHomeData/<person>")
def getHomeData(person):
    dynamodb = boto3.resource('dynamodb')
    suitesTable = dynamodb.Table('interview-suites')

    filtering_exp = Key("person").eq(person)
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

    response = suitesTable.put_item(
        Item={
            'suiteName':str(suiteName),
            'person':str(person),
            'questions':questions
        }
    )
    return jsonify(response)
