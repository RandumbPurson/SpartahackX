import requests
from fake_useragent import UserAgent
from bs4 import BeautifulSoup
import re
import time

import pymongo
uri = "mongodb+srv://randumbemma:5QugXWcGA1Mc8VWb@cluster0.okues.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(
    uri, 
    server_api=pymongo.server_api.ServerApi(version="1", strict=True, deprecation_errors=True)
)
db = client.vote_db

### bill
# link: link to bill votes
# name: bill name
# description: bill description

headers = {
    "user-agent": UserAgent().chrome
}

def getRepType(string):
    if ("Rep." in string):
        return "Rep."
    if ("Sen." in string):
        return "Sen."

def getName(string):
    paren_idx = string.find("(")
    return string[5:paren_idx-1]

def getParty(string):
    paren_idx = string.find("(")
    return string[paren_idx + 1]

def getDistrict(string):
    dash_idx = string.find("-")
    return string[dash_idx + 1:-1]

def getLegislators():
    legislators = db.legislators
    baseurl = "https://www.michiganvotes.org"
    soup = BeautifulSoup(requests.get(baseurl + "/legislators/2025").content)
    legislator_objects = []
    for legislator_obj in soup.find_all("ul", class_="official-list"):
        legislator_objects.extend(legislator_obj.find_all("a"))

    for legislator in legislator_objects:
        soup = BeautifulSoup(requests.get(baseurl + legislator["href"]).content)
        # terms = [ list(filter(lambda val: val != "\n" and val != " ", term.contents)) for term in soup.find("div", class_="terms-in-office").find_all("li")]

        try:
            title = soup.find("div", class_="official-title").find("h1").contents[0]
        except:
            print("Failed to get legislator!")
        
        legislator_info = {
            "rep-type": getRepType(title),
            "name": getName(title),
            "party": getParty(title),
            "district": getDistrict(title)
        }


        votes_link = soup.find("div", class_="voting-history").find("a")["href"]
        bills = []
        response = requests.get(baseurl + votes_link + "?q=&topic=Environment")
        soup = BeautifulSoup(response.content)
        page = 1
        while soup.find(text=re.compile("Page Not Found")) is None:
            soup = BeautifulSoup(response.content)
            results = soup.find_all("div", class_="result")
            for res in results:
                try:
                    bill_name = res.find("a").contents[0]
                    bill_desc = res.find("p").getText()
                    action, action_result = res.find("ul").findChildren(recursive=False)
                    bills.append({
                        "name": bill_name,
                        "description": bill_desc,
                        "vote": cleanstr(action.find("span").contents[0]),
                        "result": f"{cleanstr(action_result.find('span').contents[0])}, {action_result.find('span').contents[1].contents[0]}"
                    })
                except:
                    print("Failed to get bill info")

            page += 1
            time.sleep(1)
            response = requests.get(baseurl + votes_link + "?q=&topic=Environment" + f"&page={page}")

        legislator_info["bills"] = bills
        legislators.insert_one(legislator_info)

def cleanstr(string):
    return string.replace("\t", "").replace("\n", "").replace("\r", "")


def getBills():
    bills = db.bills
    baseurl = "https://www.michiganvotes.org/votes/search?topic=Environment"
    response = requests.get(baseurl, "html.parser", headers=headers)
    page = 1
    while response is not None:
        time.sleep(3)
        soup = BeautifulSoup(response.content)
        results = soup.find_all(class_ = "title")
        for result in results:
            bill = {}
            try:
                bill["link"] = result.findChild("h3").findChild("a")["href"]
            except:
                print("Failed to get link")

            try:
                bill["name"] = result.findChild("h3").findChild("a").contents[0]
            except:
                print("Failed to get name")

            try:
                bill["description"] = result.find("p").getText()
            except:
                print("Failed to get description")

            try:
                print(bill)
                bills.insert_one(bill)
            except:
                print("Failed to add to collection!")

        response = requests.get(baseurl + f"&page={page}")
        page += 1

if __name__ == "__main__":
    #getBills()
    getLegislators()
