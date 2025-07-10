from fastapi import APIRouter, HTTPException
from app.schema.product import CreateProductSchema, UpdateProductSchema
from app.api import product
from app.models.product import ProductModel

router = APIRouter(prefix="/api/product", tags=["product"])

@router.get("/",response_model=list[ProductModel])
async def readAll():
  return await product.getAllProducts()
