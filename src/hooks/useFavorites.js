import { useState, useEffect, useCallback } from "react";
import {
  addFavorite,
  removeFavorite,
  fetchFavorites,
} from "../services/movieApi";
import { useAuth } from "../context/useAuth";

// Manages the full set of favorited movie IDs in memory.
// Loads from the backend once on mount when user is logged in.
// Exposes toggleFavorite(movie) which calls POST or DELETE accordingly.
export function useFavorites() {
  const { isLoggedIn } = useAuth();
  // Set of movie IDs the user has favorited
  const [favoritedIds, setFavoritedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Load all favorites once on mount
  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    fetchFavorites()
      .then((movies) => {
        setFavoritedIds(new Set(movies.map((m) => m.movie_id)));
      })
      .catch((err) => console.error("useFavorites load error:", err))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const isFavorited = useCallback(
    (movieId) => favoritedIds.has(movieId),
    [favoritedIds]
  );

  // Toggle: if already favorited → DELETE, else → POST
  const toggleFavorite = useCallback(
    async (movieId) => {
      const alreadyFav = favoritedIds.has(movieId);
      // Optimistic update
      setFavoritedIds((prev) => {
        const next = new Set(prev);
        if (alreadyFav) next.delete(movieId);
        else next.add(movieId);
        return next;
      });
      try {
        if (alreadyFav) {
          await removeFavorite(movieId);
        } else {
          await addFavorite(movieId);
        }
      } catch (err) {
        // Revert on failure
        setFavoritedIds((prev) => {
          const next = new Set(prev);
          if (alreadyFav) next.add(movieId);
          else next.delete(movieId);
          return next;
        });
        console.error("toggleFavorite error:", err);
      }
    },
    [favoritedIds]
  );

  return { favoritedIds, isFavorited, toggleFavorite, loading };
}
