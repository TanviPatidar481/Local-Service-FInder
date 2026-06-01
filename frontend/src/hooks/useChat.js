import { useState, useEffect, useRef, useCallback } from "react";
import socketService from "../services/socketService";
import api from "../services/axiosInstance";

const getToken = () => localStorage.getItem("token");

export function useChat(currentUserId, activeUserId) {
  const [messages,      setMessages]      = useState([]);
  const [conversations, setConversations] = useState([]);
  const [onlineUsers,   setOnlineUsers]   = useState([]);
  const [typingUsers,   setTypingUsers]   = useState({});
  const [connected,     setConnected]     = useState(false);

  const activeUserIdRef  = useRef(activeUserId);
  const currentUserIdRef = useRef(currentUserId);
  const typingTimers     = useRef({});

  useEffect(() => { activeUserIdRef.current  = activeUserId;  }, [activeUserId]);
  useEffect(() => { currentUserIdRef.current = currentUserId; }, [currentUserId]);

  // ── API helpers ────────────────────────────────────────────────────────────
  const loadConversations = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await api.get(`/conversations?token=${token}`);
      setConversations(res.data || []);
    } catch (e) {
      console.error("[Chat] loadConversations:", e);
    }
  }, []);

  const loadMessages = useCallback(async (otherId) => {
    const token = getToken();
    if (!token || !otherId) return;
    try {
      const res = await api.get(`/messages/${otherId}?token=${token}`);
      setMessages(res.data || []);
    } catch (e) {
      console.error("[Chat] loadMessages:", e);
    }
  }, []);

  // ── Socket listeners ───────────────────────────────────────────────────────
  // Socket is already connected by App.jsx (on load) or Login.jsx (on login).
  // We just register listeners here.
  useEffect(() => {
    if (!currentUserId) return;

    // If socket is already connected when this runs, bootstrap immediately
    if (socketService.isConnected()) {
      setConnected(true);
      loadConversations();
    }

    const unsubConnect = socketService.on("connect", () => {
      setConnected(true);
      loadConversations();
    });

    const unsubDisconnect = socketService.on("disconnect", () => {
      setConnected(false);
    });

    const unsubOnlineUsers = socketService.on("online_users", (data) => {
      setOnlineUsers(data.users || []);
    });

    const unsubUserOnline = socketService.on("user_online", (data) => {
      setOnlineUsers((prev) => [...new Set([...prev, data.userId])]);
      setConversations((prev) =>
        prev.map((c) => c.userId === data.userId ? { ...c, online: true } : c)
      );
    });

    const unsubUserOffline = socketService.on("user_offline", (data) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== data.userId));
      setConversations((prev) =>
        prev.map((c) => c.userId === data.userId ? { ...c, online: false } : c)
      );
    });

    const unsubReceive = socketService.on("receive_message", (data) => {
      const myId    = currentUserIdRef.current;
      const otherId = activeUserIdRef.current;

      console.log("[Chat] receive_message:", data, "myId:", myId, "otherId:", otherId);

      const isRelevant =
        (data.senderId === myId    && data.receiverId === otherId) ||
        (data.senderId === otherId && data.receiverId === myId);

      if (isRelevant) {
        setMessages((prev) => {
          // Replace optimistic placeholder
          const withoutOpt = prev.filter(
            (m) => !(m._optimistic && m._optimistic === data.message && m.senderId === myId)
          );
          if (withoutOpt.some((m) => m.id === data.id)) return withoutOpt;
          return [...withoutOpt, data];
        });
      }

      loadConversations();
    });

    const unsubTyping = socketService.on("typing", (data) => {
      setTypingUsers((prev) => ({ ...prev, [data.senderId]: data.typing }));
      clearTimeout(typingTimers.current[data.senderId]);
      if (data.typing) {
        typingTimers.current[data.senderId] = setTimeout(() => {
          setTypingUsers((prev) => ({ ...prev, [data.senderId]: false }));
        }, 3000);
      }
    });

    return () => {
      unsubConnect();
      unsubDisconnect();
      unsubOnlineUsers();
      unsubUserOnline();
      unsubUserOffline();
      unsubReceive();
      unsubTyping();
    };
  }, [currentUserId, loadConversations]);

  // ── Load history when active conversation changes ─────────────────────────
  useEffect(() => {
    if (activeUserId) {
      setMessages([]);
      loadMessages(activeUserId);
    }
  }, [activeUserId, loadMessages]);

  // ── Send with optimistic update ───────────────────────────────────────────
  const sendMessage = useCallback((text) => {
    const receiverId = activeUserIdRef.current;
    const senderId   = currentUserIdRef.current;
    if (!receiverId || !senderId || !text.trim()) return;

    // Show immediately
    const optimistic = {
      id:          `opt_${Date.now()}`,
      senderId,
      receiverId,
      message:     text.trim(),
      timestamp:   new Date().toISOString(),
      _optimistic: text.trim(),
    };
    setMessages((prev) => [...prev, optimistic]);

    // Emit
    socketService.sendMessage(receiverId, text.trim());
  }, []);

  const sendTyping = useCallback((typing) => {
    const receiverId = activeUserIdRef.current;
    if (receiverId) socketService.sendTyping(receiverId, typing);
  }, []);

  const isOnline = useCallback(
    (userId) => onlineUsers.includes(userId),
    [onlineUsers]
  );

  return {
    messages,
    conversations,
    connected,
    typingUsers,
    sendMessage,
    sendTyping,
    isOnline,
    loadConversations,
  };
}
