import requests
from bs4 import BeautifulSoup

### BillType
# link: link to bill votes
# name: bill name
# description: bill description

def getBills():
    bills = []
    baseurl = "https://www.michiganvotes.org/votes/search?topic=Environment"
    response = requests.get(baseurl)
    page = 1
    while response.content:
        soup = BeautifulSoup(response.content)
        results = soup.find_all(class_ = "result")
        print(results[0].)

        response = requests.get(baseurl + f"&page={page}")
        page += 1

if __name__ == "__main__":
    print("test")
    getBills()
