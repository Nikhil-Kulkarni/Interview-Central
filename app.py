from flask import Flask
import programcreek
app = Flask(__name__)

@app.route("/leetcode")
def update_leetcode():
    questions = programcreek.getData()
    return "Hello"
