from fastapi import WebSocket
from typing import Dict


class ConnectionManager:
    def __init__(self):
        # Maps userId -> WebSocket
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, user_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: str):
        self.active_connections.pop(user_id, None)

    def is_online(self, user_id: str) -> bool:
        return user_id in self.active_connections

    def get_online_users(self) -> list[str]:
        return list(self.active_connections.keys())

    async def send_to_user(self, user_id: str, data: dict):
        ws = self.active_connections.get(user_id)
        if ws:
            await ws.send_json(data)

    async def broadcast_online_status(self, user_id: str, online: bool):
        """Notify all connected users about a user's online/offline status."""
        for uid, ws in self.active_connections.items():
            if uid != user_id:
                try:
                    await ws.send_json({"type": "status", "userId": user_id, "online": online})
                except Exception:
                    pass


manager = ConnectionManager()
