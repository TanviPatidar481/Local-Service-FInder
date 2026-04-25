import React from "react";
import { MessageSquare } from "lucide-react";

// TODO: replace with:
// GET /provider/conversations       → list of conversations
// GET /provider/conversations/:id   → messages in a thread

const Messages = () => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex h-[calc(100vh-10rem)] items-center justify-center provider-dash">
    <div className="flex flex-col items-center gap-3 text-slate-400">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
        <MessageSquare size={28} className="text-slate-300" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-500">No messages yet</p>
        <p className="text-xs text-slate-400 mt-1">When customers message you, conversations will appear here.</p>
      </div>
    </div>
  </div>
);

export default Messages;
