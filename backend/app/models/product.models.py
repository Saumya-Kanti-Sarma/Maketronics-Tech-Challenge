from pydantic import BaseModel

class UserModel(BaseModel):
  _id: str
  title: str
  description: str
  image: str
  ratings: list[str]
