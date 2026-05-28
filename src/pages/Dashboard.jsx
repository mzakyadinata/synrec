import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star as StarIcon,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuth";
import recommendations from "../data/recommendations";
import { StarRating, MovieOverlay } from "../components/MovieComponents";

const popularMovies = recommendations.map((film, i) => ({
  ...film,
  rank: i + 1,
}));
const lastRecommendations = [...recommendations].reverse();
const topRated = [...recommendations].sort((a, b) => b.rating - a.rating);

function FilmCarousel({ films, onCardClick, showRank = false }) {
  const ref = useRef(null);
  const scroll = (dir) =>
    ref.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });

  return (
    <div className="relative">
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

      <div
        ref={ref}
        className="flex gap-3 md:gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {films.map((film) => (
          <div
            key={film.id}
            onClick={() => onCardClick(film)}
            className="relative flex-shrink-0 w-32 md:w-40 cursor-pointer group rounded-xl overflow-hidden"
            style={{ aspectRatio: "2/3" }}
          >
            <img
              src={film.poster}
              alt={film.title}
              className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75 group-hover:scale-[0.97]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)",
              }}
            />

            {showRank && (
              <div
                className="absolute top-2 left-2 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black font-heading text-white"
                style={{
                  background:
                    film.rank <= 3
                      ? "linear-gradient(135deg, #DB1F2E, #FF3D3D)"
                      : "rgba(0,0,0,0.6)",
                  border:
                    film.rank <= 3
                      ? "none"
                      : "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {film.rank}
              </div>
            )}

            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded-md px-1.5 py-0.5">
              <StarIcon
                size={10}
                fill="#fbbf24"
                strokeWidth={0}
                className="text-yellow-400"
              />
              <span className="text-white text-[10px] font-body font-medium">
                {film.rating}
              </span>
            </div>

            <p className="absolute bottom-2 left-2 right-2 text-xs font-semibold leading-4 text-white font-heading">
              {film.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeFilm, setActiveFilm] = useState(null);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      <main className="pt-15">
        {/* ── Hero greeting banner ── */}
        <section
          className="relative px-6 md:px-16 lg:px-24 py-16 md:py-20 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a0505 0%, #0f0f0f 60%)",
          }}
        >
          <div
            className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(219,31,46,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-white/40 font-body text-sm mb-1">
                {greeting()}, {user?.fullname?.split(" ")[0] || user?.username}{" "}
              </p>
              <h1 className="font-heading font-bold text-white text-3xl md:text-4xl mb-3">
                Ready to discover
                <br className="hidden md:block" /> something new?
              </h1>
              <p className="text-white/40 font-body text-sm max-w-md">
                Your AI-powered recommendations are waiting. The more you
                explore, the smarter it gets.
              </p>
            </div>

            {/* AI CTA card */}
            <div
              className="flex-shrink-0 rounded-2xl p-6 flex flex-col gap-4 w-full md:w-80"
              style={{
                background:
                  "linear-gradient(135deg, rgba(219,31,46,0.15) 0%, rgba(26,26,26,0.9) 100%)",
                border: "1px solid rgba(219,31,46,0.25)",
                boxShadow: "0 8px 32px rgba(219,31,46,0.1)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #DB1F2E, #FF3D3D)",
                  }}
                >
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-heading font-semibold text-sm">
                    AI Recommendations
                  </p>
                  <p className="text-white/40 font-body text-xs">
                    Personalized just for you
                  </p>
                </div>
              </div>
              <p className="text-white/50 font-body text-xs leading-5">
                Pick movies you love and let our AI find your next obsession.
              </p>
              <button
                onClick={() => navigate("/pick-favorites")}
                className="w-full py-2.5 rounded-xl font-heading font-bold text-white text-sm
                  tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 40%, #DB1F2ECC 100%)",
                }}
              >
                Try AI Recommendations
              </button>
            </div>
          </div>
        </section>

        {/* ── Popular Right Now ── */}
        <section className="px-6 md:px-16 lg:px-24 py-10">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp size={18} className="text-[#ff3d3d]" />
            <h2 className="font-heading font-bold text-white text-lg md:text-xl">
              Popular Right Now
            </h2>
            <span className="text-white/25 font-body text-xs ml-1">Top 10</span>
          </div>
          <FilmCarousel
            films={popularMovies}
            onCardClick={setActiveFilm}
            showRank
          />
        </section>

        {/* ── Last Recommendation ── */}
        <section className="px-6 md:px-16 lg:px-24 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles size={18} className="text-[#ff3d3d]" />
            <h2 className="font-heading font-bold text-white text-lg md:text-xl">
              Last Recommendation
            </h2>
          </div>
          <p className="text-white/30 font-body text-xs mb-5 ml-7">
            Latest picks generated by your AI
          </p>
          <FilmCarousel
            films={lastRecommendations}
            onCardClick={setActiveFilm}
          />
        </section>

        {/* ── Top Rated ── */}
        <section className="px-6 md:px-16 lg:px-24 py-10 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <StarIcon
              size={18}
              className="text-yellow-400"
              fill="#fbbf24"
              strokeWidth={0}
            />
            <h2 className="font-heading font-bold text-white text-lg md:text-xl">
              Top Rated
            </h2>
          </div>
          <FilmCarousel films={topRated} onCardClick={setActiveFilm} />
        </section>
      </main>

      <MovieOverlay film={activeFilm} onClose={() => setActiveFilm(null)} />
    </div>
  );
}
