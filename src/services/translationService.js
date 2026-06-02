// Detects if text is likely Indonesian using common Indonesian words
// and character patterns. Simple but effective for this use case.
const INDONESIAN_MARKERS = [
  // Common Indonesian words
  "yang",
  "dan",
  "di",
  "ke",
  "dari",
  "ini",
  "itu",
  "dengan",
  "untuk",
  "tidak",
  "ada",
  "pada",
  "dalam",
  "adalah",
  "juga",
  "sudah",
  "akan",
  "bisa",
  "saya",
  "kami",
  "kita",
  "mereka",
  "dia",
  "aku",
  "kamu",
  "sebuah",
  "setelah",
  "ketika",
  "karena",
  "tetapi",
  "namun",
  "saat",
  "hingga",
  "selama",
  "sebelum",
  "antara",
  "bahwa",
  "atau",
  "pun",
  "telah",
  "sedang",
  "hanya",
  "sangat",
  "lebih",
  "seperti",
  "semua",
  "lagi",
  "sama",
  "satu",
  "dua",
  "tiga",
  "tahun",
  "orang",
  "tempat",
  "dunia",
  "waktu",
  "hidup",
  "menjadi",
  "membuat",
  "menemukan",
];

/**
 * Returns true if the text is likely Indonesian.
 * Strategy: count how many Indonesian marker words appear in the text.
 * If 2 or more markers found → treat as Indonesian.
 */
export function isIndonesian(text) {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  const matchCount = words.filter((w) => INDONESIAN_MARKERS.includes(w)).length;
  return matchCount >= 2;
}

/**
 * Translates text from Indonesian to English using MyMemory API.
 * Free, no API key required, 1000 req/day.
 *
 * @param {string} text - Indonesian text
 * @returns {Promise<string>} - Translated English text
 */
export async function translateToEnglish(text) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=id|en`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Translation service unavailable");

  const data = await res.json();

  if (data.responseStatus !== 200) {
    throw new Error(data.responseMessage || "Translation failed");
  }

  return data.responseData.translatedText;
}

/**
 * Main function: detects language and translates only if Indonesian.
 * Returns { text, wasTranslated }
 *
 * @param {string} rawText - User input (any language)
 * @returns {Promise<{ text: string, wasTranslated: boolean }>}
 */
export async function prepareSynopsis(rawText) {
  const trimmed = rawText.trim();

  if (isIndonesian(trimmed)) {
    const translated = await translateToEnglish(trimmed);
    return { text: translated, wasTranslated: true };
  }

  return { text: trimmed, wasTranslated: false };
}
