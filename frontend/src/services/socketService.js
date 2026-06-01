import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000";

class SocketService {
  constructor() {
    this.socket = null;
    this._pendingListeners = []; // queue listeners registered before connect()
  }

  connect(token) {
    if (this.socket?.connected) return;

    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    try {
      console.log("[SIO] Connecting to", SOCKET_URL);

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"], // allow polling fallback
      reconnection: true,
      reconnectionDelay: 2000,
      reconnectionAttempts: Infinity,
      timeout: 10000,
    });

    // Attach any listeners that were registered before connect() was called
    this._pendingListeners.forEach(({ event, cb }) => {
      this.socket.on(event, cb);
    });

    this.socket.on("connect", () => {
      console.log("[SIO] ✅ Connected:", this.socket.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("[SIO] ❌ Disconnected:", reason);
    });

    this.socket.on("connect_error", (err) => {
      console.error("[SIO] ❌ Connection error:", err.message);
    });
  } catch (e) {
    console.error("[SIO] Failed to create socket:", e);
  }
}

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this._pendingListeners = [];
  }

  sendMessage(receiverId, message) {
    if (!this.socket?.connected) {
      console.warn("[SIO] Not connected — cannot send");
      return false;
    }
    console.log("[SIO] 📤 send_message →", { receiverId, message });
    this.socket.emit("send_message", { receiverId, message });
    return true;
  }

  sendTyping(receiverId, typing) {
    this.socket?.emit("typing", { receiverId, typing });
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      // Queue it — will be attached when connect() is called
      this._pendingListeners.push({ event, cb: callback });
    }
    return () => this.off(event, callback);
  }

  off(event, callback) {
    this.socket?.off(event, callback);
    this._pendingListeners = this._pendingListeners.filter(
      (l) => !(l.event === event && l.cb === callback)
    );
  }

  isConnected() {
    return this.socket?.connected ?? false;
  }
}

const socketService = new SocketService();
export default socketService;
