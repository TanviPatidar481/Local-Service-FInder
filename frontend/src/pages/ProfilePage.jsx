import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import {
  ArrowLeft, MapPin, Globe, Tag, Star, BadgeCheck,
  MessageSquare, CalendarDays, Bell, ChevronDown, Briefcase,
  ImagePlus, Shield, Users, Pencil, X, Save, Plus, MoreVertical,
  Trash2, IndianRupee, Heart, MessageCircle, Upload,
} from "lucide-react";
import api from "../services/axiosInstance";

const TABS = ["Overview", "Services", "Posts", "Reviews", "About"];
const PRICE_TYPES = ["per hour", "per day", "per week", "per month"];
const CATEGORIES  = ["Mathematics", "Science", "English", "Coding", "Music", "Dance", "Art", "Sports", "Other"];
const EMPTY_SERVICE = { title:"", description:"", price:"", priceType:"per hour", category:"", customCategory:"" };

// Shared input styles — defined early so all components can use them
const lbl = { fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 };
const inp = { width:"100%", border:"1px solid #d1d5db", borderRadius:8, padding:"8px 10px", fontSize:13, outline:"none", boxSizing:"border-box", background:"#fff" };

const Stars = ({ rating }) => (
  <span style={{ display:"flex", gap:2 }}>
    {[1,2,3,4,5].map(i => <Star key={i} size={13} strokeWidth={0} fill={i <= Math.round(rating) ? "#f59e0b" : "#e2e8f0"} />)}
  </span>
);

