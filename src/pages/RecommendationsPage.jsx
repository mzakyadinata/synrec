import { useState, useRef } from "react";
import {
  Bookmark,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import recommendations from "../data/recommendations";

const hero = recommendations[0];
const carousel = recommendations.slice(1);

// ── Star rating display ──
function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 text-sm font-medium text-yellow-400 font-body">
      <Star size={14} fill="currentColor" strokeWidth={0} />
      {rating}
    </span>
  );
}

// ── Small icon action button ──
function ActionBtn({ icon: Icon, active, onClick, label }) {
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
      <Icon size={16} strokeWidth={2} />
    </button>
  );
}

// ── Movie overlay card ──
function MovieOverlay({ film, onClose }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!film) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      {/* Card — stop propagation so clicking card doesn't close */}
      <div
        className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden
          w-full max-w-sm md:max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute z-10 flex items-center justify-center w-8 h-8 transition-colors border rounded-full top-3 right-3 bg-black/50 border-white/10 text-white/60 hover:text-white"
        >
          <X size={15} />
        </button>

        {/* Poster */}
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <img
            src={film.poster}
            alt={film.title}
            className="object-cover w-full h-full"
          />
          {/* Bottom gradient on poster */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #1a1a1a 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Details */}
        <div className="relative z-10 px-5 pb-5 -mt-6">
          <h2 className="mb-1 text-xl font-bold text-white font-heading">
            {film.title}
          </h2>

          {/* Meta row */}
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

          {/* Actions */}
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
            <ActionBtn
              icon={Heart}
              active={liked}
              onClick={() => setLiked((p) => !p)}
              label="Like"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Carousel film card ──
function CarouselCard({ film, onClick }) {
  return (
    <div
      onClick={() => onClick(film)}
      className="relative w-32 overflow-hidden cursor-pointer shrink-0 md:w-40 group rounded-xl"
      style={{ aspectRatio: "2/3" }}
    >
      <img
        src={film.poster}
        alt={film.title}
        className="w-full h-full object-cover transition-all duration-300
          group-hover:brightness-75 group-hover:scale-[0.97]"
      />
      {/* Bottom title fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)",
        }}
      />
      <p className="absolute text-xs font-semibold leading-4 text-white bottom-2 left-2 right-2 font-heading">
        {film.title}
      </p>
    </div>
  );
}

// ── Main page ──
export default function RecommendationsPage() {
  const [heroLiked, setHeroLiked] = useState(false);
  const [heroSaved, setHeroSaved] = useState(false);
  const [activeFilm, setActiveFilm] = useState(null);
  const carouselRef = useRef(null);

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      {/* ── Hero section ── */}
      <section className="relative w-full h-screen">
        {/* Hero image */}
        <img
          src={hero.poster}
          alt={hero.title}
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.5) 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0f0f0f 0%, rgba(15,15,15,0.4) 40%, transparent 70%)",
          }}
        />

        {/* Hero content */}
        <div
          className="relative z-10 flex flex-col justify-end h-full px-6 pb-16 md:px-16 lg:px-24 md:pb-20"
          style={{ minHeight: "90vh" }}
        >
          <div className="max-w-lg">
            {/* Genre badge */}
            <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase font-body text-secondary">
              {hero.genre}
            </span>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white font-heading md:text-5xl lg:text-6xl">
              {hero.title}
            </h1>

            <p className="max-w-md mb-4 text-sm leading-7 font-body text-white/60 md:text-base">
              {hero.synopsis}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={hero.rating} />
              <span className="text-sm text-white/40 font-body">
                {hero.year}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                className="px-8 py-3 rounded-full font-heading font-bold text-white text-sm
                  tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 40%, #DB1F2ECC 100%)",
                }}
              >
                Watch Now
              </button>
              <button className="px-8 py-3 text-sm font-semibold tracking-wide transition-all duration-200 border rounded-full font-heading text-white/70 border-white/20 bg-white/5 hover:bg-white/10 hover:text-white">
                Trailer
              </button>
              <ActionBtn
                icon={Bookmark}
                active={heroSaved}
                onClick={() => setHeroSaved((p) => !p)}
                label="Save"
              />
              <ActionBtn
                icon={Heart}
                active={heroLiked}
                onClick={() => setHeroLiked((p) => !p)}
                label="Like"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Carousel section ── */}
      <section className="relative bg-[#0f0f0f] px-6 md:px-16 lg:px-24 py-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white font-heading md:text-2xl">
            More For You
          </h2>
          {/* Arrow buttons — desktop */}
          <div className="items-center hidden gap-2 md:flex">
            <button
              onClick={() => scrollCarousel("left")}
              className="flex items-center justify-center transition-all duration-200 border rounded-full w-9 h-9 border-white/20 bg-white/5 text-white/60 hover:text-white hover:border-white/40"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="flex items-center justify-center transition-all duration-200 border rounded-full w-9 h-9 border-white/20 bg-white/5 text-white/60 hover:text-white hover:border-white/40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable carousel */}
        <div
          ref={carouselRef}
          className="flex gap-3 pb-2 overflow-x-auto md:gap-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {carousel.map((film) => (
            <CarouselCard key={film.id} film={film} onClick={setActiveFilm} />
          ))}
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-12 bg-[#0f0f0f]" />

      {/* ── Movie overlay ── */}
      <MovieOverlay film={activeFilm} onClose={() => setActiveFilm(null)} />
    </div>
  );
}
