import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FilmCard from "./FilmCard";

// films — array of film objects
// onCardClick(film) — opens overlay
// isFavorited(id) — bool
// onToggleFavorite(id) — toggles favorite
// showRank — show rank badges
// cardWidth — tailwind width classes passed to FilmCard
// emptyMessage — shown when films is empty

export default function FilmCarousel({
  films = [],
  onCardClick,
  isFavorited,
  onToggleFavorite,
  showRank = false,
  cardWidth,
  emptyMessage,
}) {
  const ref = useRef(null);

  const scroll = (dir) =>
    ref.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });

  if (!films.length && emptyMessage) {
    return (
      <div
        className="w-full rounded-2xl border border-white/10 px-6 py-8 text-center"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <p className="text-white/40 font-body text-sm leading-7">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Desktop arrow buttons */}
      <div className="absolute right-0 -top-10 hidden md:flex items-center gap-2">
        <button
          onClick={() => scroll("left")}
          className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Scrollable row */}
      <div
        ref={ref}
        className="flex gap-3 md:gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {films.map((film, i) => (
          <FilmCard
            key={film.id ?? i}
            film={film}
            rank={showRank ? i + 1 : undefined}
            isFavorited={isFavorited?.(film.id)}
            onToggleFavorite={onToggleFavorite}
            onClick={onCardClick}
            cardWidth={cardWidth}
          />
        ))}
      </div>
    </div>
  );
}
