## 🕷️ How I Made this Web Scraper for Amazon and Flipkart

I needed some data's for my backend so, built a web scraper to pull product data from Amazon and Flipkart: title, image, price, and link.

---

###  Step 1: Inspecting & Reverse Engineer

I went to both sites and inspecting the product list page.
For Amazon, it was clean — each product card was inside a structured `<div>`. Surprisingly,Flipkart uses random `<div>'s` everywhere instead of proper tags like `<h2>` or `<p>` for title and price respectively... No wonder their SEO sucks.

Anyway, I copied a few of those product divs from each site and saved them locally as `amazon.html` and `flipkart.html` so I could test without hammering their servers.

---

### Step 2: Target the Parent Div
```python
totalDivs = soup.find_all("div", class_="sg-col-4-of-4 sg-col-20-of-24 s-result-item s-asin sg-col-16-of-20 AdHolder sg-col sg-col-12-of-12 s-widget-spacing-small sg-col-8-of-8 sg-col-12-of-16") #class_ because class is reserved for python haha!
```

---

### Step 3: Loop Only First 10 Items

I'm scraping this from Amazon.html but both the websites original page will have more then 100+ items in their search results. Scraping them all at once is a Dumb idea (I did that previously). So I sliced it:

```python
for div in totalDivs[:10]:
  # Just 10 clean pulls to avoid detection.
```
---

### Step 4: Extract the Data (Title, Link, Image, Price)

Amazon’s HTML structure is gold — they actually care about structure:

```python
title_tag = div.find("h2")
link_tag = div.find("a", class_="a-link-normal s-line-clamp-2 s-line-clamp-3-for-col-12 s-link-style a-text-normal")
image_tag = div.find("img", class_="s-image")
price_tag = div.find("span", class_="a-price-whole")
```

Flipkart on the other hand...

```python
title_tag = div.find("div", class_="KzDlHZ")  # a div???
link_tag = div.find("a", class_="CGtC98")
image_tag = div.find("img", class_="DByuf4")
price_tag = div.find("div", class_="Nx9bqj _4b5DiR") # why not a p tag???
```

They basically stuffed everything in `<div>`s. Not semantic, not friendly, just working by chance. (I guess)

---

### Step 5: Clean the Messy Title Text

Now, the title tags often looked like this:

```
"Xiaomi Pad 7                                |Qualcomm Snapdragon 7+ Gen 3 |28.35cm(11.16\") Display |8GB, 128GB ..."
```

There were `\n`, `\t`, and like 10 spaces in random places. I first tried:

```python
title.replace("\n", "").replace("\t", "")
```

Still title was ugly and had this big spaces between workds. Then I figured this out:

```python
title = " ".join(title_tag.text.split())
```

It split everything into words, removed all extra whitespace, aand joined it back with a single space. Here's an demosntration:

```python
raw = "\n  Xiaomi Pad 6     \n  | Snapdragon 870 \n  | 8GB RAM \t\n"
split = raw.split()  # ['Xiaomi', 'Pad', '6', '|', 'Snapdragon', '870', '|', '8GB', 'RAM']
final = " ".join(split)  # "Xiaomi Pad 6 | Snapdragon 870 | 8GB RAM"
```
---


Everything worked fine and i tried to extract data from original amazon's url: `https://www.amazon.in/s?k=xiaomi+tablet` but nothing was being returned (atleast, it did'nt crashed).
GPT told me: Turns out, Amazon doesn’t like bots — and `requests.get(...)` without headers getting banned and he gave me this:

```python
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.3.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9"
}
```

---

Now my scraper works perfectly but it's not perfect as amazon and flipkart keep on changing their class names. So if you fork this repository, tried to run and got error then do check out the classnames of the divs from the respective websites...