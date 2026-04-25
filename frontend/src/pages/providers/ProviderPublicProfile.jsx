import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, MapPin, Globe, Phone, IndianRupee, Star, AlertCircle, Clock } from "lucide-react";
import useProviderDetail from "../../hooks/useProviderDetail";
import ProfileHeader from "../../components/common/ProfileHeader";
import InfoSection, { InfoRow } from "../../components/common/InfoSection";
import { ProfileSkeleton } from "../../components/common/SkeletonLoader";

const ReviewCard = ({ review }) => (
  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-xs">
          {(review.user_name || "U").charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-semibold text-slate-700">{review.user_name || "Anonymous"}</span>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < review.rating ? "text-amber-400" : "text-slate-200"}
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </div>
    </div>
    {review.comment && (
      <p className="text-xs text-slate-500 leading-relaxed">{review.comment}</p>
    )}
    {review.created_at && (
      <p className="text-[10px] text-slate-400 mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
    )}
  </div>
);

const ProviderPublicProfile = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const { provider, reviews, loading, error } = useProviderDetail(id);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Topbar */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2.5} /> Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-sm">
              <Sparkles size={13} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-slate-800 text-sm tracking-tight">LocalBuddy</span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-3">
            <AlertCircle size={18} className="text-red-500 flex-shrink-0" strokeWidth={2} />
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Skeleton */}
        {loading && <ProfileSkeleton />}

        {/* Content */}
        {!loading && !error && provider && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Left — main content */}
            <div className="lg:col-span-2 space-y-5">
              <ProfileHeader provider={provider} reviewCount={reviews.length} />

              {/* Description */}
              {provider.description && (
                <InfoSection title="About">
                  <p className="text-sm text-slate-600 leading-relaxed">{provider.description}</p>
                </InfoSection>
              )}

              {/* Services offered */}
              {provider.services?.length > 0 && (
                <InfoSection title="Services Offered">
                  <div className="space-y-3">
                    {provider.services.map((s) => (
                      <div key={s.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{s.name}</p>
                          {s.description && <p className="text-xs text-slate-400 mt-0.5">{s.description}</p>}
                          {s.duration && (
                            <span className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                              <Clock size={10} strokeWidth={2} /> {s.duration}
                            </span>
                          )}
                        </div>
                        {s.price && (
                          <div className="flex items-center gap-0.5 bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1 flex-shrink-0 ml-3">
                            <IndianRupee size={11} className="text-emerald-600" strokeWidth={2.5} />
                            <span className="text-sm font-extrabold text-emerald-600">{s.price}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </InfoSection>
              )}

              {/* Reviews */}
              <InfoSection title={`Reviews${reviews.length ? ` (${reviews.length})` : ""}`}>
                {reviews.length === 0 ? (
                  <p className="text-sm text-slate-400 py-4 text-center">No reviews yet.</p>
                ) : (
                  <div className="space-y-3">
                    {reviews.map((r, i) => <ReviewCard key={r.id ?? i} review={r} />)}
                  </div>
                )}
              </InfoSection>
            </div>

            {/* Right sidebar */}
            <div className="space-y-5 lg:sticky lg:top-[72px] self-start">
              <InfoSection title="Details">
                <InfoRow label="Category"     value={provider.category}    icon={null} />
                <InfoRow label="Service Mode" value={provider.service_mode || provider.serviceMode} icon={Globe} />
                <InfoRow label="City"         value={provider.city}        icon={MapPin} />
                <InfoRow label="Locality"     value={provider.locality}    icon={MapPin} />
                {provider.price_range && (
                  <InfoRow label="Price Range" value={provider.price_range} icon={IndianRupee} />
                )}
                {provider.experience && (
                  <InfoRow label="Experience" value={provider.experience} icon={null} />
                )}
                {provider.phone_number && (
                  <InfoRow label="Contact" value={provider.phone_number} icon={Phone} />
                )}
              </InfoSection>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderPublicProfile;
