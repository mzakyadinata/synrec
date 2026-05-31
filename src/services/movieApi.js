const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Popular movies ──────────────────────────────────────────
// GET /api/movies/popular
// No auth required
// Response: { status, total, movies: [{ id, title, overview, poster_url, backdrop_url, release_date, vote_average, genres }] }
export async function fetchPopularMovies() {
  const res = await fetch(`${BASE_URL}/movies/popular`);
  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message || "Failed to fetch popular movies");
  return data.movies;
}

// ── Favorites ───────────────────────────────────────────────
// GET /api/favorites
// Response: { status, movies: [{ favorite_id, movie_id, title, poster_url, backdrop_url, vote_average, genres, release_date, ... }] }
export async function fetchFavorites() {
  const res = await fetch(`${BASE_URL}/favorites`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch favorites");
  return data.movies;
}

// POST /api/favorites
// Body: { movie_id }
export async function addFavorite(movieId) {
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ movie_id: movieId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add favorite");
  return data;
}

// DELETE /api/favorites/:movieId
export async function removeFavorite(movieId) {
  const res = await fetch(`${BASE_URL}/favorites/${movieId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to remove favorite");
  return data;
}

// GET /api/favorites/check/:movieId
// Response: { isFavorite: bool }
export async function checkFavorite(movieId) {
  const res = await fetch(`${BASE_URL}/favorites/check/${movieId}`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to check favorite");
  return data.isFavorite;
}
