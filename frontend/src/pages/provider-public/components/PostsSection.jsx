import React, { useState } from "react";
import { ImagePlus, Heart, MessageCircle, X, Send } from "lucide-react";
import { SectionCard, EmptySlot } from "./ProfileShared";

const PostCard = ({ post, isOwner }) => {
  const [liked,        setLiked]        = useState(false);
  const [likes,        setLikes]        = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [comment,      setComment]      = useState("");
  const [comments,     setComments]     = useState(post.comments || []);

  const handleLike = () => { setLiked((p) => !p); setLikes((p) => liked ? p - 1 : p + 1); };
  const handleComment = () => {
    if (!comment.trim()) return;
    setComments((p) => [...p, { id: Date.now(), text: comment, author: "You" }]);
    setComment("");
  };

  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
      {post.image
        ? <div className="aspect-video bg-slate-100 overflow-hidden"><img src={post.image} alt={post.caption} className="w-full h-full object-cover" /></div>
        : <div className="aspect-video bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center"><ImagePlus size={32} className="text-emerald-300" strokeWidth={1.5} /></div>
      }
      <div className="p-4">
        {post.caption && <p className="text-sm text-slate-700 leading-relaxed mb-2">{post.caption}</p>}
        <p className="text-[10px] text-slate-400 font-medium mb-3">{post.createdAt}</p>
        <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
          <button onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${liked ? "text-red-500" : "text-slate-400 hover:text-red-400"}`}>
            <Heart size={14} strokeWidth={2} className={liked ? "fill-red-500" : ""} />
            {likes > 0 && likes}
          </button>
          <button onClick={() => setShowComments((p) => !p)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-600 transition-colors">
            <MessageCircle size={14} strokeWidth={2} />
            {comments.length > 0 && comments.length}
          </button>
        </div>
        {showComments && (
          <div className="mt-3 space-y-2">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 flex-shrink-0">
                  {c.author.charAt(0)}
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2">
                  <p className="text-[10px] font-bold text-slate-600">{c.author}</p>
                  <p className="text-xs text-slate-600">{c.text}</p>
                </div>
              </div>
            ))}
            {!isOwner && (
              <div className="flex items-center gap-2 mt-2">
                <input value={comment} onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleComment()}
                  placeholder="Write a comment..."
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-400" />
                <button onClick={handleComment}
                  className="w-7 h-7 bg-emerald-600 text-white rounded-lg flex items-center justify-center hover:bg-emerald-700">
                  <Send size={12} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const PostsSection = ({ posts, isOwner, onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [caption,  setCaption]  = useState("");

  const handlePost = () => {
    if (!caption.trim()) return;
    onAdd({ caption, image: null, likes: 0, comments: [] });
    setCaption("");
    setShowForm(false);
  };

  return (
    <SectionCard title="Posts & Updates" isOwner={isOwner} onEdit={() => setShowForm((p) => !p)}>

      {/* Hidden trigger for hero scroll shortcut */}
      {isOwner && <button data-trigger className="hidden" onClick={() => setShowForm(true)} />}

      {isOwner && showForm && (
        <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">New Post</p>
            <button onClick={() => setShowForm(false)}><X size={14} className="text-slate-400" strokeWidth={2.5} /></button>
          </div>
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)}
            placeholder="Share an update, offer, or announcement..." rows={3}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-400 resize-none bg-white" />
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors">
              <ImagePlus size={14} strokeWidth={2} /> Add Image
            </button>
            <button onClick={handlePost}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700">
              <Send size={12} strokeWidth={2.5} /> Post
            </button>
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <EmptySlot icon={ImagePlus} label="No posts yet"
          sub={isOwner ? "Share updates, offers, or announcements" : "This provider hasn't posted anything yet"} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => <PostCard key={post.id} post={post} isOwner={isOwner} />)}
        </div>
      )}
    </SectionCard>
  );
};

export default PostsSection;
