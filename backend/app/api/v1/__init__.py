from fastapi import APIRouter
from app.api.v1 import auth, bots

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(bots.router)
