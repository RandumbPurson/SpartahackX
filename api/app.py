from flask import Flask
from flask_cors import CORS 
import pymongo
import json
import re

from openai import OpenAI

from dotenv import load_dotenv
load_dotenv()

uri = "mongodb+srv://randumbemma:5QugXWcGA1Mc8VWb@cluster0.okues.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
dbClient = pymongo.MongoClient(uri, server_api=pymongo.server_api.ServerApi(version="1", strict=True, deprecation_errors=True))
repsdb = dbClient.reps_db
votesdb = dbClient.vote_db
repslist = [ f"{rep['first_name']} {rep['last_name']}" for rep in repsdb.reps.find({}) ]

aiClient = OpenAI()

app = Flask(__name__)
CORS(app)

@app.route("/api/representativeList")
def get_representatives():
    return json.dumps({"reps": repslist})

@app.route("/api/representativeEmail")
def get_repEmail(repname):
    first, last = json.loads(repname).split(" ")
    legislator_info = votesdb.legislators.find({"name": re.compile(f"^{first}.*{last}")})
    completion = aiClient.chat.completions.create(
        model="gpt-40-mini",
        messages=[
            {"role": "system", "content": "You are an automated summarizer"},
            {"role": "user", "content": f"I will provide a json object of LEGISLATOR VOTE INFORMATION describing the votes of a specific legislator pertaining to environmental policy. Please generate an email commenting on these voting behaviors. Make this email positive if the votes tend to protect the environment and negative if they degrade the environment. Please mention specific bills and actions as provided\nLEGISLATOR VOTE INFORMATION: {json.dumps(legislator_info)}"}
        ]
    )
    return json.dumps({"email": completion})

if __name__ == "__main__":
    app.run(port=8080)
