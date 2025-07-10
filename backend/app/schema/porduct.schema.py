from pydantic import BaseModel

class CreateProductSchema(BaseModel):
  title: str
  description: str
  image: str
  ratings: list[str]

class UpdateProductSchema(BaseModel):
  title: str = None
  description: str = None
  image: str = None
  ratings: list[str] = None