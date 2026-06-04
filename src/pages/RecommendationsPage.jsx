import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import FilmCard from "../components/FilmCard";
import MovieOverlay from "../components/MovieOverlay";
import { useFavorites } from "../hooks/useFavorites";

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const BACKDROP_BASE = import.meta.env.VITE_TMDB_BACKDROP_BASE_URL;

// Normalise the AI response movie shape → common film shape
function normaliseMovie(m) {
  if (!m.tmdb) return null;
  return {
    id: m.tmdb.id,
    title: m.tmdb.title,
    overview: m.tmdb.overview,
    poster_url: `${IMAGE_BASE}${m.tmdb.poster_path}`,
    backdrop_url: `${BACKDROP_BASE}${m.tmdb.backdrop_path}`,
    release_date: m.tmdb.release_date,
    vote_average: m.tmdb.vote_average,
    genres: m.tmdb.genres,
    similarity_score: m.similarity_score,
  };
}

export default function RecommendationsPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [activeFilm, setActiveFilm] = useState(null);
  const carouselRef = useRef(null);

  const rawMovies = state?.movies || [];
  const movies = rawMovies.map(normaliseMovie).filter(Boolean);

  // If no movies in state redirect back to pick-favorites
  if (!movies.length) {
    navigate("/pick-favorites");
    return null;
  }

  const hero = movies[0];
  const carousel = movies.slice(1);

  const scrollCarousel = (dir) =>
    carouselRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });

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

      {/* ── Hero ── */}
      <section className="relative w-full h-screen">
        <img
          src={hero.backdrop_url}
          alt={hero.title}
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

        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-16 md:px-16 lg:px-24 md:pb-20">
          <div className="max-w-xl">
            <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase font-body text-secondary">
              {Array.isArray(hero.genres) ? hero.genres.join(" • ") : ""}
            </span>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white font-heading md:text-5xl lg:text-6xl">
              {hero.title}
            </h1>

            <p className="max-w-md mb-4 text-sm leading-7 font-body text-white/60 md:text-base line-clamp-3">
              {hero.overview}
            </p>

            <div className="flex items-center flex-wrap gap-4 mb-6">
              <span className="flex items-center gap-1 text-sm font-medium text-yellow-400">
                ★ {Number(hero.vote_average).toFixed(1)}
              </span>
              <span className="text-sm text-white/40 font-body">
                {hero.release_date
                  ? new Date(hero.release_date).getFullYear()
                  : ""}
              </span>
              {/* {hero.similarity_score != null && (
                <span className="text-sm font-semibold text-secondary font-body">
                  {Math.round(hero.similarity_score * 100)}% Match
                </span>
              )} */}
            </div>

            <div className="flex items-center flex-wrap gap-3">
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
              {/* Heart for hero film */}
              <button
                onClick={() => toggleFavorite(hero.id)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200
                  ${
                    isFavorited(hero.id)
                      ? "border-secondary bg-secondary/20 text-secondary"
                      : "border-white/20 bg-white/5 text-white/50 hover:border-secondary hover:text-secondary"
                  }`}
                aria-label={isFavorited(hero.id) ? "Unlike" : "Like"}
              >
                <span style={{ fontSize: 16 }}>
                  {isFavorited(hero.id) ? "♥" : "♡"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Carousel ── */}
      {carousel.length > 0 && (
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
            {carousel.map((film) => (
              <FilmCard
                key={film.id}
                film={film}
                isFavorited={isFavorited(film.id)}
                onToggleFavorite={toggleFavorite}
                onClick={setActiveFilm}
                // matchScore={film.similarity_score}
              />
            ))}
          </div>
        </section>
      )}

      <div className="h-12 bg-[#0f0f0f]" />

      <MovieOverlay
        film={activeFilm}
        onClose={() => setActiveFilm(null)}
        isFavorited={activeFilm ? isFavorited(activeFilm.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
