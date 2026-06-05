import { useState, useEffect } from "react";
import { Search, TrendingUp } from "lucide-react";

import Navbar from "../components/Navbar";
import FilmCard from "../components/FilmCard";
import MovieOverlay from "../components/MovieOverlay";
import TrailerModal from "../components/TrailerModal";
import { searchMovies, fetchMovieTrailer } from "../services/movieApi";
import { useFavorites } from "../hooks/useFavorites";

export default function SearchPage() {
  const { isFavorited, toggleFavorite } = useFavorites();

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [activeFilm, setActiveFilm] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const trendingKeywords = [
    "Interstellar",
    "Batman",
    "Oppenheimer",
    "Parasite",
    "Inception",
  ];

  const handleWatchTrailer = async (movieId) => {
    try {
      setLoadingTrailer(true);

      const data = await fetchMovieTrailer(movieId);

      setActiveFilm(null);
      setTrailerUrl(data.trailer_url);
    } catch (err) {
      console.error(err);
      alert("Trailer unavailable");
    } finally {
      setLoadingTrailer(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await searchMovies(query);

        setResults(data.movies || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      <main className="pt-15">
        {/* Hero */}
        <section
          className="relative px-6 md:px-16 lg:px-24 py-16 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a0505 0%, #0f0f0f 60%)",
          }}
        >
          {/* Red Glow */}
          <div
            className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(219,31,46,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-bold text-white text-3xl md:text-5xl mb-4">
              Search Movies
            </h1>

            <p className="font-body text-white/50 text-sm md:text-base mb-8">
              Find movies, series, and hidden gems from around the world.
            </p>

            <div
              className="flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Search size={20} className="text-white/40 shrink-0" />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full bg-transparent outline-none text-white placeholder:text-white/30 font-body"
              />
            </div>
          </div>
        </section>

        {/* BEFORE SEARCH */}
        {!query.trim() && (
          <>
            <section className="px-6 md:px-16 lg:px-24 py-10">
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp size={18} className="text-secondary" />

                <h2 className="font-heading font-bold text-white text-lg md:text-xl">
                  Trending Searches
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {trendingKeywords.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => setQuery(keyword)}
                    className="px-4 py-2 rounded-full text-sm font-body
                    text-white/70 border border-white/10 bg-white/5
                    hover:border-secondary hover:text-white transition-all"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {/* SEARCH RESULTS */}
        {query.trim() && (
          <section className="px-6 md:px-16 lg:px-24 py-10">
            <div className="flex items-center gap-3 mb-5">
              <Search size={18} className="text-secondary" />

              <h2 className="font-heading font-bold text-white text-lg md:text-xl">
                {loading ? "Searching..." : `Search Results (${total})`}
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white/5 animate-pulse"
                    style={{ aspectRatio: "2/3" }}
                  />
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {results.map((film) => (
                  <FilmCard
                    key={film.id}
                    film={film}
                    onClick={setActiveFilm}
                    isFavorited={isFavorited(film.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div
                className="rounded-2xl border border-white/10 px-6 py-10 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <p className="text-white/40 font-body">
                  No movies found for "{query}"
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      <MovieOverlay
        film={activeFilm}
        onClose={() => setActiveFilm(null)}
        isFavorited={activeFilm ? isFavorited(activeFilm.id) : false}
        onToggleFavorite={toggleFavorite}
        onWatchTrailer={handleWatchTrailer}
        loadingTrailer={loadingTrailer}
      />
      <TrailerModal
        trailerUrl={trailerUrl}
        onClose={() => setTrailerUrl(null)}
      />
    </div>
  );
}
