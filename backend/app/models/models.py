from pydantic import BaseModel, Field
from typing import Optional, List

class CreateProductModel(BaseModel):
    title: str = Field(...)
    link:str = Field(...)
    image:str= Field(...)
    price:float= Field(...)
    keyword:Optional[List]

class UpdateProductModel(BaseModel):
    title: str = Optional[str]
    link:str = Optional[str]
    image:str= Optional[str]
    price:float= Optional[str]
    keyword:Optional[List]
