import { useState } from "react";
import { Bookmark, Heart, Star, X } from "lucide-react";

export function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 text-sm font-medium text-yellow-400 font-body">
      <Star size={14} fill="currentColor" strokeWidth={0} />
      {rating}
    </span>
  );
}

export function ActionBtn({
  icon: Icon,
  active,
  onClick,
  label,
  fillWhenActive = false,
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200
        ${
          active
            ? "border-secondary bg-secondary/20 text-secondary"
            : "border-white/20 bg-white/5 text-white/50 hover:border-white/50 hover:text-white"
        }`}
    >
      <Icon
        size={16}
        strokeWidth={2}
        fill={fillWhenActive && active ? "currentColor" : "none"}
      />
    </button>
  );
}

// onLikeChange(id, isLiked) — called when heart toggled
// initialLiked — starting state of the heart icon
export function MovieOverlay({
  film,
  onClose,
  onLikeChange,
  initialLiked = false,
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [saved, setSaved] = useState(false);

  if (!film) return null;

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    onLikeChange?.(film.id, next);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden
          w-full max-w-sm md:max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute z-10 flex items-center justify-center w-8 h-8 transition-colors border rounded-full top-3 right-3 bg-black/50 border-white/10 text-white/60 hover:text-white"
        >
          <X size={15} />
        </button>

        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <img
            src={film.poster}
            alt={film.title}
            className="object-cover w-full h-full"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #1a1a1a 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="relative z-10 px-5 pb-5 -mt-6">
          <h2 className="mb-1 text-xl font-bold text-white font-heading">
            {film.title}
          </h2>
          <div className="flex items-center gap-3 mb-3">
            <StarRating rating={film.rating} />
            <span className="text-xs text-white/30 font-body">{film.year}</span>
            <span className="text-xs text-white/30 font-body">
              {film.genre}
            </span>
          </div>
          <p className="mb-5 text-sm leading-6 text-white/50 font-body">
            {film.synopsis}
          </p>
          <div className="flex items-center gap-3">
            <button
              className="flex-1 py-2.5 rounded-full font-heading font-semibold text-white text-sm
                tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 40%, #DB1F2ECC 100%)",
              }}
            >
              Watch Now
            </button>
            <ActionBtn
              icon={Bookmark}
              active={saved}
              onClick={() => setSaved((p) => !p)}
              label="Save"
            />
            {/* Heart — red filled when liked, toggles like/unlike */}
            <ActionBtn
              icon={Heart}
              active={liked}
              onClick={handleLike}
              label={liked ? "Unlike" : "Like"}
              fillWhenActive
            />
          </div>
        </div>
      </div>
    </div>
  );
}
