from pydantic import BaseModel

class ProductModel(BaseModel):
  _id: str
  title: str
  description: str
  price: int
  image: str
  ratings: list[str]
