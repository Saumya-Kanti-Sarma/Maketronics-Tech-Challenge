import requests
from bs4 import BeautifulSoup
import json

def getFromAmazon(url, keyword):
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/115.0.3.0 Safari/537.36"
        ),
        "Accept-Language": "en-US,en;q=0.9",
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"Request failed: {response.status_code}")
        return "request failed due to bad response"

    soup = BeautifulSoup(response.text, "html.parser")

    # More reliable selector
    product_divs = soup.find_all("div", {"data-component-type": "s-search-result"})

    if not product_divs:
        print("No product divs found. Amazon may have blocked or changed structure.")
        return "No product containers found"

    results = []

    for div in product_divs[:10]:  # Limit to first 10 results
        title_tag = div.find("h2")
        link_tag = div.find("a") if title_tag else None
        image_tag = div.find("img")
        price_tag = div.find("span", class_="a-price-whole")

        title = " ".join(title_tag.text.split()) if title_tag else None
        link = "https://www.amazon.in" + link_tag["href"] if link_tag else None
        image = image_tag["src"] if image_tag and image_tag.has_attr("src") else None
        price = price_tag.text.strip() if price_tag else None

        results.append({
            "title": title,
            "link": link,
            "image": image,
            "price": price,
            "keyword": [keyword],
        })

    print(json.dumps(results, indent=2))
    return results


def getfromFlipkart(url,keyword):
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/531.16 (KHTML, like Gecko) "
            "Chrome/115.0.0.0 Safari/537.26"
        ),
        "Accept-Language": "en-US,en;q=0.9",
    }

    # Send request
    response = requests.get(url, headers=headers)
    data = response.text


    # Parse HTML
    soup = BeautifulSoup(data, "html.parser")

    totalDivs = soup.find_all("div", class_="GRCGWFDD3CMZ86J5")

    results = []
    for div in totalDivs[:10]:  # Limit to 10 results
        title_tag = div.find("div",class_="KzDlHZ")
        link_tag = div.find("a") if div else None
        image_tag = div.find("img", class_="DByuf4")
        price_tag = div.find("div", class_="Nx9bqj _4b5DiR")

        title = " ".join(title_tag.text.split()) if title_tag else None
        link = "https://www.flipkart.com" + link_tag["href"] if link_tag  else None
        image = image_tag["src"] if image_tag and image_tag.has_attr("src") else None
        price = price_tag.text.strip() if price_tag else None

        result = {
            "title": title,
            "link": link,
            "image": image,
            "price": price,
            "keyword":[keyword] 
        }
        results.append(result)

    # Output full JSON
    return results


# def getData():
#     flipkart = getfromFlipkart("https://www.flipkart.com/search?q=Top+Graphic+Cards+under+₹20,000","graphics-card")
#     amazon = getFromAmazon("https://www.amazon.in/s?k=Top+Graphic+Cards+under+₹20,000","graphics-card")
#     data = flipkart + amazon
#     print(json.dumps(data, indent=2))

# # getData()

getFromAmazon("https://www.amazon.in/s?k=business+books","business-books")

