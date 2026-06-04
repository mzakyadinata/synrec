import { Heart, Star } from "lucide-react";

// film shape (popular/recommendations both map to this):
// { id, title, poster_url, vote_average, year? }
// isFavorited — bool
// onToggleFavorite(id) — called on heart click
// onClick(film) — called on card click (opens overlay)
// rank — optional number badge (top 3 = red)
// matchScore — optional 0-1 similarity_score

export default function FilmCard({
  film,
  isFavorited,
  onToggleFavorite,
  onClick,
  rank,
  matchScore,
  cardWidth = "w-35 md:w-50",
}) {
  const year =
    film.year ||
    (film.release_date ? new Date(film.release_date).getFullYear() : "");

  return (
    <div
      className={`relative shrink-0 ${cardWidth} cursor-pointer group rounded-xl overflow-hidden`}
      style={{ aspectRatio: "2/3" }}
    >
      {/* Poster */}
      <img
        src={film.poster_url}
        alt={film.title}
        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75 group-hover:scale-[0.97]"
        onClick={() => onClick?.(film)}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)",
        }}
      />

      {/* Rank badge — top-left */}
      {rank != null && (
        <div
          className="absolute top-2 left-2 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black font-heading text-white"
          style={{
            background:
              rank <= 3
                ? "linear-gradient(135deg, #DB1F2E, #FF3D3D)"
                : "rgba(0,0,0,0.6)",
            border: rank <= 3 ? "none" : "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {rank}
        </div>
      )}

      {/* Rating badge — top-right (when no heart visible) */}
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded-md px-1.5 py-0.5 group-hover:opacity-0 transition-opacity">
        <Star
          size={10}
          fill="#fbbf24"
          strokeWidth={0}
          className="text-yellow-400"
        />
        <span className="text-white text-[10px] font-body font-medium">
          {Number(film.vote_average).toFixed(1)}
        </span>
      </div>

      {/* Heart button — top-right, appears on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.(film.id);
        }}
        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center
          transition-all duration-200 opacity-0 group-hover:opacity-100
          border ${
            isFavorited
              ? "bg-secondary/20 border-secondary text-secondary"
              : "bg-black/50 border-white/30 text-white/70 hover:border-secondary hover:text-secondary"
          }`}
        aria-label={isFavorited ? "Unlike" : "Like"}
      >
        <Heart size={14} fill={isFavorited ? "currentColor" : "none"} />
      </button>

      {/* Match score badge */}
      {matchScore != null && (
        <div className="absolute top-2 left-2 bg-black/70 rounded-md px-1.5 py-0.5">
          <span className="text-[10px] font-semibold font-body text-secondary">
            {Math.round(matchScore * 100)}% Match
          </span>
        </div>
      )}

      {/* Title + year at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 p-2 pointer-events-none"
        onClick={() => onClick?.(film)}
        style={{ pointerEvents: "auto" }}
      >
        <p className="text-white font-heading font-semibold text-xs leading-4 truncate">
          {film.title}
        </p>
        {year && (
          <p className="text-white/40 font-body text-[10px] mt-0.5">{year}</p>
        )}
      </div>
    </div>
  );
}
