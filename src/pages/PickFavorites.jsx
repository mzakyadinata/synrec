import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import bgImage from "../assets/background.jpg";

// Import film posters — add as many as you have in assets
import film1 from "../assets/film1.jpg";
import film2 from "../assets/film2.jpg";
import film3 from "../assets/film3.jpg";
import film4 from "../assets/film4.jpg";
import film5 from "../assets/film5.jpg";
import film6 from "../assets/film6.jpg";

const films = [
  { id: 1, title: "Film 1", poster: film1 },
  { id: 2, title: "Film 2", poster: film2 },
  { id: 3, title: "Film 3", poster: film3 },
  { id: 4, title: "Film 4", poster: film4 },
  { id: 5, title: "Film 5", poster: film5 },
  { id: 6, title: "Film 6", poster: film6 },
];

// Single film poster card
function FilmCard({ film, selected, onToggle }) {
  return (
    <div
      onClick={() => onToggle(film.id)}
      className="relative overflow-hidden cursor-pointer rounded-xl group"
      style={{ aspectRatio: "2/3" }}
    >
      {/* Poster image */}
      <img
        src={film.poster}
        alt={film.title}
        className={`w-full h-full object-cover transition-all duration-300
          ${
            selected
              ? "brightness-50 scale-[0.97]"
              : "brightness-100 group-hover:brightness-75 group-hover:scale-[0.98]"
          }
        `}
      />

      {/* Selected border glow */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          selected
            ? "ring-2 ring-secondary shadow-[0_0_16px_rgba(219,31,46,0.6)]"
            : "ring-1 ring-white/10"
        }`}
      />

      {/* Checkmark badge */}
      <div
        className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center
          transition-all duration-200
          ${selected ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        style={{
          background: "linear-gradient(135deg, #DB1F2E 0%, #FF3D3D 100%)",
        }}
      >
        <Check size={13} strokeWidth={3} className="text-white" />
      </div>
    </div>
  );
}

export default function PickFavorites() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleFilm = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    // Navigate to home or dashboard after picking favorites
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] relative flex flex-col">
      {/* Background image — blurred, dimmed */}
      <div className="fixed inset-0 z-0">
        <img
          src={bgImage}
          alt=""
          className="object-cover w-full h-full"
          style={{ filter: "blur(2px) brightness(0.25)" }}
        />
        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, #0f0f0f 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 w-full px-5 pt-12 pb-32 md:pb-24">
        {/* Header text */}
        <div className="max-w-sm mb-8 text-center md:max-w-lg md:mb-10">
          <h1 className="mb-3 text-4xl font-bold text-white font-heading md:text-4xl lg:text-5xl">
            Pick Your Favorites
          </h1>
          <p className="text-sm font-body text-white/50 md:text-base">
            Choose a few movies to get personalized recommendations
          </p>
        </div>

        {/* Film grid */}
        <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-3 md:gap-15">
            {films.map((film) => (
              <FilmCard
                key={film.id}
                film={film}
                selected={selected.includes(film.id)}
                onToggle={toggleFilm}
              />
            ))}
          </div>
        </div>

        {/* Selection count hint */}
        {selected.length > 0 && (
          <p className="mt-6 text-xs font-body text-white/30">
            {selected.length} movie{selected.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      {/* Continue button — fixed at bottom, fades in when selection made */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-20 px-6 pb-8 pt-6 transition-all duration-300
          ${
            selected.length > 0
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        style={{
          background: "linear-gradient(to top, #0f0f0f 60%, transparent 100%)",
        }}
      >
        <div className="max-w-xs mx-auto md:max-w-sm">
          <button
            onClick={handleContinue}
            className="w-full py-4 rounded-full font-heading font-bold text-white text-base
              tracking-wide transition-all duration-200 active:scale-[0.98] hover:brightness-110"
            style={{
              background:
                "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 40%, #DB1F2ECC 100%)",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
