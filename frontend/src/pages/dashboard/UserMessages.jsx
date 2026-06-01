import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { useLocation } from "react-router-dom";
import MessageList from "../../components/dashboard/MessageList";
import ChatWindow from "../../components/dashboard/ChatWindow";
import { useChat } from "../../hooks/useChat";

const getCurrentUserId = () => {
  const stored = localStorage.getItem("userId");
  if (stored) return stored;
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id || null;
  } catch {
    return null;
  }
};

const UserMessages = () => {
  const currentUserId = getCurrentUserId();
  const location      = useLocation();

  const [activeUserId, setActiveUserId] = useState(null);
  const [pendingConv,  setPendingConv]  = useState(null);

  const { messages, conversations, connected, sendMessage, sendTyping, typingUsers, isOnline } =
    useChat(currentUserId, activeUserId);

  // Auto-open conversation when coming from provider profile
  useEffect(() => {
    const { startChatWith, name } = location.state || {};
    if (!startChatWith) return;
    setActiveUserId(startChatWith);
    setPendingConv({ userId: startChatWith, name: name || "Provider", lastMessage: "", timestamp: null });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Merge pending (new) conversation into list
  const mergedConversations = (() => {
    if (!pendingConv) return conversations;
    const exists = conversations.some((c) => c.userId === pendingConv.userId);
    return exists ? conversations : [pendingConv, ...conversations];
  })();

  const activeConversation = mergedConversations.find((c) => c.userId === activeUserId) || null;

  const convList = mergedConversations.map((c) => ({
    id:          c.userId,
    name:        c.name,
    lastMessage: c.lastMessage || "",
    time:        c.timestamp
      ? new Date(c.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "",
    unread:  0,
    online:  isOnline(c.userId),
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex h-[calc(100vh-10rem)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 border-r border-slate-100 flex flex-col flex-shrink-0">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800">Messages</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Conversations with providers</p>
        </div>

        {convList.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3 px-5">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <MessageSquare size={20} className="text-slate-300" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-semibold text-slate-500 text-center">No conversations yet</p>
            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Message a provider from their profile to start chatting.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <MessageList conversations={convList} activeId={activeUserId} onSelect={setActiveUserId} />
          </div>
        )}
      </div>

      {/* Chat */}
      <ChatWindow
        conversation={activeConversation ? { ...activeConversation, online: isOnline(activeUserId) } : null}
        messages={messages}
        currentUserId={currentUserId}
        connected={connected}
        onSend={sendMessage}
        onTyping={sendTyping}
        isTyping={typingUsers[activeUserId] || false}
      />
    </div>
  );
};

export default UserMessages;
