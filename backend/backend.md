fastapi-mongo-crud/
│
├── app/
│   ├── main.py             # FastAPI app entry
│   ├── config.py           # Load env and DB
│   ├── models/             # Pydantic models
│   │   └── user_model.py
│   ├── database/           # DB operations
│   │   └── user_crud.py
│   ├── routes/             # API routes
│   │   └── user_route.py
│   └── schemas/            # Request/Response schemas
│       └── user_schema.py
│
├── .env                    # Environment vars
├── requirements.txt        # Python packages
└── README.md
