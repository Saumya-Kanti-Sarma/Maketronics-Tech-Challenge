from fastapi import APIRouter, HTTPException
from bson import ObjectId
from app.db.database import collection
from app.models.models import CreateProductModel, UpdateProductModel
from typing import Optional, List
router = APIRouter()

def product_serializer(product) -> dict:
    return {
        "id": str(product["_id"]),
        "title": product["title"],
        "link": product["link"],
        "image": product["image"],
        "price": product["price"],
        "keyword": product["keyword"]
    }

"""Create"""
@router.post("/", response_model=dict)
def create_product(product: CreateProductModel):
    result = collection.insert_one(product.model_dump())
    return {"message":"Product Created"}


"""Get All"""
@router.get("/", response_model=list)
def get_all_products():
    products = collection.find()
    return [product_serializer(product) for product in products]


"""Filter"""
@router.get("/filter", response_model=List[dict])
def get_filters(
    keywords: Optional[str] = None,
    f_price: Optional[str] = None,
    l_price: Optional[str] = None,
    low_to_high:Optional[str]=None,
):
    query = {}
    # filter keywords
    if keywords:
        query["$or"] =[{"keyword": {"$regex": keywords, "$options": "i"}}]

    # Price range 
    if f_price is not None and l_price is not None:
        query["price"] = {"$gte": f_price, "$lte": l_price}

    # Price Limit
    elif l_price is not None:
        query["price"] = {"$lte": l_price}

    if(low_to_high =="true"):
        products = collection.find(query).sort("price", 1)
        return [product_serializer(item) for item in products]

    products = collection.find(query)
    return [product_serializer(item) for item in products]

"""Get All Keywords"""
@router.get("/keywords", response_model=list)
def get_keywords():
    all_docs = collection.find({}, {"keyword": 1, "_id": 0}).to_list(length=None)
    keywords = set()
    for doc in all_docs:
        if "keyword" in doc and isinstance(doc["keyword"], list):
            keywords.update(doc["keyword"])
    
    return list(keywords)
    


"""Get One"""
@router.get("/{product_id}", response_model=dict)
def get_product(product_id: str):
    product = collection.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="product not found")
    return product_serializer(product)

"""Update One"""
@router.put("/{product_id}", response_model=dict)
def update_product(product_id: str, product: UpdateProductModel):
    update_data = {k: v for k, v in product.dict().items() if v is not None}
    result = collection.update_one({"_id": ObjectId(product_id)}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="product not found")
    updated = collection.find_one({"_id": ObjectId(product_id)})
    return product_serializer(updated)


"""Delete One"""
@router.delete("/{product_id}", response_model=dict)
def delete_product(product_id: str):
    result = collection.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="product not found")
    return {"message": "product deleted successfully"}


