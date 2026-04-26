import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import MessageList from "../../components/dashboard/MessageList";
import ChatWindow from "../../components/dashboard/ChatWindow";

// TODO: replace with GET /user/conversations and GET /user/conversations/:id
const MOCK_CONVERSATIONS = [];

const UserMessages = () => {
  const [activeId, setActiveId] = useState(null);
  const active = MOCK_CONVERSATIONS.find((c) => c.id === activeId) || null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex h-[calc(100vh-10rem)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 border-r border-slate-100 flex flex-col flex-shrink-0">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800">Messages</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Conversations with providers</p>
        </div>
        {MOCK_CONVERSATIONS.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3 px-5">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <MessageSquare size={20} className="text-slate-300" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-semibold text-slate-500 text-center">No conversations yet</p>
            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              When you message a provider, conversations will appear here.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <MessageList conversations={MOCK_CONVERSATIONS} activeId={activeId} onSelect={setActiveId} />
          </div>
        )}
      </div>

      {/* Chat Area */}
      <ChatWindow conversation={active} />
    </div>
  );
};

export default UserMessages;
