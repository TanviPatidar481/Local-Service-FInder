import React from "react";

const MessageList = ({ conversations, activeId, onSelect }) => (
  <div className="flex flex-col">
    {conversations.map((conv) => (
      <button
        key={conv.id}
        onClick={() => onSelect(conv.id)}
        className={`flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
          activeId === conv.id
            ? "bg-emerald-50 border-r-2 border-emerald-500"
            : "hover:bg-slate-50 border-r-2 border-transparent"
        }`}
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center font-bold text-white text-xs flex-shrink-0 shadow-sm">
          {conv.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 truncate">{conv.name}</span>
            <span className="text-[10px] text-slate-400 ml-2 flex-shrink-0">{conv.time}</span>
          </div>
          <p className="text-[11px] text-slate-400 truncate mt-0.5 leading-relaxed">{conv.lastMessage}</p>
        </div>
        {conv.unread > 0 && (
          <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
            {conv.unread}
          </span>
        )}
      </button>
    ))}
  </div>
);

export default MessageList;
