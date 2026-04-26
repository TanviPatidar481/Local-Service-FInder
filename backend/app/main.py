from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import database
from app.routes import auth_routes, business_routes, user_routes, provider_routes, providers_routes, posts_routes, bookings_routes

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
app.include_router(user_routes.router)
app.include_router(provider_routes.router)
app.include_router(providers_routes.router)
app.include_router(posts_routes.router)
app.include_router(bookings_routes.router)


@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}
