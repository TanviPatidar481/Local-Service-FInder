import React, { useState, useEffect, useRef } from "react";
import { Send, MessageSquare } from "lucide-react";

const ChatWindow = ({
  conversation,
  messages = [],
  currentUserId,
  onSend,
  onTyping,
  isTyping,
  connected,
}) => {
  const [input, setInput]   = useState("");
  const bottomRef           = useRef(null);
  const typingTimeout       = useRef(null);
  const inputRef            = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
    onTyping?.(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    onTyping?.(true);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => onTyping?.(false), 1500);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
          <MessageSquare size={24} className="text-slate-300" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500">No conversation selected</p>
          <p className="text-xs text-slate-400 mt-1">Choose a chat from the left to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">

      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center font-bold text-white text-xs shadow-sm">
            {conversation.name?.charAt(0)?.toUpperCase() ?? "?"}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{conversation.name}</p>
            {isTyping ? (
              <p className="text-[10px] text-emerald-500 font-semibold animate-pulse">typing...</p>
            ) : (
              <p className={`text-[10px] font-semibold flex items-center gap-1 ${conversation.online ? "text-emerald-500" : "text-slate-400"}`}>
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${conversation.online ? "bg-emerald-400" : "bg-slate-300"}`} />
                {conversation.online ? "Online" : "Offline"}
              </p>
            )}
          </div>
        </div>
        <div className={`text-[10px] font-semibold px-2 py-1 rounded-full ${connected ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-400"}`}>
          {connected ? "● Live" : "○ Connecting..."}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2 bg-slate-50/50">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center h-full">
            <p className="text-xs text-slate-400">No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg) => {
            // String comparison to avoid type mismatch
            const isMe        = String(msg.senderId) === String(currentUserId);
            const isOptimistic = Boolean(msg._optimistic);

            return (
              <div
                key={msg.id}
                className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={[
                    "max-w-[70%] px-4 py-2.5 text-xs font-medium leading-relaxed break-words",
                    isMe
                      ? `bg-emerald-600 text-white rounded-2xl rounded-br-none shadow-sm ${isOptimistic ? "opacity-60" : "opacity-100"}`
                      : "bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-bl-none shadow-sm",
                  ].join(" ")}
                >
                  <p>{msg.message}</p>
                  <div className={`text-[9px] mt-1 flex items-center gap-1 ${isMe ? "text-emerald-200 justify-end" : "text-slate-400"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    {isMe && (isOptimistic ? <span>⏳</span> : <span>✓</span>)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-slate-100 flex gap-3 bg-white flex-shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <Send size={15} strokeWidth={2.5} />
        </button>
      </div>

    </div>
  );
};

export default ChatWindow;
