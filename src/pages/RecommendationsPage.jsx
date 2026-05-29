import { useState, useRef } from "react";
import {
  Bookmark,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const BACKDROP_BASE = import.meta.env.VITE_TMDB_BACKDROP_BASE_URL;

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 text-sm font-medium text-yellow-400 font-body">
      <Star size={14} fill="currentColor" strokeWidth={0} />
      {rating}
    </span>
  );
}

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

function MovieOverlay({ film, onClose }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!film) return null;

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
        <button
          onClick={onClose}
          className="absolute z-10 flex items-center justify-center w-8 h-8 transition-colors border rounded-full top-3 right-3 bg-black/50 border-white/10 text-white/60 hover:text-white"
        >
          <X size={15} />
        </button>

        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <img
            src={`${BACKDROP_BASE}${film.tmdb.backdrop_path}`}
            alt={film.tmdb.title}
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
            {film.tmdb.title}
          </h2>

          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <StarRating rating={film.tmdb.vote_average.toFixed(1)} />

            <span className="text-xs text-white/30 font-body">
              {new Date(film.tmdb.release_date).getFullYear()}
            </span>

            <span className="text-xs text-white/30 font-body">
              {film.tmdb.genres.join(" • ")}
            </span>
          </div>

          <p className="mb-5 text-sm leading-6 text-white/50 font-body">
            {film.tmdb.overview}
          </p>

          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-semibold text-secondary">
              {Math.round(film.similarity_score * 100)}% Match
            </span>
          </div>

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

function CarouselCard({ film, onClick }) {
  return (
    <div
      onClick={() => onClick(film)}
      className="relative w-32 overflow-hidden cursor-pointer shrink-0 md:w-40 group rounded-xl"
      style={{ aspectRatio: "2/3" }}
    >
      <img
        src={`${IMAGE_BASE}${film.tmdb.poster_path}`}
        alt={film.tmdb.title}
        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75 group-hover:scale-[0.97]"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)",
        }}
      />

      <div className="absolute bottom-2 left-2 right-2">
        <p className="text-xs font-semibold leading-4 text-white font-heading">
          {film.tmdb.title}
        </p>

        <p className="mt-1 text-[10px] text-secondary font-semibold">
          {Math.round(film.similarity_score * 100)}% Match
        </p>
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  const [heroLiked, setHeroLiked] = useState(false);
  const [heroSaved, setHeroSaved] = useState(false);
  const [activeFilm, setActiveFilm] = useState(null);

  const carouselRef = useRef(null);

  const navigate = useNavigate();
  const { state } = useLocation();

  const movies = state?.movies || [];

  if (!movies.length) {
    navigate("/pick-favorites");
    return null;
  }

  const hero = movies[0];
  const carousel = movies.slice(1);

  const scrollCarousel = (dir) => {
    carouselRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      {/* Dashboard button */}
      <div className="fixed top-15 left-0 right-0 z-30 flex justify-end px-6 md:px-16 lg:px-24 pt-4 pointer-events-none">
        <button
          onClick={() => navigate("/")}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full
            font-heading font-semibold text-white text-sm tracking-wide
            border border-white/20 bg-black/60 backdrop-blur-sm
            transition-all duration-200 hover:bg-white/10 hover:border-white/40"
        >
          <LayoutDashboard size={15} />
          Dashboard
        </button>
      </div>

      {/* Hero */}
      <section className="relative w-full h-screen">
        <img
          src={`${BACKDROP_BASE}${hero.tmdb.backdrop_path}`}
          alt={hero.tmdb.title}
          className="absolute inset-0 object-cover w-full h-full"
        />

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

        <div
          className="relative z-10 flex flex-col justify-end h-full px-6 pb-16 md:px-16 lg:px-24 md:pb-20"
          style={{ minHeight: "90vh" }}
        >
          <div className="max-w-xl">
            <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase font-body text-secondary">
              {hero.tmdb.genres.join(" • ")}
            </span>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white font-heading md:text-5xl lg:text-6xl">
              {hero.tmdb.title}
            </h1>

            <p className="max-w-md mb-4 text-sm leading-7 font-body text-white/60 md:text-base">
              {hero.tmdb.overview}
            </p>

            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <StarRating rating={hero.tmdb.vote_average.toFixed(1)} />

              <span className="text-sm text-white/40 font-body">
                {new Date(hero.tmdb.release_date).getFullYear()}
              </span>

              <span className="text-sm font-semibold text-secondary">
                {Math.round(hero.similarity_score * 100)}% Match
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
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

      {/* Carousel */}
      <section className="relative bg-[#0f0f0f] px-6 md:px-16 lg:px-24 py-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white font-heading md:text-2xl">
            More For You
          </h2>

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

        <div
          ref={carouselRef}
          className="flex gap-3 pb-2 overflow-x-auto md:gap-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {carousel.map((film, index) => (
            <CarouselCard
              key={`${film.tmdb.id}-${index}`}
              film={film}
              onClick={setActiveFilm}
            />
          ))}
        </div>
      </section>

      <div className="h-12 bg-[#0f0f0f]" />

      <MovieOverlay film={activeFilm} onClose={() => setActiveFilm(null)} />
    </div>
  );
}
