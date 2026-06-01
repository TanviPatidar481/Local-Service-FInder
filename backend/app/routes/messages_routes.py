from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query, HTTPException
from app.core.connection_manager import manager
from app.core.security import decode_token
from app.database import messages_collection, users_collection, db
from bson import ObjectId
from datetime import datetime, timezone

router = APIRouter()

businesses_collection = db["businesses"]


def get_display_name(user_id: str) -> str:
    """Look up a user's display name — checks users then businesses collection."""
    try:
        oid = ObjectId(user_id)
        # Check users collection first
        user = users_collection.find_one({"_id": oid})
        if user:
            return user.get("full_name") or user.get("name") or user.get("email", "User")
        # Check businesses collection
        biz = businesses_collection.find_one({"user_id": user_id})
        if biz:
            return biz.get("businessName") or biz.get("contactPerson") or "Provider"
    except Exception:
        pass
    return "Unknown"


def serialize_message(msg: dict) -> dict:
    return {
        "id":         str(msg["_id"]),
        "senderId":   msg["senderId"],
        "receiverId": msg["receiverId"],
        "message":    msg["message"],
        "timestamp":  msg["timestamp"].isoformat(),
    }


# ── WebSocket endpoint ────────────────────────────────────────────────────────

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    user_id: str,
    token: str = Query(...),
):
    # Authenticate
    payload = decode_token(token)
    if not payload:
        await websocket.close(code=4001)
        return

    token_user_id = str(payload.get("user_id", ""))
    if token_user_id != user_id:
        print(f"[WS] Auth mismatch: token={token_user_id} url={user_id}")
        await websocket.close(code=4001)
        return

    await manager.connect(user_id, websocket)
    await manager.broadcast_online_status(user_id, online=True)

    # Tell the new user who is currently online
    await websocket.send_json({
        "type":  "online_users",
        "users": manager.get_online_users(),
    })

    print(f"[WS] User {user_id} connected. Online: {manager.get_online_users()}")

    try:
        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")
            print(f"[WS] Received from {user_id}: {data}")

            if msg_type == "message":
                receiver_id = data.get("receiverId", "").strip()
                text        = data.get("message",    "").strip()

                if not receiver_id or not text:
                    print(f"[WS] Skipping empty message: receiver={receiver_id!r} text={text!r}")
                    continue

                # Save to MongoDB
                doc = {
                    "senderId":   user_id,
                    "receiverId": receiver_id,
                    "message":    text,
                    "timestamp":  datetime.now(timezone.utc),
                }
                result = messages_collection.insert_one(doc)
                doc["_id"] = result.inserted_id

                out = {"type": "message", **serialize_message(doc)}
                print(f"[WS] Saved message {doc['_id']}. Delivering to {receiver_id} and echoing to {user_id}")

                # Echo to sender (confirms delivery + updates optimistic message)
                await manager.send_to_user(user_id, out)

                # Deliver to receiver if online
                if manager.is_online(receiver_id):
                    await manager.send_to_user(receiver_id, out)
                else:
                    print(f"[WS] Receiver {receiver_id} is offline — message stored only")

            elif msg_type == "typing":
                receiver_id = data.get("receiverId", "")
                if receiver_id:
                    await manager.send_to_user(receiver_id, {
                        "type":     "typing",
                        "senderId": user_id,
                        "typing":   data.get("typing", False),
                    })

    except WebSocketDisconnect:
        manager.disconnect(user_id)
        await manager.broadcast_online_status(user_id, online=False)
        print(f"[WS] User {user_id} disconnected")


# ── REST endpoints ────────────────────────────────────────────────────────────

@router.get("/messages/{other_user_id}")
def get_messages(other_user_id: str, token: str = Query(...)):
    """Load message history between current user and another user."""
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = str(payload["user_id"])

    msgs = messages_collection.find({
        "$or": [
            {"senderId": user_id,      "receiverId": other_user_id},
            {"senderId": other_user_id, "receiverId": user_id},
        ]
    }).sort("timestamp", 1)

    return [serialize_message(m) for m in msgs]


@router.get("/conversations")
def get_conversations(token: str = Query(...)):
    """Return list of unique conversation partners with latest message."""
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = str(payload["user_id"])

    pipeline = [
        {
            "$match": {
                "$or": [{"senderId": user_id}, {"receiverId": user_id}]
            }
        },
        {"$sort": {"timestamp": -1}},
        {
            "$group": {
                "_id": {
                    "$cond": [
                        {"$eq": ["$senderId", user_id]},
                        "$receiverId",
                        "$senderId",
                    ]
                },
                "lastMessage": {"$first": "$message"},
                "timestamp":   {"$first": "$timestamp"},
            }
        },
        {"$sort": {"timestamp": -1}},
    ]

    results = list(messages_collection.aggregate(pipeline))

    return [
        {
            "userId":      r["_id"],
            "name":        get_display_name(r["_id"]),
            "lastMessage": r["lastMessage"],
            "timestamp":   r["timestamp"].isoformat(),
            "online":      manager.is_online(r["_id"]),
        }
        for r in results
    ]
