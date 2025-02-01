import requests
from bs4 import BeautifulSoup
import pymongo
import certifi
from pymongo.errors import ConnectionFailure

uri = "mongodb+srv://randumbemma:5QugXWcGA1Mc8VWb@cluster0.okues.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(uri, server_api=pymongo.server_api.ServerApi(version="1", strict=True, deprecation_errors=True), tlsCAFile=certifi.where())

try:
    # Check if MongoDB connection is successful
    client.admin.command('ping')
    print("MongoDB connection successful.")
except ConnectionFailure:
    print("Failed to connect to MongoDB.")
    exit(1)

db = client.reps_db
reps_collection = db.reps  # Get the reps collection from MongoDB

def getContactInfo(url):
    """ Returns Representative Info """
    
    # Send a GET request to the webpage
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')  # Parses the page

        rep_items = soup.find_all('li', class_='list-item border-bottom m10 page-search-container')  # Finds stuff in the html file

        for rep in rep_items:

            # Extract Name, Party, and District (This is inside the <a> tag with the class 'page-search-target')
            name_tag = rep.find('a', class_='page-search-target')
            name_info = name_tag.text.strip() if name_tag else 'N/A'

            # Clean up name information
            name_info = name_info.split(" ")
            for i in range(len(name_info)):
                name_info[i] = name_info[i].replace(",", "").replace("(", "").replace(")", "")

            last_name = name_info[0]
            first_name = name_info[1]
            party = name_info[2]
            district = name_info[3]

            # Extract Email (This is inside the <a> tag with the 'mailto' link)
            email_tag = rep.find('a', href=lambda x: x and x.startswith('mailto:'))
            email = email_tag['href'].replace('mailto:', '') if email_tag else 'N/A'

            # Extract Phone (This is inside the <a> tag with the 'tel' link)
            phone_tag = rep.find('a', href=lambda x: x and x.startswith('tel:'))
            phone = phone_tag['href'].replace('tel:', '') if phone_tag else 'N/A'

            # Representative information dictionary
            rep_info = {
                "first_name": first_name,
                "last_name": last_name,
                "party": party,
                "district": district,
                "phone_number": phone,
                "email": email
            }

            print()
            for key, val in rep_info.items():
                print(f"{key} : {val}")
            print()

            # Insert into the 'reps' collection
            try:
                reps_collection.insert_one(rep_info)
                print("Representative inserted successfully.")
            except Exception as e:
                print(f"Error inserting representative: {e}")

    else:
        print("Failed to retrieve the webpage")
    

def main():
    url = 'https://www.house.mi.gov/AllRepresentatives'  # Website being scraped
    getContactInfo(url)

main()
