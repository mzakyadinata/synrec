// import { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Check, PencilLine, X } from "lucide-react";
// import bgImage from "../assets/background.jpg";
// import LoadingScreen from "../components/LoadingScreen";
// import { writeLastRecommendations } from "../utils/recommendationCache";
// import { synopsisTemplates } from "../data/synopsisTemplate";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function SynopsisCard({ item, selected, onSelect, disabled }) {
//   return (
//     <button
//       type="button"
//       disabled={disabled}
//       onClick={() => onSelect(item)}
//       className={`
//         relative text-left rounded-2xl border p-5 transition-all duration-300
//         backdrop-blur-md min-h-60
//         ${
//           disabled
//             ? "opacity-40 cursor-not-allowed"
//             : "hover:scale-[1.02] hover:border-white/30"
//         }
//         ${
//           selected
//             ? "border-secondary bg-white/10 shadow-[0_0_20px_rgba(219,31,46,0.35)]"
//             : "border-white/10 bg-white/5"
//         }
//       `}
//     >
//       <div className="flex items-start justify-between mb-4">
//         <h3 className="text-lg font-bold text-white font-heading">
//           {item.title}
//         </h3>
//         {selected && (
//           <div
//             className="w-7 h-7 rounded-full flex items-center justify-center"
//             style={{
//               background: "linear-gradient(135deg, #DB1F2E 0%, #FF3D3D 100%)",
//             }}
//           >
//             <Check size={14} strokeWidth={3} className="text-white" />
//           </div>
//         )}
//       </div>
//       <p className="text-sm leading-7 text-white/70 font-body line-clamp-6">
//         {item.synopsis}
//       </p>
//     </button>
//   );
// }

// const isValidSynopsis = (text) => {
//   const clean = text.trim();
//   if (clean.length < 30) return false;
//   if (clean.split(/\s+/).length < 5) return false;
//   if ((clean.match(/[aiueo]/gi) || []).length < 5) return false;
//   return true;
// };

// export default function PickFavorites() {
//   const navigate = useNavigate();
//   const [selectedSynopsis, setSelectedSynopsis] = useState(null);
//   const [customMode, setCustomMode] = useState(false);
//   const [customSynopsis, setCustomSynopsis] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const customSynopsisValid = useMemo(() => {
//     if (!customMode) return true;
//     return isValidSynopsis(customSynopsis);
//   }, [customMode, customSynopsis]);

//   const handleTemplateSelect = (item) => {
//     if (customMode) return;
//     setSelectedSynopsis(item);
//   };

//   const enableCustomMode = () => {
//     setSelectedSynopsis(null);
//     setCustomMode(true);
//     setError("");
//   };

//   const cancelCustomMode = () => {
//     setCustomMode(false);
//     setCustomSynopsis("");
//     setError("");
//   };

//   const handleContinue = async () => {
//     let synopsis;

//     if (customMode) {
//       if (!customSynopsis.trim()) {
//         setError("Synopsis cannot be empty.");
//         return;
//       }
//       if (!customSynopsisValid) {
//         setError("Please enter a valid synopsis with meaningful sentences.");
//         return;
//       }
//       synopsis = customSynopsis;
//     } else {
//       if (!selectedSynopsis) return;
//       synopsis = selectedSynopsis.synopsis;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/movies/recommend`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ synopsis }),
//       });

//       if (!response.ok) throw new Error("Failed to fetch recommendations");
//       const data = await response.json();

//       // Save to localStorage (replaces previous, 24h TTL handled by Dashboard)
//       writeLastRecommendations(data.movies);

