import { Heart, Star, X } from "lucide-react";

// film shape: { id, title, overview, poster_url, backdrop_url, vote_average, genres, release_date, similarity_score? }
// isFavorited — bool
// onToggleFavorite(id)
// onClose

export default function MovieOverlay({
  film,
  onClose,
  isFavorited,
  onToggleFavorite,
}) {
  if (!film) return null;

  const year = film.release_date
    ? new Date(film.release_date).getFullYear()
    : "";
  const rating = Number(film.vote_average).toFixed(1);
  const genres = Array.isArray(film.genres) ? film.genres.join(" • ") : "";
  const backdropSrc = film.backdrop_url || film.poster_url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden w-full max-w-sm md:max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute z-10 flex items-center justify-center w-8 h-8 transition-colors border rounded-full top-3 right-3 bg-black/50 border-white/10 text-white/60 hover:text-white"
        >
          <X size={15} />
        </button>

        {/* Backdrop */}
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <img
            src={backdropSrc}
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

          <div className="flex items-center flex-wrap gap-3 mb-3">
            <span className="flex items-center gap-1 text-sm font-medium text-yellow-400 font-body">
              <Star size={14} fill="currentColor" strokeWidth={0} />
              {rating}
            </span>
            {year && (
              <span className="text-xs text-white/30 font-body">{year}</span>
            )}
            {genres && (
              <span className="text-xs text-white/30 font-body">{genres}</span>
            )}
            {film.similarity_score != null && (
              <span className="text-xs font-semibold text-secondary font-body">
                {Math.round(film.similarity_score * 100)}% Match
              </span>
            )}
          </div>

          <p className="mb-5 text-sm leading-6 text-white/50 font-body line-clamp-4">
            {film.overview}
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

            {/* Heart */}
            <button
              onClick={() => onToggleFavorite?.(film.id)}
              aria-label={isFavorited ? "Unlike" : "Like"}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200
                ${
                  isFavorited
                    ? "border-secondary bg-secondary/20 text-secondary"
                    : "border-white/20 bg-white/5 text-white/50 hover:border-secondary hover:text-secondary"
                }`}
            >
              <Heart
                size={16}
                strokeWidth={2}
                fill={isFavorited ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
