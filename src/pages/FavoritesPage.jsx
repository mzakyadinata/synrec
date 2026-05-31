import { useState, useEffect } from "react";
import { Heart, ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieOverlay from "../components/MovieOverlay";
import { useFavorites } from "../hooks/useFavorites";
import { fetchFavorites } from "../services/movieApi";
import { useAuth } from "../context/useAuth";

const INITIAL_VISIBLE = 8;

// Skeleton placeholder card
function SkeletonCard() {
  return (
    <div
      className="rounded-xl bg-white/5 animate-pulse"
      style={{ aspectRatio: "2/3" }}
    />
  );
}

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilm, setActiveFilm] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Load favorites from API
  useEffect(() => {
    if (!isLoggedIn) return;
    fetchFavorites()
      .then((movies) => {
        // normalise to common shape
        const normalised = movies.map((m) => ({
          id: m.movie_id,
          title: m.title,
          overview: m.overview,
          poster_url: m.poster_url,
          backdrop_url: m.backdrop_url,
          vote_average: m.vote_average,
          genres: m.genres,
          release_date: m.release_date,
        }));
        setFavorites(normalised);
      })
      .catch((err) => console.error("FavoritesPage load error:", err))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  // When user unlikes a film, animate it out then remove from list
  const handleUnlike = async (id) => {
    setRemovingId(id);
    await toggleFavorite(id); // calls DELETE via useFavorites
    setTimeout(() => {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
      setRemovingId(null);
      if (activeFilm?.id === id) setActiveFilm(null);
    }, 350);
  };

  const visibleFavorites = showAll
    ? favorites
    : favorites.slice(0, INITIAL_VISIBLE);
  const hasMore = favorites.length > INITIAL_VISIBLE && !showAll;

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      <main className="pt-25 px-6 md:px-16 lg:px-24 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #DB1F2E, #FF3D3D)",
                }}
              >
                <Heart size={18} className="text-white" fill="white" />
              </div>
              <h1 className="font-heading font-bold text-white text-2xl md:text-3xl">
                My Favorites
              </h1>
            </div>
            <p className="text-white/40 font-body text-sm ml-12">
              {loading
                ? "Loading..."
                : `${favorites.length} movie${
                    favorites.length !== 1 ? "s" : ""
                  } you love`}
            </p>
          </div>
          <button
            onClick={() => navigate("/pick-favorites")}
            className="flex items-center gap-2 text-white/50 hover:text-white font-body text-sm transition-colors group self-start md:self-auto"
          >
            Get AI Recommendations
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{
                background: "rgba(219,31,46,0.1)",
                border: "1px solid rgba(219,31,46,0.2)",
              }}
            >
              <Heart size={28} className="text-secondary/50" />
            </div>
            <h2 className="font-heading font-bold text-white text-xl mb-2">
              No favorites yet
            </h2>
            <p className="text-white/30 font-body text-sm mb-6 max-w-xs">
              Like movies you enjoy and they'll show up here for easy access.
            </p>
            <button
              onClick={() => navigate("/pick-favorites")}
              className="px-8 py-3 rounded-full font-heading font-semibold text-white text-sm
                tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 40%, #DB1F2ECC 100%)",
              }}
            >
              Discover Movies
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && favorites.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {visibleFavorites.map((film) => (
                <div
                  key={film.id}
                  className="group relative rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    aspectRatio: "2/3",
                    opacity: removingId === film.id ? 0 : 1,
                    transform:
                      removingId === film.id ? "scale(0.9)" : "scale(1)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                  }}
                >
                  <img
                    src={film.poster_url}
                    alt={film.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-60 group-hover:scale-[0.98]"
                    onClick={() => setActiveFilm(film)}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)",
                    }}
                  />

                  {/* Heart — always red, click = unlike */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnlike(film.id);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-200 opacity-0 group-hover:opacity-100
                      bg-black/50 border border-secondary text-secondary hover:bg-secondary hover:text-white"
                    aria-label="Unlike"
                  >
                    <Heart size={14} fill="currentColor" />
                  </button>

                  {/* Info */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    onClick={() => setActiveFilm(film)}
                  >
                    <p className="text-white font-heading font-semibold text-xs leading-4 mb-1 truncate">
                      {film.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 font-body text-[10px]">
                        {film.release_date
                          ? new Date(film.release_date).getFullYear()
                          : ""}
                      </span>
                      <span className="flex items-center gap-0.5 text-yellow-400 text-[10px] font-body font-medium">
                        ★ {Number(film.vote_average).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="flex items-center gap-2 px-8 py-3 rounded-full font-body font-medium text-white/60 text-sm
                    border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <ChevronDown size={16} />
                  Show more ({favorites.length - INITIAL_VISIBLE} more)
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <MovieOverlay
        film={activeFilm}
        onClose={() => setActiveFilm(null)}
        isFavorited={activeFilm ? isFavorited(activeFilm.id) : false}
        onToggleFavorite={(id) => handleUnlike(id)}
      />
    </div>
  );
}
