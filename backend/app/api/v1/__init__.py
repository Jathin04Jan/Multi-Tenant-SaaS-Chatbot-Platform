from fastapi import APIRouter
from app.api.v1 import auth, bots, ui_configs, snippets, chat

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(bots.router)
api_router.include_router(ui_configs.router)
api_router.include_router(snippets.router)
api_router.include_router(chat.router)
