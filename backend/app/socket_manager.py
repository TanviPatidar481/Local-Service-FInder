import socketio
from app.database import messages_collection, users_collection, db
from app.core.security import decode_token
from bson import ObjectId
from datetime import datetime, timezone

# Create Socket.IO async server
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    logger=True,
    engineio_logger=False,
)

# Maps userId -> socketId  and  socketId -> userId
user_to_sid: dict[str, str] = {}
sid_to_user: dict[str, str] = {}

businesses_col = db["businesses"]


def get_display_name(user_id: str) -> str:
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if user:
            return user.get("full_name") or user.get("name") or user.get("email", "User")
        biz = businesses_col.find_one({"user_id": user_id})
        if biz:
            return biz.get("businessName") or biz.get("contactPerson") or "Provider"
    except Exception:
        pass
    return "Unknown"


def serialize_msg(doc: dict) -> dict:
    return {
        "id":         str(doc["_id"]),
        "senderId":   doc["senderId"],
        "receiverId": doc["receiverId"],
        "message":    doc["message"],
        "timestamp":  doc["timestamp"].isoformat(),
    }


# ── Events ────────────────────────────────────────────────────────────────────

@sio.event
async def connect(sid, environ, auth):
    """Called when a client connects. Auth token validated here."""
    token = None
    if auth and isinstance(auth, dict):
        token = auth.get("token")

    if not token:
        print(f"[SIO] ❌ No token from {sid}")
        return False  # reject connection

    payload = decode_token(token)
    if not payload:
        print(f"[SIO] ❌ Invalid token from {sid}")
        return False

    user_id = str(payload["user_id"])

    # If user already connected from another tab, disconnect old sid
    old_sid = user_to_sid.get(user_id)
    if old_sid and old_sid != sid:
        sid_to_user.pop(old_sid, None)

    user_to_sid[user_id] = sid
    sid_to_user[sid]     = user_id

    print(f"[SIO] ✅ Connected: userId={user_id} sid={sid}")
    print(f"[SIO] Online users: {list(user_to_sid.keys())}")

    # Tell everyone this user is online
    await sio.emit("user_online", {"userId": user_id})
    # Send current online list to the new user
    await sio.emit("online_users", {"users": list(user_to_sid.keys())}, to=sid)


@sio.event
async def disconnect(sid):
    user_id = sid_to_user.pop(sid, None)
    if user_id:
        user_to_sid.pop(user_id, None)
        print(f"[SIO] ❌ Disconnected: userId={user_id}")
        await sio.emit("user_offline", {"userId": user_id})


@sio.event
async def send_message(sid, data):
    """
    data = { receiverId, message }
    """
    sender_id   = sid_to_user.get(sid)
    receiver_id = data.get("receiverId", "").strip()
    text        = data.get("message", "").strip()

    if not sender_id or not receiver_id or not text:
        print(f"[SIO] ⚠️ Invalid send_message data: {data}")
        return

    print(f"[SIO] 📨 {sender_id} → {receiver_id}: {text!r}")

    # Save to MongoDB
    doc = {
        "senderId":   sender_id,
        "receiverId": receiver_id,
        "message":    text,
        "timestamp":  datetime.now(timezone.utc),
    }
    result = messages_collection.insert_one(doc)
    doc["_id"] = result.inserted_id

    out = serialize_msg(doc)

    # Emit to receiver if online
    receiver_sid = user_to_sid.get(receiver_id)
    if receiver_sid:
        await sio.emit("receive_message", out, to=receiver_sid)
        print(f"[SIO] ✅ Delivered to receiver sid={receiver_sid}")
    else:
        print(f"[SIO] 📦 Receiver {receiver_id} offline — stored only")

    # Echo back to sender to confirm + replace optimistic message
    await sio.emit("receive_message", out, to=sid)


@sio.event
async def typing(sid, data):
    receiver_id = data.get("receiverId", "")
    receiver_sid = user_to_sid.get(receiver_id)
    if receiver_sid:
        sender_id = sid_to_user.get(sid, "")
        await sio.emit("typing", {"senderId": sender_id, "typing": data.get("typing", False)}, to=receiver_sid)
