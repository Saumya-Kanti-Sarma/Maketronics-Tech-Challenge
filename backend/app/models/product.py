from pydantic import BaseModel

class ProductModel(BaseModel):
  _id: str
  title: str
  description: str
  image: str
  ratings: list[str]
