import React, { useState } from "react";
import { Send, MessageSquare } from "lucide-react";

const ChatWindow = ({ conversation }) => {
  const [input, setInput] = useState("");

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
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center font-bold text-white text-xs shadow-sm">
          {conversation.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{conversation.name}</p>
          <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 bg-slate-50/50">
        {conversation.messages?.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed ${
              msg.from === "me"
                ? "bg-emerald-600 text-white rounded-br-sm shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm shadow-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-slate-100 flex gap-3 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition-all"
        />
        <button
          onClick={() => setInput("")}
          className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Send size={15} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