// ── Add Service Modal ─────────────────────────────────────────────────────────
const AddServiceModal = ({ onClose, onSave, initial }) => {
  const [form, setForm]     = useState(initial ? {
    title: initial.title, description: initial.description,
    price: initial.price, priceType: initial.priceType,
    category: CATEGORIES.includes(initial.category) ? initial.category : (initial.category ? "Other" : ""),
    customCategory: CATEGORIES.includes(initial.category) ? "" : (initial.category || ""),
  } : { ...EMPTY_SERVICE });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");
  const isEdit = !!initial;

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const valid = form.title.trim() && form.description.trim() && form.price;

  const submit = async () => {
    if (!valid) { setError("Title, description and price are required."); return; }
    setSaving(true); setError("");
    try {
      const finalCategory = form.category === "Other" ? form.customCategory : form.category;
      console.log("[AddService] Calling API:", isEdit ? "PUT" : "POST", "payload:", form);
      if (isEdit) {
        await api.put(`/provider/services/${initial.id}`, {
          name: form.title, description: form.description,
          price: form.price, duration: form.priceType, category: finalCategory,
        });
        onSave({ ...initial, title: form.title, description: form.description,
          price: form.price, priceType: form.priceType, category: finalCategory });
      } else {
        const res = await api.post("/provider/services", {
          name: form.title, description: form.description,
          price: form.price, duration: form.priceType, category: finalCategory,
        });
        console.log("[AddService] API response:", res.data);
        onSave({ id: res.data.service_id, title: form.title,
          description: form.description, price: form.price,
          priceType: form.priceType, category: finalCategory });
      }
      onClose();
    } catch (err) {
      console.error("[AddService] API error:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Failed to save service. Check if backend is running.");
    } finally { setSaving(false); }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#fff", borderRadius:16, width:460, maxWidth:"95vw", padding:"24px", boxShadow:"0 8px 32px rgba(0,0,0,0.15)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:"#111827", margin:0 }}>{isEdit ? "Edit Service" : "Add New Service"}</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#6b7280" }}><X size={18} /></button>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div>
            <label style={lbl}>Service Title <span style={{ color:"#ef4444" }}>*</span></label>
            <input name="title" value={form.title} onChange={handle} placeholder="e.g. Mathematics Tutoring"
              style={inp} />
          </div>
          <div>
            <label style={lbl}>Description <span style={{ color:"#ef4444" }}>*</span></label>
            <textarea name="description" value={form.description} onChange={handle} rows={3}
              placeholder="Describe your service..." style={{ ...inp, resize:"vertical" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={lbl}>Price <span style={{ color:"#ef4444" }}>*</span></label>
              <input name="price" value={form.price} onChange={handle} placeholder="e.g. 500" type="number"
                style={inp} />
            </div>
            <div>
              <label style={lbl}>Price Type</label>
              <select name="priceType" value={form.priceType} onChange={handle} style={inp}>
                {PRICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={lbl}>Category (Optional)</label>
            <select name="category" value={form.category} onChange={handle} style={inp}>
              <option value="">Select category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {form.category === "Other" && (
            <div>
              <label style={lbl}>Enter custom category</label>
              <input name="customCategory" value={form.customCategory} onChange={handle}
                placeholder="Enter category name" style={inp} />
            </div>
          )}
          {error && <p style={{ fontSize:12, color:"#ef4444", margin:0 }}>{error}</p>}
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}>
          <button onClick={onClose} style={{ padding:"8px 18px", border:"1.5px solid #d1d5db", borderRadius:8, background:"#fff", fontSize:13, fontWeight:600, color:"#374151", cursor:"pointer" }}>Cancel</button>
          <button onClick={submit} disabled={saving}
            style={{ padding:"8px 18px", border:"none", borderRadius:8, background: saving ? "#86efac" : "#16a34a", fontSize:13, fontWeight:600, color:"#fff", cursor: saving ? "not-allowed" : "pointer" }}>
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Save Service"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Service Card ──────────────────────────────────────────────────────────────
const ServiceCard = ({ service, isOwner, onDelete, onEdit }) => {
  const [menu, setMenu]         = useState(false);
  const [expanded, setExpanded] = useState(false);
  const menuRef                 = useRef(null);

  // close menu on outside click
  useEffect(() => {
    if (!menu) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menu]);

  return (
    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid #f1f5f9" }}>
      <div style={{ flex:1, minWidth:0, paddingRight:12 }}>
        <p style={{ fontSize:14, fontWeight:600, color:"#111827", margin:0 }}>{service.title}</p>
        {service.category && <p style={{ fontSize:11, color:"#6b7280", margin:"2px 0 0" }}>{service.category}</p>}
        {service.description && (
          <p
            onClick={() => setExpanded(p => !p)}
            style={{
              fontSize:12, color:"#9ca3af", margin:"4px 0 0",
              cursor:"pointer",
              display:"-webkit-box", WebkitBoxOrient:"vertical",
              WebkitLineClamp: expanded ? "unset" : 2,
              overflow: expanded ? "visible" : "hidden",
              transition:"opacity 0.15s",
              opacity: 0.85,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}
          >
            {service.description}
          </p>
        )}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
        <span style={{ display:"flex", alignItems:"center", gap:2, fontSize:13, fontWeight:700, color:"#16a34a", whiteSpace:"nowrap" }}>
          <IndianRupee size={12} strokeWidth={2.5} />{service.price}
          <span style={{ fontSize:11, color:"#6b7280", fontWeight:500 }}>/ {service.priceType}</span>
        </span>
        {isOwner && (
          <div ref={menuRef} style={{ position:"relative" }}>
            <button onClick={() => setMenu(m => !m)}
              style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", padding:4, display:"flex", alignItems:"center" }}>
              <MoreVertical size={16} />
            </button>
            {menu && (
              <div style={{ position:"absolute", right:0, top:26, background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, boxShadow:"0 4px 12px rgba(0,0,0,0.1)", zIndex:20, minWidth:120 }}>
                <button onClick={() => { onEdit(service); setMenu(false); }}
                  style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"9px 14px", border:"none", background:"none", fontSize:13, color:"#374151", cursor:"pointer" }}>
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => { onDelete(service.id); setMenu(false); }}
                  style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"9px 14px", border:"none", background:"none", fontSize:13, color:"#ef4444", cursor:"pointer" }}>
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Book Now Modal ────────────────────────────────────────────────────────────
const BookNowModal = ({ service, providerId, onClose }) => {
  const [form, setForm]     = useState({ date:"", time:"", message:"" });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState(false);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const valid  = form.date && form.time;

  const submit = async () => {
    if (!valid) { setError("Date and time are required."); return; }
    setSaving(true); setError("");
    try {
      await api.post("/bookings", {
        providerId,
        serviceId: service.id,
        date:      form.date,
        time:      form.time,
        message:   form.message,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to send booking request.");
    } finally { setSaving(false); }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background:"#fff", borderRadius:16, width:440, maxWidth:"95vw", padding:"24px", boxShadow:"0 8px 32px rgba(0,0,0,0.18)" }}>
        {success ? (
          <div style={{ textAlign:"center", padding:"16px 0" }}>
            <div style={{ width:56, height:56, borderRadius:"50%", background:"#f0fdf4", border:"2px solid #bbf7d0", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 style={{ fontSize:16, fontWeight:700, color:"#111827", margin:"0 0 8px" }}>Booking Request Sent!</h3>
            <p style={{ fontSize:13, color:"#6b7280", margin:"0 0 20px" }}>Your booking request has been sent to the provider.</p>
            <button onClick={onClose} style={{ padding:"9px 24px", background:"#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <h2 style={{ fontSize:16, fontWeight:700, color:"#111827", margin:0 }}>Book Service</h2>
              <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#6b7280" }}><X size={18} /></button>
            </div>
            <div style={{ background:"#f8fafc", borderRadius:10, padding:"10px 14px", marginBottom:16 }}>
              <p style={{ fontSize:12, color:"#6b7280", margin:"0 0 3px" }}>Service</p>
              <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>{service.title}</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div>
                  <label style={lbl}>Date <span style={{ color:"#ef4444" }}>*</span></label>
                  <input name="date" type="date" value={form.date} onChange={handle} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Time <span style={{ color:"#ef4444" }}>*</span></label>
                  <input name="time" type="time" value={form.time} onChange={handle} style={inp} />
                </div>
              </div>
              <div>
                <label style={lbl}>Message (optional)</label>
                <textarea name="message" value={form.message} onChange={handle} rows={3}
                  placeholder="Any specific instructions..."
                  style={{ ...inp, resize:"vertical" }} />
              </div>
              {error && <p style={{ fontSize:12, color:"#ef4444", margin:0 }}>{error}</p>}
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}>
              <button onClick={onClose} style={{ padding:"8px 18px", border:"1.5px solid #d1d5db", borderRadius:8, background:"#fff", fontSize:13, fontWeight:600, color:"#374151", cursor:"pointer" }}>Cancel</button>
              <button onClick={submit} disabled={saving}
                style={{ padding:"8px 22px", border:"none", borderRadius:8, background: saving ? "#86efac" : "#16a34a", fontSize:13, fontWeight:600, color:"#fff", cursor: saving ? "not-allowed" : "pointer" }}>
                {saving ? "Sending..." : "Confirm Booking"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
const CreatePostModal = ({ onClose, onSave, initial }) => {
  const [content, setContent]   = useState(initial?.content || "");
  const [image, setImage]       = useState(initial?.image || null);
  const [preview, setPreview]   = useState(initial?.image || null);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");
  const isEdit = !!initial;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setImage(ev.target.result); setPreview(ev.target.result); };
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    if (!content.trim()) { setError("Content is required."); return; }
    setSaving(true); setError("");
    try {
      if (isEdit) {
        await api.put(`/posts/${initial.id}`, { content, image });
        onSave({ ...initial, content, image });
      } else {
        const res = await api.post("/posts", { content, image });
        onSave(res.data);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save post.");
    } finally { setSaving(false); }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background:"#fff", borderRadius:16, width:440, maxWidth:"95vw", padding:"24px", boxShadow:"0 8px 32px rgba(0,0,0,0.18)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:"#111827", margin:0 }}>{isEdit ? "Edit Post" : "Create New Post"}</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#6b7280" }}><X size={18} /></button>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={lbl}>Content <span style={{ color:"#ef4444" }}>*</span></label>
            <textarea value={content} onChange={e => setContent(e.target.value)} maxLength={500}
              rows={4} placeholder="What's on your mind?"
              style={{ ...inp, resize:"vertical" }} />
            <p style={{ fontSize:11, color:"#9ca3af", textAlign:"right", margin:"3px 0 0" }}>{content.length}/500</p>
          </div>

          <div>
            <label style={lbl}>Image (Optional)</label>
            <label style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"1.5px dashed #d1d5db", borderRadius:10, padding:"20px", cursor:"pointer", background:"#fafafa", gap:6 }}>
              {preview ? (
                <img src={preview} alt="preview" style={{ maxHeight:140, borderRadius:8, objectFit:"cover" }} />
              ) : (
                <>
                  <Upload size={22} color="#9ca3af" strokeWidth={1.5} />
                  <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>Click to upload image</p>
                  <p style={{ fontSize:11, color:"#d1d5db", margin:0 }}>PNG, JPG up to 5MB</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImage} style={{ display:"none" }} />
            </label>
          </div>

          {error && <p style={{ fontSize:12, color:"#ef4444", margin:0 }}>{error}</p>}
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}>
          <button onClick={onClose} style={{ padding:"8px 18px", border:"1.5px solid #d1d5db", borderRadius:8, background:"#fff", fontSize:13, fontWeight:600, color:"#374151", cursor:"pointer" }}>Cancel</button>
          <button onClick={submit} disabled={saving}
            style={{ padding:"8px 22px", border:"none", borderRadius:8, background: saving ? "#86efac" : "#16a34a", fontSize:13, fontWeight:600, color:"#fff", cursor: saving ? "not-allowed" : "pointer" }}>
            {saving ? "Posting..." : isEdit ? "Save" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Post Card ─────────────────────────────────────────────────────────────────
const timeAgo = (iso) => {
  if (!iso) return "just now";
  return dayjs(iso).fromNow();
};

const PostCard = ({ post, isOwner, avatar, name, onDelete, onEdit }) => {
  const [menu,    setMenu]    = useState(false);
  const [confirm, setConfirm] = useState(false);
  const menuRef               = useRef(null);

  useEffect(() => {
    if (!menu) return;
    const h = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [menu]);

  return (
    <>
      <div style={{
        background:"#fff", borderRadius:14, border:"1px solid #e5e7eb",
        overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
        transition:"box-shadow 0.2s", display:"flex", flexDirection:"column",
      }}
        onMouseEnter={e => e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.10)"}
        onMouseLeave={e => e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06)"}
      >
        {/* Author row + caption — padded */}
        <div style={{ padding:"12px 14px 10px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#16a34a", flexShrink:0 }}>
                {avatar}
              </div>
              <div>
                <p style={{ fontSize:12, fontWeight:700, color:"#111827", margin:0 }}>{name}</p>
                <p style={{ fontSize:10, color:"#9ca3af", margin:0 }}>{post.created_at ? timeAgo(post.created_at) : "just now"}</p>
              </div>
            </div>
            {isOwner && (
              <div ref={menuRef} style={{ position:"relative" }}>
                <button onClick={() => setMenu(m => !m)}
                  style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", padding:4, display:"flex" }}>
                  <MoreVertical size={15} />
                </button>
                {menu && (
                  <div style={{ position:"absolute", right:0, top:24, background:"#fff", border:"1px solid #e5e7eb", borderRadius:10, boxShadow:"0 4px 12px rgba(0,0,0,0.1)", zIndex:20, minWidth:130 }}>
                    <button onClick={() => { onEdit(post); setMenu(false); }}
                      style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"8px 12px", border:"none", background:"none", fontSize:12, color:"#374151", cursor:"pointer" }}>
                      <Pencil size={12} /> Edit
                    </button>
                    <button onClick={() => { setConfirm(true); setMenu(false); }}
                      style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"8px 12px", border:"none", background:"none", fontSize:12, color:"#ef4444", cursor:"pointer" }}>
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {post.content && (
            <p style={{ fontSize:12, color:"#374151", lineHeight:1.55, margin:0,
              display:"-webkit-box", WebkitBoxOrient:"vertical", WebkitLineClamp:3, overflow:"hidden" }}>
              {post.content}
            </p>
          )}
        </div>

        {/* Image — full image, natural size, no cropping */}
        {post.image && (
          <img src={post.image} alt="post"
            style={{ width:"100%", display:"block" }} />
        )}

        {/* Actions */}
        <div style={{ padding:"8px 14px", display:"flex", gap:14, borderTop:"1px solid #f3f4f6" }}>
          <button style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:"#6b7280", background:"none", border:"none", cursor:"pointer", fontWeight:500 }}>
            <Heart size={13} strokeWidth={1.8} /> Like
          </button>
          <button style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:"#6b7280", background:"none", border:"none", cursor:"pointer", fontWeight:500 }}>
            <MessageCircle size={13} strokeWidth={1.8} /> Comment
          </button>
        </div>
      </div>

      {/* Delete confirmation */}
      {confirm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:110, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"#fff", borderRadius:16, width:360, padding:"24px", boxShadow:"0 8px 32px rgba(0,0,0,0.15)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#111827", margin:0 }}>Delete Post</h3>
              <button onClick={() => setConfirm(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"#6b7280" }}><X size={16} /></button>
            </div>
            <p style={{ fontSize:13, color:"#6b7280", margin:"0 0 20px" }}>Are you sure you want to delete this post? This action cannot be undone.</p>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={() => setConfirm(false)} style={{ padding:"8px 18px", border:"1.5px solid #d1d5db", borderRadius:8, background:"#fff", fontSize:13, fontWeight:600, color:"#374151", cursor:"pointer" }}>Cancel</button>
              <button onClick={() => { onDelete(post.id); setConfirm(false); }}
                style={{ padding:"8px 18px", border:"none", borderRadius:8, background:"#ef4444", fontSize:13, fontWeight:600, color:"#fff", cursor:"pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const EmptyState = ({ icon: Icon, title, msg, cta, onCta, isOwner }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"28px 0", gap:8 }}>
    <div style={{ width:52, height:52, borderRadius:14, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <Icon size={24} color="#86efac" strokeWidth={1.5} />
    </div>
    <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:0 }}>{title}</p>
    <p style={{ fontSize:12, color:"#9ca3af", margin:0, textAlign:"center", maxWidth:300 }}>{msg}</p>
    {isOwner && cta && (
      <button onClick={onCta} style={{ marginTop:6, padding:"7px 18px", background:"#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>{cta}</button>
    )}
  </div>
);

export default function ProfilePage() {
  const navigate  = useNavigate();
  const { id: urlId } = useParams();          // profile being viewed
  const [tab, setTab] = useState("Overview");

  // Real auth from localStorage
  const loggedInUserId = localStorage.getItem("userId") || "";
  const loggedInRole   = localStorage.getItem("role") || "";
  const businessBasic  = JSON.parse(localStorage.getItem("businessBasicInfo") || "{}");
  const loggedInName   = businessBasic.businessName || businessBasic.contactPerson
    || (loggedInRole === "provider" ? localStorage.getItem("businessName") || "Provider" : "User");
  const loggedInAvatar = loggedInName.charAt(0).toUpperCase();

  // Profile ID to load: URL param if present, else logged-in user's own profile
  const profileUserId = urlId || loggedInUserId;

  const emptyProfile = {
    id: loggedInUserId, name: "", username: "", avatar: loggedInAvatar,
    location: "", serviceMode: "", category: "", memberSince: "",
    rating: 0, reviewCount: 0, totalBookings: 0, bio: "",
    businessName: "", city: "", locality: "", description: "",
  };

  const [profileData, setProfileData] = useState(emptyProfile);
  const [loading, setLoading]         = useState(true);
  const [isEditMode, setIsEditMode]   = useState(false);
  const [formData, setFormData]       = useState({ ...emptyProfile });
  const [saving, setSaving]           = useState(false);
  const [saveError, setSaveError]     = useState("");
  const [isOwnerState, setIsOwnerState] = useState(false);

  // isOwner comes from backend via /full endpoint
  const isOwner = isOwnerState;

  // Services state
  const [services, setServices]             = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Posts state
  const [posts, setPosts]               = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editingPost, setEditingPost]   = useState(null);
  const [postSuccess, setPostSuccess]   = useState(false);

  // Booking state
  const [bookingService, setBookingService] = useState(null);

  // Load profile + services + posts on mount
  useEffect(() => {
    if (!profileUserId) { setLoading(false); return; }

    api.get(`/providers/${profileUserId}/full`)
      .then(res => {
        const { profile: d, services: svcs, posts: ps, isOwner: owner } = res.data;

        const built = {
id: d.id,
user_id: d.user_id,
          name:         d.businessName || d.contactPerson || "",
          username:     `@${(d.businessName || "provider").toLowerCase().replace(/\s+/g, "")}`,
          avatar:       (d.businessName || d.contactPerson || "P").charAt(0).toUpperCase(),
          location:     `${d.city || ""}${d.locality ? ", " + d.locality : ""}`,
          serviceMode:  d.serviceMode || d.service_mode || "",
          category:     d.category || "",
          memberSince:  d.memberSince || d.member_since || "",
          rating:       d.rating || 0,
          reviewCount:  d.reviewCount || d.review_count || 0,
          totalBookings: d.totalBookings || d.total_bookings || 0,
          bio:          d.description || "",
          businessName: d.businessName || "",
          city:         d.city || "",
          locality:     d.locality || "",
          description:  d.description || "",
        };

        setProfileData(built);
        setFormData(built);
        setIsOwnerState(owner);

        setServices(svcs.map(s => ({
          id:          s.id,
          title:       s.name,
          description: s.description,
          price:       s.price,
          priceType:   s.duration || "per hour",
          category:    s.category || "",
        })));

        setPosts(ps);
      })
      .catch(() => {
        // Fallback to localStorage onboarding data when API is unavailable
        const basic = JSON.parse(localStorage.getItem("businessBasicInfo") || "{}");
        const loc   = JSON.parse(localStorage.getItem("businessLocation")  || "{}");
        const cat   = JSON.parse(localStorage.getItem("businessCategory")  || "{}");
        const storedId = localStorage.getItem("userId") || "";
        const name = basic.businessName || basic.contactPerson || "";
        setProfileData({
          id:           storedId,
          name,
          username:     name ? `@${name.toLowerCase().replace(/\s+/g, "")}` : "",
          avatar:       (name || "P").charAt(0).toUpperCase(),
          location:     `${loc.city || ""}${loc.locality ? ", " + loc.locality : ""}`,
          serviceMode:  basic.serviceMode  || "",
          category:     cat.category       || "",
          memberSince:  "",
          rating:       0,
          reviewCount:  0,
          totalBookings: 0,
          bio:          basic.description  || "",
          businessName: basic.businessName || "",
          city:         loc.city           || "",
          locality:     loc.locality       || "",
          description:  basic.description  || "",
        });
        setFormData({
          businessName: basic.businessName || "",
          category:     cat.category       || "",
          serviceMode:  basic.serviceMode  || "",
          city:         loc.city           || "",
          locality:     loc.locality       || "",
          description:  basic.description  || "",
        });
        setIsOwnerState(storedId === profileUserId || profileUserId === "me");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setIsEditMode(false);
    setSaveError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    try {
      const userId = localStorage.getItem("userId") || profileData.id;
      const res = await api.put(`/provider/profile/${userId}`, {
        businessName: formData.businessName,
        category:     formData.category,
        serviceMode:  formData.serviceMode,
        city:         formData.city,
        locality:     formData.locality,
        description:  formData.description,
      });
      const updated = res.data;
      setProfileData(prev => ({
        ...prev,
        businessName: updated.businessName || prev.businessName,
        name:         updated.businessName || prev.name,
        category:     updated.category     || prev.category,
        serviceMode:  updated.serviceMode  || prev.serviceMode,
        city:         updated.city         || prev.city,
        locality:     updated.locality     || prev.locality,
        description:  updated.description  || prev.description,
        bio:          updated.description  || prev.bio,
        location:     `${updated.city || prev.city}${updated.locality || prev.locality ? ", " + (updated.locality || prev.locality) : ""}`,
      }));
      setIsEditMode(false);
    } catch (err) {
      setSaveError(err.response?.data?.detail || "Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  // helpers
  const field = (name, placeholder, type = "text") => (
    <input name={name} value={formData[name] || ""} onChange={handleChange}
      placeholder={placeholder} type={type}
      style={{ width:"100%", border:"1px solid #d1d5db", borderRadius:8, padding:"7px 10px", fontSize:13, outline:"none", boxSizing:"border-box" }} />
  );

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f1f5f9", fontFamily:"'Segoe UI',sans-serif" }}>
      <p style={{ color:"#6b7280", fontSize:14 }}>Loading profile...</p>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#f1f5f9", fontFamily:"'Segoe UI','Inter',sans-serif" }}>

      {/* ── Header ── */}
      <header style={{ height:52, background:"#fff", borderBottom:"1px solid #e5e7eb", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 32px", position:"sticky", top:0, zIndex:40 }}>
        <button onClick={() => navigate(-1)} style={{ display:"flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600,
           color:"#374151", background:"none", border:"none", cursor:"pointer" }}>
          <ArrowLeft size={15} strokeWidth={2.5} /> Back
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:"#16a34a", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/></svg>
          </div>
          <span style={{ fontSize:17, fontWeight:800, color:"#111827" }}>LocalBuddy</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ position:"relative", cursor:"pointer" }}>
            <Bell size={18} strokeWidth={1.8} color="#374151" />
            <span style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:"#ef4444", border:"2px solid #fff" }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"#16a34a", color:"#fff", fontWeight:700, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {loggedInAvatar}
            </div>
            <span style={{ fontSize:14, fontWeight:600, color:"#111827" }}>{loggedInName}</span>
            <ChevronDown size={14} color="#6b7280" />
          </div>
        </div>
      </header>

      <div style={{ width:"100%", padding:"24px 24px 24px 24px", display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, alignItems:"start", boxSizing:"border-box" }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:14, minWidth:0 }}>

          {/* Profile card — cover goes edge to edge inside card */}
          <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>

            {/* Cover — full width, 180px tall */}
            <div style={{ width:"100%", height:180, overflow:"hidden", display:"block" }}>
              <img src="/bg.jpg" alt="cover"
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block" }} />
            </div>

            {/* Avatar + info + buttons — inside padding */}
            <div style={{ padding:"0 24px 6px" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:16, marginTop:-40 }}>

                {/* Avatar 90px */}
                <div style={{ position:"relative", flexShrink:0 }}>
                  <div style={{ width:90, height:90, borderRadius:"50%", background:"#dcfce7", border:"4px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, fontWeight:800, color:"#16a34a", boxShadow:"0 2px 8px rgba(0,0,0,0.12)" }}>
                    {profileData.avatar}
                  </div>
                  <div style={{ position:"absolute", bottom:5, right:3, width:22, height:22, borderRadius:"50%", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}>
                    <BadgeCheck size={15} fill="#16a34a" color="white" />
                  </div>
                </div>

                {/* Name/meta + buttons in one flex row */}
                <div style={{ flex:1, display:"flex", alignItems:"flex-start", justifyContent:"space-between", paddingTop:44, gap:12, minWidth:0 }}>

                  {/* Name + meta */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                      <h1 style={{ fontSize:20, fontWeight:800, color:"#111827", margin:0 }}>{profileData.name}</h1>
                      <span style={{ display:"flex", alignItems:"center", gap:3, fontSize:11, fontWeight:700, color:"#16a34a", background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:99, padding:"2px 8px" }}>
                        <BadgeCheck size={11} color="#16a34a" strokeWidth={2.5} /> Verified
                      </span>
                    </div>
                    <p style={{ fontSize:13, color:"#6b7280", margin:"3px 0 7px" }}>{profileData.username}</p>

                    {isEditMode ? (
                      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:8 }}>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                          {field("businessName", "Business Name")}
                          {field("category", "Category")}
                          {field("city", "City")}
                          {field("locality", "Locality")}
                        </div>
                        <div>
                          <label style={{ fontSize:11, color:"#6b7280", fontWeight:600 }}>Service Mode</label>
                          <select name="serviceMode" value={formData.serviceMode || ""} onChange={handleChange}
                            style={{ width:"100%", border:"1px solid #d1d5db", borderRadius:8, padding:"7px 10px", fontSize:13, outline:"none", marginTop:2 }}>
                            <option value="">Select</option>
                            <option value="Online">Online</option>
                            <option value="Offline Service">Offline Service</option>
                            <option value="Both">Both</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize:11, color:"#6b7280", fontWeight:600 }}>Description</label>
                          <textarea name="description" value={formData.description || ""} onChange={handleChange}
                            rows={3} placeholder="Describe your services..."
                            style={{ width:"100%", border:"1px solid #d1d5db", borderRadius:8, padding:"7px 10px", fontSize:13, outline:"none", resize:"vertical", marginTop:2, boxSizing:"border-box" }} />
                        </div>
                        {saveError && <p style={{ fontSize:12, color:"#ef4444", margin:0 }}>{saveError}</p>}
                      </div>
                    ) : (
                      <>
                        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", fontSize:13, color:"#374151", marginBottom:7 }}>
                          <span style={{ display:"flex", alignItems:"center", gap:3 }}><MapPin size={12} color="#6b7280" strokeWidth={2} />{profileData.location}</span>
                          <span style={{ color:"#d1d5db" }}>|</span>
                          <span style={{ display:"flex", alignItems:"center", gap:3 }}><Globe size={12} color="#6b7280" strokeWidth={2} />{profileData.serviceMode}</span>
                          <span style={{ color:"#d1d5db" }}>|</span>
                          <span style={{ display:"flex", alignItems:"center", gap:3 }}><Tag size={12} color="#6b7280" strokeWidth={2} />{profileData.category}</span>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                          <Stars rating={profileData.rating} />
                          <span style={{ fontSize:13, color:"#374151", fontWeight:500 }}>
                            {profileData.rating > 0 ? profileData.rating.toFixed(1) : "No rating"} ({profileData.reviewCount} review{profileData.reviewCount !== 1 ? "s" : ""})
                          </span>
                          <span style={{ fontSize:12, color:"#6b7280" }}>
                            • {profileData.totalBookings > 0 ? `${profileData.totalBookings} booking${profileData.totalBookings !== 1 ? "s" : ""}` : "New provider"}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* CTA buttons — right aligned */}
                  <div style={{ display:"flex", gap:10, flexShrink:0, alignSelf:"center" }}>
                    {isOwner && !isEditMode && (
                      <button onClick={() => setIsEditMode(true)}
                        style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 16px", border:"1.5px solid #16a34a", borderRadius:8, background:"#fff", fontSize:13, fontWeight:600, color:"#16a34a", cursor:"pointer" }}>
                        <Pencil size={13} strokeWidth={2.5} /> Edit Profile
                      </button>
                    )}
                    {isEditMode ? (
                      <>
                        <button onClick={handleCancel}
                          style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 16px", border:"1.5px solid #d1d5db", borderRadius:8, background:"#fff", fontSize:13, fontWeight:600, color:"#374151", cursor:"pointer" }}>
                          <X size={13} strokeWidth={2.5} /> Cancel
                        </button>
                        <button onClick={handleSave} disabled={saving}
                          style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 16px", border:"none", borderRadius:8, background: saving ? "#86efac" : "#16a34a", fontSize:13, fontWeight:600, color:"#fff", cursor: saving ? "not-allowed" : "pointer" }}>
                          <Save size={13} strokeWidth={2.5} /> {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </>
) : (
  <>
    <button
      style={{
        display:"flex", alignItems:"center", gap:6,
        padding:"9px 18px",
        border:"1.5px solid #d1d5db",
        borderRadius:8,
        background:"#fff",
        fontSize:13,
        fontWeight:600,
        color:"#374151",
        cursor:"pointer"
      }}
    >
      <MessageSquare size={14} /> Message
    </button>

    <button
      style={{
        display:"flex", alignItems:"center", gap:6,
        padding:"9px 18px",
        border:"none",
        borderRadius:8,
        background:"#16a34a",
        fontSize:13,
        fontWeight:600,
        color:"#fff",
        cursor:"pointer"
      }}
      onClick={() =>
        setBookingService(
          services[0] || { id: "general", title: "General Booking" }
        )
      }
    >
      <CalendarDays size={14} /> Book Now
    </button>
  </>
)
}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display:"flex", borderTop:"1px solid #f1f5f9", marginTop:14, padding:"0 24px" }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ position:"relative", padding:"11px 16px", fontSize:13, fontWeight: tab===t ? 700 : 500, color: tab===t ? "#16a34a" : "#6b7280", background:"none", border:"none", cursor:"pointer", whiteSpace:"nowrap" }}>
                  {t}
                  {tab===t && <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:"#16a34a", borderRadius:2 }} />}
                </button>
              ))}
            </div>
          </div>

          {/* ── Services Section ── */}
          {(tab === "Overview" || tab === "Services") && (
          <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:"18px 24px", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
              <span style={{ fontSize:14, fontWeight:700, color:"#111827" }}>Services Offered</span>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                {isOwner && (
                  <button onClick={() => setShowAddService(true)}
                    style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 12px", background:"#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>
                    <Plus size={13} strokeWidth={2.5} /> Add Service
                  </button>
                )}
              </div>
            </div>
            {services.length === 0 ? (
              <EmptyState icon={Briefcase} title="No services listed yet"
                msg="Add your services to let customers know what you offer."
                cta="Add Your First Service" onCta={() => setShowAddService(true)} isOwner={isOwner} />
            ) : (
              <div>
                {services.map(s => (
                  <div key={s.id}>
                    <ServiceCard service={s} isOwner={isOwner}
                      onDelete={(id) => setServices(prev => prev.filter(x => x.id !== id))}
                      onEdit={(svc) => setEditingService(svc)} />
                    {!isOwner && (
                      <button onClick={() => setBookingService(s)}
                        style={{ marginTop:6, marginBottom:4, padding:"6px 14px", background:"#16a34a", color:"#fff", border:"none", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer" }}>
                        Book Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          )}

          {/* ── Posts Section ── */}
          {(tab === "Overview" || tab === "Posts") && (
          <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:"18px 24px", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
              <span style={{ fontSize:14, fontWeight:700, color:"#111827" }}>Posts & Updates</span>
              {isOwner && (
                <button onClick={() => setShowCreatePost(true)}
                  style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 12px", background:"#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>
                  <Plus size={13} strokeWidth={2.5} /> Create Post
                </button>
              )}
            </div>

            {/* Success banner */}
            {postSuccess && (
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"10px 14px", marginBottom:12 }}>
                <span style={{ fontSize:13, color:"#15803d", fontWeight:600 }}>✓ Post published successfully!</span>
                <button onClick={() => setPostSuccess(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"#6b7280" }}><X size={14} /></button>
              </div>
            )}

            {posts.length === 0 ? (
              <EmptyState icon={ImagePlus} title="No posts yet"
                msg="Share updates, offers, or announcements with your customers."
                cta="Create Your First Post" onCta={() => setShowCreatePost(true)} isOwner={isOwner} />
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                {posts.map(post => (
                  <PostCard key={post.id} post={post} isOwner={isOwner}
                    avatar={profileData.avatar} name={profileData.name}
                    onDelete={async (id) => {
                      try {
                        await api.delete(`/posts/${id}`);
                        setPosts(prev => prev.filter(p => p.id !== id));
                      } catch (err) { console.error(err); }
                    }}
                    onEdit={(post) => setEditingPost(post)}
                  />
                ))}
              </div>
            )}
          </div>
          )}

{/* Booking modal */}
{bookingService && (
  <BookNowModal
    service={bookingService}
    providerId={profileData.id}
    onClose={() => setBookingService(null)}
  />
)}

{/* About Section */}
{tab === "About" && (
  <div
    style={{
      background:"#fff",
      borderRadius:16,
      border:"1px solid #e5e7eb",
      padding:"18px 24px",
      boxShadow:"0 1px 3px rgba(0,0,0,0.04)"
    }}
  >
    <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 14px" }}>
      About {profileData.name}
    </p>

    <p style={{ fontSize:13, color:"#4b5563", lineHeight:1.7 }}>
      {profileData.description || profileData.bio || "No description added yet."}
    </p>
  </div>
)}

          {showCreatePost && (
            <CreatePostModal
              onClose={() => setShowCreatePost(false)}
              onSave={(newPost) => {
                setPosts(prev => [newPost, ...prev]);
                setPostSuccess(true);
                setTimeout(() => setPostSuccess(false), 4000);
              }}
            />
          )}
          {editingPost && (
            <CreatePostModal
              initial={editingPost}
              onClose={() => setEditingPost(null)}
              onSave={(updated) => setPosts(prev => prev.map(p => p.id === updated.id ? updated : p))}
            />
          )}

          {/* ── Reviews Section ── */}
          {(tab === "Overview" || tab === "Reviews") && (
          <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:"18px 24px", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:2 }}>
              <span style={{ fontSize:14, fontWeight:700, color:"#111827" }}>Reviews</span>
            </div>
            <EmptyState icon={Star} title="No reviews yet"
              msg="Reviews will appear here after you complete bookings." isOwner={isOwner} />
          </div>
          )}

          {/* Modals */}
          {showAddService && (
            <AddServiceModal
              onClose={() => setShowAddService(false)}
              onSave={(svc) => setServices(prev => [...prev, svc])}
            />
          )}
          {editingService && (
            <AddServiceModal
              initial={editingService}
              onClose={() => setEditingService(null)}
              onSave={(updated) => setServices(prev => prev.map(s => s.id === updated.id ? updated : s))}
            />
          )}
        </div>

        {/* ── RIGHT SIDEBAR — 260px fixed ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:14, position:"sticky", top:64 }}>

          {/* About */}
          <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:"16px 18px", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:"0 0 14px" }}>About</p>
            {[
              { Icon:MapPin,       label:"Location",     val:profileData.location },
              { Icon:Globe,        label:"Service Mode", val:profileData.serviceMode },
              { Icon:Tag,          label:"Category",     val:profileData.category },
              { Icon:CalendarDays, label:"Member Since", val:profileData.memberSince },
            ].map(({ Icon, label, val }) => (
              <div key={label} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:12 }}>
                <Icon size={14} color="#9ca3af" strokeWidth={1.8} style={{ marginTop:3, flexShrink:0 }} />
                <div>
                  <p style={{ fontSize:10, color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", margin:0 }}>{label}</p>
                  <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:"2px 0 0" }}>{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:"16px 18px", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:"0 0 8px" }}>About {profileData.name.split(" ")[0]}</p>
            <p style={{ fontSize:13, color:"#4b5563", lineHeight:1.65, margin:0 }}>{profileData.bio}</p>
          </div>

          {/* Trusted */}
          <div style={{ background:"#f0fdf4", borderRadius:16, border:"1px solid #bbf7d0", padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:12, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Shield size={20} color="#16a34a" strokeWidth={1.8} />
              </div>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:"#15803d", margin:0 }}>Trusted & Verified</p>
                <p style={{ fontSize:12, color:"#4b5563", margin:"4px 0 0", lineHeight:1.5 }}>This provider is verified and trusted by LocalBuddy.</p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:"16px 18px", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:"0 0 14px" }}>Highlights</p>
            {[
              { bg:"#f0fdf4", icon:<Users size={16} color="#16a34a" strokeWidth={1.8} />, val:`${profileData.totalBookings}`, label:"Completed Bookings" },
              { bg:"#fffbeb", icon:<Star  size={16} color="#f59e0b" strokeWidth={1.8} />, val: profileData.rating > 0 ? profileData.rating.toFixed(1) : "—", label:"Average Rating" },
              { bg:"#eff6ff", icon:<MessageSquare size={16} color="#3b82f6" strokeWidth={1.8} />, val:`${profileData.reviewCount}`, label:"Total Reviews" },
            ].map(({ bg, icon, val, label }) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <div style={{ width:34, height:34, borderRadius:9, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>{val}</p>
                  <p style={{ fontSize:11, color:"#6b7280", margin:"1px 0 0" }}>{label}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
