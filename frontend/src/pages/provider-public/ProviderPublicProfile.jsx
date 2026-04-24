import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

import { useProfileOwner } from "./hooks/useProfileOwner";
import { useProfileData  } from "./hooks/useProfileData";

import HeroSection     from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import PostsSection    from "./components/PostsSection";
import ReviewsSection  from "./components/ReviewsSection";
import InfoSidebar     from "./components/InfoSidebar";

const ProviderPublicProfile = () => {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { isOwner } = useProfileOwner(id);

  const { profile, services, posts, saveProfile, addService, deleteService, addPost } = useProfileData();

  const servicesSectionRef = useRef(null);
  const postsSectionRef    = useRef(null);

  const scrollAndOpen = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => ref.current?.querySelector("[data-trigger]")?.click(), 400);
  };

  // TODO: GET /provider/:id/reviews
  const reviews           = [];
  const avgRating         = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  const completedBookings = 0;

  return (
    <div className="min-h-screen provider-dash relative overflow-x-hidden"
      style={{ background: "linear-gradient(160deg, #f0faf4 0%, #e8f5e9 40%, #f1fdf4 70%, #eafaf1 100%)" }}
    >
      {/* Decorative background — fixed, pointer-events-none */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #bbf7d0 0%, transparent 70%)" }} />
        <div className="absolute top-20 -right-40 w-[420px] h-[420px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #6ee7b7 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #bbf7d0 0%, transparent 70%)" }} />
        {/* City skyline */}
        <svg className="absolute bottom-0 left-0 w-full opacity-[0.06]" viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#16a34a" d="M0,220 L0,140 L40,140 L40,100 L60,100 L60,80 L80,80 L80,60 L100,60 L100,80 L120,80 L120,40 L130,40 L130,20 L140,20 L140,40 L150,40 L150,80 L170,80 L170,100 L190,100 L190,60 L200,60 L200,40 L210,40 L210,60 L230,60 L230,100 L250,100 L250,80 L270,80 L270,50 L280,50 L280,30 L290,30 L290,50 L300,50 L300,80 L320,80 L320,110 L340,110 L340,70 L360,70 L360,90 L380,90 L380,60 L390,60 L390,40 L400,40 L400,60 L420,60 L420,90 L440,90 L440,110 L460,110 L460,80 L480,80 L480,100 L500,100 L500,70 L520,70 L520,50 L530,50 L530,30 L540,30 L540,50 L550,50 L550,70 L570,70 L570,100 L590,100 L590,80 L610,80 L610,60 L630,60 L630,40 L640,40 L640,20 L650,20 L650,40 L660,40 L660,60 L680,60 L680,80 L700,80 L700,100 L720,100 L720,70 L740,70 L740,90 L760,90 L760,110 L780,110 L780,80 L800,80 L800,60 L820,60 L820,40 L830,40 L830,20 L840,20 L840,40 L850,40 L850,60 L870,60 L870,80 L890,80 L890,100 L910,100 L910,70 L930,70 L930,50 L940,50 L940,70 L960,70 L960,90 L980,90 L980,110 L1000,110 L1000,80 L1020,80 L1020,60 L1040,60 L1040,40 L1050,40 L1050,20 L1060,20 L1060,40 L1070,40 L1070,60 L1090,60 L1090,80 L1110,80 L1110,100 L1130,100 L1130,70 L1150,70 L1150,50 L1160,50 L1160,70 L1180,70 L1180,90 L1200,90 L1200,110 L1220,110 L1220,80 L1240,80 L1240,60 L1260,60 L1260,40 L1270,40 L1270,20 L1280,20 L1280,40 L1290,40 L1290,60 L1310,60 L1310,80 L1330,80 L1330,100 L1360,100 L1360,120 L1400,120 L1400,140 L1440,140 L1440,220 Z" />
        </svg>
        {/* Bottom-left leaves */}
        <svg className="absolute bottom-0 left-0 w-48 opacity-25" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="30" cy="180" rx="60" ry="25" fill="#4ade80" transform="rotate(-40 30 180)" />
          <ellipse cx="10" cy="170" rx="50" ry="20" fill="#22c55e" transform="rotate(-55 10 170)" />
          <ellipse cx="60" cy="190" rx="55" ry="18" fill="#86efac" transform="rotate(-25 60 190)" />
        </svg>
        {/* Bottom-right leaves */}
        <svg className="absolute bottom-0 right-0 w-48 opacity-25" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="170" cy="180" rx="60" ry="25" fill="#4ade80" transform="rotate(40 170 180)" />
          <ellipse cx="190" cy="170" rx="50" ry="20" fill="#22c55e" transform="rotate(55 190 170)" />
          <ellipse cx="140" cy="190" rx="55" ry="18" fill="#86efac" transform="rotate(25 140 190)" />
        </svg>
      </div>

      {/* Topbar */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-white/60 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-8 h-14 flex items-center justify-between">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} strokeWidth={2.5} /> Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-sm">
              <Sparkles size={14} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-slate-800 text-base tracking-tight">LocalBuddy</span>
          </div>
          {isOwner ? (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              ✏️ Your Profile
            </span>
          ) : (
            <div className="w-28" />
          )}
        </div>
      </div>

      {/* Page body — 2-col layout */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-6 pb-12">
        <div className="flex gap-6 items-start">

          {/* Left column */}
          <div className="flex-1 min-w-0 space-y-4">
            <HeroSection
              profile={profile}
              isOwner={isOwner}
              avgRating={avgRating}
              reviewCount={reviews.length}
              completedBookings={completedBookings}
              onSave={saveProfile}
              onAddService={() => scrollAndOpen(servicesSectionRef)}
              onAddPost={() => scrollAndOpen(postsSectionRef)}
            />
            <div ref={servicesSectionRef}>
              <ServicesSection services={services} isOwner={isOwner} onAdd={addService} onDelete={deleteService} />
            </div>
            <div ref={postsSectionRef}>
              <PostsSection posts={posts} isOwner={isOwner} onAdd={addPost} />
            </div>
            <ReviewsSection reviews={reviews} />
          </div>

          {/* Right sidebar — sticky */}
          <div className="w-[360px] flex-shrink-0 space-y-4 sticky top-[72px]">
            <InfoSidebar profile={profile} isOwner={isOwner} onSave={saveProfile} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProviderPublicProfile;
