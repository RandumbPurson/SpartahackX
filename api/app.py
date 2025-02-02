from flask import Flask, request
from flask_cors import CORS 
import pymongo
import json
import re

from zipcodeData import findRepresentative

from openai import OpenAI

from dotenv import load_dotenv
load_dotenv()

uri = "mongodb+srv://randumbemma:5QugXWcGA1Mc8VWb@cluster0.okues.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
dbClient = pymongo.MongoClient(uri, server_api=pymongo.server_api.ServerApi(version="1", strict=True, deprecation_errors=True))
repsdb = dbClient.reps_db
votesdb = dbClient.vote_db
repslist = list(set([ f"{rep['first_name']} {rep['last_name']}" for rep in repsdb.reps.find({}) ]))

aiClient = OpenAI()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/api/representativeList")
def get_representatives():
    return json.dumps({"reps": repslist})

@app.route("/api/zipcode", methods=["POST"])
def get_zip():
    baseurl = "https://ziplook.house.gov/htbin/findrep_house?ZIP="
    return json.dumps(findRepresentative(baseurl + zip_code))

@app.route("/api/representativeInfo", methods=["POST"])
def get_repInfo():
    first, last = request.json["name"].split(" ")
    legislator_info = votesdb.legislators.find({"name": re.compile(f"^{first}.*{last}")}, {"_id": False}).next()

    return json.dumps(legislator_info)

@app.route("/api/representativeSummary", methods=["POST"])
def get_repSummary():
    first, last = request.json["name"].split(" ")
    legislator_info = votesdb.legislators.find({"name": re.compile(f"^{first}.*{last}")}, {"_id": False}).next()
    completion = aiClient.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an automated summarizer"},
            {"role": "user", "content": f"I will provide a json object of LEGISLATOR VOTE INFORMATION describing the votes of a specific legislator pertaining to environmental policy. Please generate a summary of these voting behaviors, mentioning a few key bills\nLEGISLATOR VOTE INFORMATION: {json.dumps(legislator_info)}"}
        ]
    )
    return json.dumps({"email": completion.choices[0].message.content})

@app.route("/api/representativeEmail", methods=["POST"])
def get_repEmail():
    first, last = request.json["name"].split(" ")
    legislator_info = votesdb.legislators.find({"name": re.compile(f"^{first}.*{last}")}, {"_id": False}).next()
    completion = aiClient.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an automated summarizer"},
            {"role": "user", "content": f"I will provide a json object of LEGISLATOR VOTE INFORMATION describing the votes of a specific legislator pertaining to environmental policy. Please generate an email commenting on these voting behaviors. Make this email positive if the votes tend to protect the environment and negative if they degrade the environment. Please mention specific bills and actions, write in first person, and write as though speaking directly to the representative using words like 'You' to refer to them\nLEGISLATOR VOTE INFORMATION: {json.dumps(legislator_info)}"}
        ]
    )
    return json.dumps({"email": completion.choices[0].message.content})

if __name__ == "__main__":
    app.run(port=8080)
