import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import FilmCarousel from "../components/FilmCarousel";
import MovieOverlay from "../components/MovieOverlay";
import { useAuth } from "../context/useAuth";
import { useFavorites } from "../hooks/useFavorites";
import { fetchPopularMovies } from "../services/movieApi";
import {
  readCache,
  writeCache,
  readLastRecommendations,
} from "../utils/recommendationCache";
import { Typewriter } from "react-simple-typewriter";

// ── localStorage helpers ──────────────────────────────────────
const POPULAR_KEY = "synrec_popular";
const POPULAR_TTL = 12 * 60 * 60 * 1000; // 12 hours

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isFavorited, toggleFavorite } = useFavorites();

  const [popularMovies, setPopularMovies] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);
  const [lastRecs, setLastRecs] = useState(null); // null = expired/none, [] = empty, [...] = data
  const [activeFilm, setActiveFilm] = useState(null);

  // Greeting
  const greeting = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 17) return "Good Afternoon";
    if (hours >= 17 && hours < 21) return "Good Evening";
    return "Good Night";
  };

  // Load popular movies — cache 12h
  useEffect(() => {
    const cached = readCache(POPULAR_KEY, POPULAR_TTL);
    if (cached) {
      setPopularMovies(cached);
      setPopularLoading(false);
      return;
    }
    fetchPopularMovies()
      .then((movies) => {
        setPopularMovies(movies);
        writeCache(POPULAR_KEY, movies);
      })
      .catch((err) => console.error("Popular movies error:", err))
      .finally(() => setPopularLoading(false));
  }, []);

  // Load last recommendations from localStorage — check 24h TTL
  useEffect(() => {
    const data = readLastRecommendations();
    // data is the movies array from the AI response
    // each item: { rank, similarity_score, ml_title, tmdb: { id, title, poster_path, backdrop_path, ... } }
    // normalise to the shape FilmCard/MovieOverlay expect
    if (data) {
      const normalised = data
        .filter((m) => m.tmdb)
        .map((m) => ({
          id: m.tmdb.id,
          title: m.tmdb.title,
          overview: m.tmdb.overview,
          poster_url: `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${
            m.tmdb.poster_path
          }`,
          backdrop_url: `${import.meta.env.VITE_TMDB_BACKDROP_BASE_URL}${
            m.tmdb.backdrop_path
          }`,
          release_date: m.tmdb.release_date,
          vote_average: m.tmdb.vote_average,
          genres: m.tmdb.genres,
          similarity_score: m.similarity_score,
        }));
      setLastRecs(normalised);
    } else {
      setLastRecs(null); // expired or never fetched
    }
  }, []);

  return (
    <div className="h-max bg-[#0f0f0f]">
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
            {/* Greeting */}
            <div data-aos="fade-up">
              <p className="font-heading font-semibold text-xl md:text-2xl mb-3">
                <span className="bg-linear-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  <Typewriter
                    words={[
                      `${greeting()}, ${
                        user?.fullname?.split(" ")[0] || user?.username
                      }`,
                    ]}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                  />
                </span>
              </p>

              <h1 className="font-heading font-bold text-white/90 text-2xl md:text-4xl leading-tight">
                Ready to discover
                <br />
                something new?
              </h1>
            </div>

            {/* AI CTA card */}
            <div
              className="shrink-0 rounded-2xl p-6 flex flex-col gap-4 w-full md:w-80"
              style={{
                background:
                  "linear-gradient(135deg, rgba(219,31,46,0.15) 0%, rgba(26,26,26,0.9) 100%)",
                border: "1px solid rgba(219,31,46,0.25)",
                boxShadow: "0 8px 32px rgba(219,31,46,0.1)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
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
            <TrendingUp size={18} className="text-secondary" />
            <h2 className="font-heading font-bold text-white text-lg md:text-xl">
              Popular Right Now
            </h2>
            <span className="text-white/25 font-body text-xs ml-1">Top 10</span>
          </div>
          {popularLoading ? (
            <div className="flex gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-32 md:w-40 rounded-xl bg-white/5 animate-pulse"
                  style={{ aspectRatio: "2/3" }}
                />
              ))}
            </div>
          ) : (
            <FilmCarousel
              films={popularMovies}
              onCardClick={setActiveFilm}
              isFavorited={isFavorited}
              onToggleFavorite={toggleFavorite}
              showRank
            />
          )}
        </section>

        {/* ── Last Recommendation ── */}
        <section className="px-6 md:px-16 lg:px-24 py-10 ">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles size={18} className="text-secondary" />
            <h2 className="font-heading font-bold text-white text-lg md:text-xl">
              Last Recommendation
            </h2>
          </div>
          <p className="text-white/30 font-body text-xs mb-5 ml-7">
            Latest picks generated by your AI
          </p>

          <FilmCarousel
            films={lastRecs ?? []}
            onCardClick={setActiveFilm}
            isFavorited={isFavorited}
            onToggleFavorite={toggleFavorite}
            // cardWidth="w-[calc(20vw-1.5rem)] md:w-[calc(20%-1rem)] max-w-[180px] min-w-[120px]"
            emptyMessage={
              lastRecs === null
                ? "Movie recommendations have been deleted because they are more than a day old. Please re-receive recommendations from the AI."
                : undefined
            }
          />
        </section>
      </main>

      <MovieOverlay
        film={activeFilm}
        onClose={() => setActiveFilm(null)}
        isFavorited={activeFilm ? isFavorited(activeFilm.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
