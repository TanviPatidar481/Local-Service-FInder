from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import database
from app.routes import auth_routes
from app.routes import business_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(business_routes.router)

@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app import database   # important


# app = FastAPI()


# origins = ["http://localhost:5173"]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def home():
#     return {"message": "Backend is running 🚀"}