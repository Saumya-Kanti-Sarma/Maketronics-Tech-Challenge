from app.config import db
from app.models.product import ProductModel

collection = db["products"]

async def getAllProducts():
  return [ProductModel(**item) async for item in collection.find()]

