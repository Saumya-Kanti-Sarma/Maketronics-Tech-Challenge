# FastAPI + MongoDB CRUD API

This was my first time using FastAPI, and as the name suggests — it's lightweight and super fast. Here's an overview of the project, how the components are structured, and what each part does.

---

## 1. Package Overview

* **uvicorn**: ASGI web server used to serve FastAPI applications. Similar to `nodemon` in Node.js for live reloading.
* **motor**: Asynchronous MongoDB driver for Python. It's like `mongoose` for Node.js.
* **pydantic**: Handles request and response data validation using Python type hints. Ensures clean and validated data before hitting the business logic.
* **python-dotenv**: Loads environment variables from a `.env` file.

---

## 2. Project Structure and Flow

```
Backend/
│
├── app/
│   ├── main.py              # Main entry point of the FastAPI app
│   ├── routes/
│   │   └── routes.py        # Contains all API routes
│   ├── models/
│   │   └── models.py        # Pydantic models for validation
│   └── database/
│       └── database.py      # Handles MongoDB connection
│
├── requirements.txt
├── .env
└── render.yaml
```
> NOTE: Each directory has it's own `__init__.py` <br> ("`__init__.py` is an empty python file that tells python to use this directory as python package. Without it, Python may not recognize the folder as importable..") 

  

---

### 3. Interconnection Between Files

* `main.py` is the starting point. It creates the FastAPI instance and includes the route logic from `routes/routes.py`.
* `routes.py` defines all the HTTP endpoints and uses:

  * `models/models.py` for validating request and response data.
    #### 4. Models Used in `models.py`

        These Pydantic models ensure validation and structure:

      ```python
      class CreateProductModel:
          _id: str             # MongoDB ObjectId as string (due to serialization limitations)
          title: str
          link: str
          image: str
          price: float
          keyword: List[str]

      class UpdateProductModel:
          title: Optional[str]
          link: Optional[str]
          image: Optional[str]
          price: Optional[float]
          keyword: Optional[List[str]]
      ```
  * `database/database.py` to perform actual database operations with MongoDB using `motor`.

---

### 5. Diagram of Logical Flow

```
main.py
  └── includes → routes.py
                      ├── uses → models.py  (request/response schemas)
                      └── uses → database.py (MongoDB interaction)
```

---

### 6. Features Implemented

* Create a new product
* Read all products
* Read a product by ID
* Update a product
* Delete a product
* Filter products by keyword or price
* Sort products by price (low to high)

---

### 7. Future Features Implemented

* More Filter properties like response for dyncamic searches (like user may search a seller's name and it automatically shows seller's profile and his most sold items)
* Ratings collections that are linked with products
* Users Collections that'll allow user to sign-in
* Product recomendation system

