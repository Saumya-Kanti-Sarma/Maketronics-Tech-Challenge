from pydantic import BaseModel

class CreateProductSchema(BaseModel):
  title: str
  description: str
  image: str
  image: int
  ratings: list[str]

class UpdateProductSchema(BaseModel):
  title: str = None
  description: str = None
  image: str = None
  image: int = 0
  ratings: list[str] = None