from fastapi import FastAPI
from app.routes.routes import router
import os
from dotenv import load_dotenv

load_dotenv()
uri = os.getenv("URI")
app = FastAPI()
app.include_router(router, prefix="/api")
@app.get("/", tags=["Homepage"])
def home():
    return {
        "message": "Hey Engineers!",
        "description": "This is a REST API for managing products using FastAPI and PyMongo.",
        "endpoints": [
            {
                "method": "POST",
                "path": f"{uri}/api/",
                "description": "📦 Create a new product"
            },
            {
                "method": "GET",
                "path": f"{uri}/api/",
                "description": "📋 Get all products"
            },
            {
                "method": "GET",
                "path": f"{uri}/api/:id",
                "description": "🔍 Get a single product by ID"
            },
            {
                "method": "PUT",
                "path": f"{uri}/api/:id",
                "description": "🛠 Update a product by ID"
            },
            {
                "method": "DELETE",
                "path": f"{uri}/api/:id",
                "description": "🗑 Delete a product by ID"
            },
            {
                "method": "GET",
                "path": f"{uri}/api/filter",
                "description": "🔎 Filter products by keyword and price",
                "filter by keywords": f"{uri}/api/filter?keywords=python-books",
                "filter by price range": f"{uri}/api/filter?keywords=python-books&l_price=0&f_price=1000", 
                "filter by low to high": f"{uri}/api/filter?keywords=python-books&low_to_high=true", 
            },{
                "method": "GET",
                "path": f"{uri}/api/keywords",
                "description": "🗑 Will return a list of all keywords"
            }
        ],
        "About me": "I'm Saumya Sarma, a jr. full-stack developer ",
        "github": "https://github.com/Saumya-Kanti-Sarma/Maketronics-Tech-Challenge",
        "front-end": "https://maketronics-tech-challenge.pages.dev/",
    }