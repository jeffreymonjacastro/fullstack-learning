from enum import Enum
from fastapi import FastAPI

app = FastAPI()

## GET 

# Simple GET request
@app.get("/")
async def root():
  return {"message": "Hello World"}

# Path parameters
@app.get("/users/{user_id}")
async def read_item(user_id: int):
  return {"user_id": user_id}

# Enum parameters
class ModelName(str, Enum):
  alexnet = "alexnet"
  resnet = "resnet"
  lenet = "lenet"

@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
  if model_name == ModelName.alexnet:
    return {"model_name": model_name, "message": "Deep Learning FTW!"}

  if model_name.value == "lenet":
    return {"model_name": model_name, "message": "LeCNN all the images"}

  return {"model_name": model_name, "message": "Have some residuals"}

# File path parameters
@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
  return {"file_path": file_path}

# Query parameters
fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
  return fake_items_db[skip : skip + limit]

# Optional parameters
# @app.get("/items/{item_id}")
# async def read_item(item_id: str, q: str | None = None):
#   if q:
#     return {"item_id": item_id, "q": q}
#   return {"item_id": item_id}

# Multiple path and query parameters
@app.get("/users/{user_id}/items/{item_id}")
async def read_user_item(user_id: int, item_id: str, q: str | None = None, short: bool = False):
  item = {"item_id": item_id, "owner_id": user_id}
  if q:
    item.update({"q": q})
  if not short:
    item.update(
      {"description": "This is an amazing item that has a long description"}
    )
  return item

# Query validations
from fastapi import Query

@app.get("/items/")
async def read_items(q: str | None = Query(default=None, max_length=50)):
  results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
  if q:
    results.update({"q": q})
  return results

# Query validations with regex
from typing import Annotated
@app.get("/items/")
async def read_items(
  q: Annotated[
    str | None, Query(min_length=3, max_length=50, pattern="^fixedquery$")
  ] = None,
):
  results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
  if q:
    results.update({"q": q})
  return results

# Required query parameters (Ellipsis)
@app.get("/items/")
async def read_items(q: Annotated[str, Query(min_length=3)] = ...):
  results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
  if q:
    results.update({"q": q})
  return results

# Multiple query parameters
@app.get("/test/")
async def read_items(q: Annotated[list[str] | None, Query()] = None):
  query_items = {"q": q}
  return query_items

# More metadata
@app.get("/test2/")
async def read_items(
  q: Annotated[
    str | None,
    Query(
      title="Query string",
      description="Query string for the items to search in the database that have a good match",
      min_length=3,
      max_length=50,
      alias="item-query",
    ),
  ] = None,
):
  results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
  if q:
    results.update({"q": q})
  return results

## POST / PUT

# Request body
from pydantic import BaseModel

class Item(BaseModel):
  name: str
  description: str | None = None
  price: float
  tax: float | None = None

@app.post("/items/")
async def create_item(item: Item):
  item_dict = item.dict()
  if item.tax:
    price_with_tax = item.price + item.tax
    item_dict.update({"price_with_tax": price_with_tax})
  return item_dict

# Request body + path parameters + query parameters
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item, q: str | None = None):
  result = {"item_id": item_id, **item.dict()}
  if q:
    result.update({"q": q})
  return result