//       navigate("/pick-favorites/recommendations", {
//         state: { movies: data.movies },
//       });
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch recommendations. Please try again.");
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return <LoadingScreen message="Finding your perfect movies..." />;
//   }

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] relative flex flex-col overflow-hidden">
//       {/* Background */}
//       <div className="fixed inset-0 z-0">
//         <img
//           src={bgImage}
//           alt=""
//           className="object-cover w-full h-full"
//           style={{ filter: "blur(2px) brightness(0.25)" }}
//         />
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(ellipse at center, transparent 40%, #0f0f0f 100%)",
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center flex-1 w-full px-5 pt-12 pb-36 md:pb-24">
//         <div className="max-w-2xl mb-8 text-center md:mb-10">
//           <h1 className="mb-3 text-4xl font-bold text-white font-heading lg:text-5xl">
//             Describe Your Movie Taste
//           </h1>
//           <p className="text-sm leading-7 font-body text-white/50 md:text-base">
//             Pick a synopsis template or write your own movie story idea to get
//             personalized recommendations.
//           </p>
//         </div>

//         {!customMode && (
//           <button
//             type="button"
//             onClick={enableCustomMode}
//             className="flex items-center gap-2 px-5 py-3 mb-8 text-sm font-semibold text-white transition-all border rounded-full border-white/15 bg-white/5 hover:bg-white/10"
//           >
//             <PencilLine size={17} />
//             Write Your Own Synopsis
//           </button>
//         )}

//         {customMode ? (
//           <div className="w-full max-w-3xl">
//             <div className="p-6 border backdrop-blur-md rounded-3xl border-white/10 bg-white/5">
//               <div className="flex items-center justify-between mb-5">
//                 <h2 className="text-xl font-bold text-white font-heading">
//                   Custom Synopsis
//                 </h2>
//                 <button
//                   type="button"
//                   onClick={cancelCustomMode}
//                   className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-all rounded-full bg-white/10 hover:bg-white/15"
//                 >
//                   <X size={16} />
//                   Cancel
//                 </button>
//               </div>
//               <textarea
//                 value={customSynopsis}
//                 onChange={(e) => {
//                   setCustomSynopsis(e.target.value);
//                   setError("");
//                 }}
//                 placeholder="Describe your movie idea in a few sentences..."
//                 className="w-full h-56 p-5 text-white border outline-none resize-none rounded-2xl bg-black/30 border-white/10 placeholder:text-white/30"
//               />
//               <div className="flex items-center justify-between mt-3">
//                 <p className="text-xs text-white/35">
//                   {customSynopsis.length} / 1000 characters
//                 </p>
//                 {!customSynopsisValid && customSynopsis.length > 0 && (
//                   <p className="text-xs text-red-400">
//                     Please enter a meaningful synopsis.
//                   </p>
//                 )}
//               </div>
//               <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10">
//                 <p className="text-sm leading-7 text-white/60">
//                   Indonesian synopsis will be translated automatically into
//                   English before being sent to the recommendation model.
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="w-full max-w-md md:max-w-4xl lg:max-w-6xl">
//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
//               {synopsisTemplates.map((item) => (
//                 <SynopsisCard
//                   key={item.id}
//                   item={item}
//                   selected={selectedSynopsis?.id === item.id}
//                   onSelect={handleTemplateSelect}
//                   disabled={customMode}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="px-5 py-3 mt-6 text-sm text-red-300 border rounded-2xl border-red-500/30 bg-red-500/10">
//             {error}
//           </div>
//         )}
//       </div>

//       {/* Continue button */}
//       <div
//         className={`fixed bottom-0 left-0 right-0 z-20 px-6 pb-8 pt-6 transition-all duration-300
//           ${
//             selectedSynopsis || customMode
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-6 pointer-events-none"
//           }`}
//         style={{
//           background: "linear-gradient(to top, #0f0f0f 60%, transparent 100%)",
//         }}
//       >
//         <div className="max-w-xs mx-auto md:max-w-sm">
//           <button
//             onClick={handleContinue}
//             disabled={customMode && !customSynopsisValid}
//             className="w-full py-4 rounded-full font-heading font-bold text-white text-base
//               tracking-wide transition-all duration-200 active:scale-[0.98] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
//             style={{
//               background:
//                 "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 40%, #DB1F2ECC 100%)",
//             }}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, PencilLine, X, Languages } from "lucide-react";
import bgImage from "../assets/background.jpg";
import LoadingScreen from "../components/LoadingScreen";
import { writeLastRecommendations } from "../utils/recommendationCache";
import { prepareSynopsis } from "../services/translationService";
import { synopsisTemplates } from "../data/synopsisTemplate";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function SynopsisCard({ item, selected, onSelect, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(item)}
      className={`
        relative text-left rounded-2xl border p-5 transition-all duration-300
        backdrop-blur-md min-h-60
        ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "hover:scale-[1.02] hover:border-white/30"
        }
        ${
          selected
            ? "border-secondary bg-white/10 shadow-[0_0_20px_rgba(219,31,46,0.35)]"
            : "border-white/10 bg-white/5"
        }
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-white font-heading">
          {item.title}
        </h3>
        {selected && (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #DB1F2E 0%, #FF3D3D 100%)",
            }}
          >
            <Check size={14} strokeWidth={3} className="text-white" />
          </div>
        )}
      </div>
      <p className="text-sm leading-7 text-white/70 font-body line-clamp-6">
        {item.synopsis}
      </p>
    </button>
  );
}

const isValidSynopsis = (text) => {
  const clean = text.trim();
  if (clean.length < 30) return false;
  if (clean.split(/\s+/).length < 5) return false;
  if ((clean.match(/[aiueo]/gi) || []).length < 5) return false;
  return true;
};

export default function PickFavorites() {
  const navigate = useNavigate();
  const [selectedSynopsis, setSelectedSynopsis] = useState(null);
  const [customMode, setCustomMode] = useState(false);
  const [customSynopsis, setCustomSynopsis] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Finding your perfect movies..."
  );
  const [translationNotice, setTranslationNotice] = useState("");

  const customSynopsisValid = useMemo(() => {
    if (!customMode) return true;
    return isValidSynopsis(customSynopsis);
  }, [customMode, customSynopsis]);

  const handleTemplateSelect = (item) => {
    if (customMode) return;
    setSelectedSynopsis(item);
  };

  const enableCustomMode = () => {
    setSelectedSynopsis(null);
    setCustomMode(true);
    setError("");
    setTranslationNotice("");
  };

  const cancelCustomMode = () => {
    setCustomMode(false);
    setCustomSynopsis("");
    setError("");
    setTranslationNotice("");
  };

  const handleContinue = async () => {
    let rawSynopsis;
    if (customMode) {
      if (!customSynopsis.trim()) {
        setError("Synopsis cannot be empty.");
        return;
      }
      if (!customSynopsisValid) {
        setError("Please enter a valid synopsis with meaningful sentences.");
        return;
      }
      rawSynopsis = customSynopsis;
    } else {
      if (!selectedSynopsis) return;
      rawSynopsis = selectedSynopsis.synopsis;
    }

    setIsLoading(true);
    setError("");
    setTranslationNotice("");

    try {
      // Step 1 — detect language, translate if Indonesian
      setLoadingMessage("Preparing your synopsis...");
      const { text: synopsis, wasTranslated } = await prepareSynopsis(
        rawSynopsis
      );

      if (wasTranslated) {
        setTranslationNotice("Synopsis translated from Indonesian to English.");
      }

      // Step 2 — send to backend
      setLoadingMessage("Finding your perfect movies...");
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/movies/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ synopsis }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to fetch recommendations");
      }

      const data = await response.json();

      // Step 3 — save to localStorage (replaces previous, 24h TTL)
      writeLastRecommendations(data.movies);

      navigate("/pick-favorites/recommendations", {
        state: { movies: data.movies },
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  const canSubmit = customMode ? customSynopsisValid : !!selectedSynopsis;

  return (
    <div className="min-h-screen bg-[#0f0f0f] relative flex flex-col overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={bgImage}
          alt=""
          className="object-cover w-full h-full"
          style={{ filter: "blur(2px) brightness(0.25)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, #0f0f0f 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 w-full px-5 pt-12 pb-36 md:pb-24">
        <div className="max-w-2xl mb-8 text-center md:mb-10">
          <h1 className="mb-3 text-4xl font-bold text-white font-heading lg:text-5xl">
            Describe Your Movie Taste
          </h1>
          <p className="text-sm leading-7 font-body text-white/50 md:text-base">
            Pick a synopsis template or write your own — in English or
            Indonesian.
          </p>
        </div>

        {!customMode && (
          <button
            type="button"
            onClick={enableCustomMode}
            className="flex items-center gap-2 px-5 py-3 mb-8 text-sm font-semibold text-white transition-all border rounded-full border-white/15 bg-white/5 hover:bg-white/10"
          >
            <PencilLine size={17} />
            Write Your Own Synopsis
          </button>
        )}

        {customMode ? (
          <div className="w-full max-w-3xl">
            <div className="p-6 border backdrop-blur-md rounded-3xl border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-white font-heading">
                  Custom Synopsis
                </h2>
                <button
                  type="button"
                  onClick={cancelCustomMode}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-all rounded-full bg-white/10 hover:bg-white/15"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>

              <textarea
                value={customSynopsis}
                onChange={(e) => {
                  setCustomSynopsis(e.target.value);
                  setError("");
                  setTranslationNotice("");
                }}
                placeholder="Describe your movie idea... (English or Indonesian)"
                className="w-full h-56 p-5 text-white border outline-none resize-none rounded-2xl bg-black/30 border-white/10 placeholder:text-white/30 focus:border-white/30 transition-colors"
                maxLength={1000}
              />

              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-white/35">
                  {customSynopsis.length} / 1000
                </p>
                {!customSynopsisValid && customSynopsis.length > 0 && (
                  <p className="text-xs text-red-400">
                    Please write a more meaningful synopsis.
                  </p>
                )}
              </div>

              {/* Info banner */}
              <div className="flex items-start gap-3 mt-5 p-4 rounded-2xl border border-white/10 bg-white/5">
                <Languages
                  size={16}
                  className="text-secondary shrink-0 mt-0.5"
                />
                <p className="text-sm leading-6 text-white/50 font-body">
                  You can write in{" "}
                  <span className="text-white/80 font-medium">
                    Indonesian or English
                  </span>
                  . Indonesian input will be automatically translated to English
                  before being sent to the AI.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md md:max-w-4xl lg:max-w-6xl">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {synopsisTemplates.map((item) => (
                <SynopsisCard
                  key={item.id}
                  item={item}
                  selected={selectedSynopsis?.id === item.id}
                  onSelect={handleTemplateSelect}
                  disabled={customMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border border-red-500/40 bg-[#1a0505]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(219,31,46,0.25)] text-red-300 text-sm font-body animate-[fadeUp_0.3s_ease] max-w-sm w-[90%] text-center">
            <span className="text-red-400 text-base shrink-0">⚠</span>
            {error}
          </div>
        )}

        {/* Translation notice */}
        {translationNotice && (
          <div className="flex items-center gap-2 px-5 py-3 mt-4 text-sm border rounded-2xl border-secondary/20 bg-secondary/10 text-secondary/80">
            <Languages size={15} />
            {translationNotice}
          </div>
        )}
      </div>

      {/* Continue button */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-20 px-6 pb-8 pt-6 transition-all duration-300
          ${
            canSubmit
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
            disabled={customMode && !customSynopsisValid}
            className="w-full py-4 rounded-full font-heading font-bold text-white text-base
              tracking-wide transition-all duration-200 active:scale-[0.98] hover:brightness-110
              disabled:opacity-50 disabled:cursor-not-allowed"
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
