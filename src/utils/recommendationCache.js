const RECS_KEY = "synrec_last_recommendations";
const RECS_TTL = 24 * 60 * 60 * 1000;

export function readCache(key, ttl) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const { data, savedAt } = JSON.parse(raw);

    if (Date.now() - savedAt > ttl) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export function writeCache(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      savedAt: Date.now(),
    })
  );
}

export function readLastRecommendations() {
  return readCache(RECS_KEY, RECS_TTL);
}

export function writeLastRecommendations(movies) {
  writeCache(RECS_KEY, movies);
}
