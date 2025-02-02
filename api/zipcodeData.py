import requests
from bs4 import BeautifulSoup

def findRepresentative(url, zip_code):

    name = "" # Stores rep name
    zip_info = {} # first_name, last_name, zip_code
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all <p> tags with class 'rep color4'
        rep_tags = soup.find_all('p', class_='rep color4')
        
        # Loop through each <p> tag and get the name (if it exists)
        for rep_tag in rep_tags:
            a_tag = rep_tag.find('a')  # Find the <a> tag inside the <p> tag
            if a_tag:
                name = a_tag.get_text(strip=True)
            else:
                print("No name found in this <p> tag.")

    else:
        print(f"Failed to retrieve page, status code {response.status_code}")

    # Gets rid of middle name - remove if you want to keep them
    name = name.split(" ")
    if (len(name) > 2):
        name.pop(1)

    if (name[0] == ""):
        print("No name available. Please make sure you entered the correct zip code.")
    else:
        
        zip_info = {
            "first_name" : name[0],
            "last_name" : name[1],
            "zip_code" : zip_code
        }

        for key, value in zip_info.items():
            print(f"{key} : {value}")

def main():

    zip_code = input("Enter the zip code: ")
    url = "https://ziplook.house.gov/htbin/findrep_house?ZIP=" + zip_code
    findRepresentative(url, zip_code)

main()


    