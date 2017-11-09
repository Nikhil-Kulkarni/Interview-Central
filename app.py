import boto3
import programcreek

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

if __name__ == "__main__":
    update_database()
