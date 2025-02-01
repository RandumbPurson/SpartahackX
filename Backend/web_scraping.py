import requests
from bs4 import BeautifulSoup

url = "https://www.legislature.mi.gov/Bills"
response = requests.get(url)

# Check if the request was successful (status code 200 means OK)
if response.status_code == 200:
    print("Successfully fetched the page!")
else:
    print("Failed to retrieve the page.")
