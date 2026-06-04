import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

function FilmStrip({ side }) {
  const holes = Array.from({ length: 12 });
  return (
    <div
      className={`fixed top-0 bottom-0 z-10 flex flex-col justify-around py-4 px-1
        ${side === "left" ? "left-0" : "right-0"}`}
      style={{
        width: "28px",
        background: "#0a0a0a",
        borderRight: side === "left" ? "1px solid #1f1f1f" : "none",
        borderLeft: side === "right" ? "1px solid #1f1f1f" : "none",
      }}
    >
      {holes.map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 mx-auto rounded-sm"
          style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.8)",
            animation: `flicker ${
              1.5 + (i % 3) * 0.3
            }s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  const navigate = useNavigate();
  const [glitch, setGlitch] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div
      className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <GrainOverlay />

      <div className="hidden sm:block">
        <FilmStrip side="left" />
        <FilmStrip side="right" />
      </div>

      {/* Scanline sweep */}
      <div
        className="fixed left-0 right-0 h-32 pointer-events-none z-20 opacity-[0.03]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, white, transparent)",
          animation: "scanline 4s linear infinite",
        }}
      />

      {/* Red ambient glow */}
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none md:w-96 md:h-96"
        style={{
          background:
            "radial-gradient(circle, rgba(219,31,46,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-8 text-center sm:px-16">
        {/* 404 */}
        <div
          className={`fade-up-1 select-none leading-none font-black mb-2 ${
            glitch ? "glitch" : ""
          }`}
          style={{
            fontSize: "clamp(100px, 22vw, 220px)",
            fontFamily: "'Montserrat', sans-serif",
            background:
              "linear-gradient(135deg, #ffffff 0%, #555555 50%, #222222 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.04em",
            textShadow: "none",
            filter: glitch ? "blur(1px)" : "none",
            transition: "filter 0.1s",
          }}
        >
          404
        </div>

        <div
          className="w-24 h-px mb-6 fade-up-2 md:w-32"
          style={{
            background:
              "linear-gradient(to right, transparent, #DB1F2E, transparent)",
          }}
        />

        <h1
          className="mb-3 font-bold text-white fade-up-2"
          style={{
            fontSize: "clamp(18px, 3.5vw, 32px)",
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Scene Not Found
        </h1>

        <p
          className="max-w-xs mb-10 leading-7 fade-up-3 text-white/40 md:max-w-sm"
          style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
          }}
        >
          Looks like this reel got lost in the projection room. The page you're
          looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col items-center w-full max-w-xs gap-3 fade-up-4 sm:flex-row sm:max-w-none sm:w-auto">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-white text-sm
              tracking-widest uppercase transition-all duration-200 hover:brightness-110 active:scale-[0.97] cursor-pointer"
            style={{
              background:
                "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 40%, #DB1F2ECC 100%)",
              animation: "pulse-red 2.5s ease-in-out infinite",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.12em",
            }}
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white/60 text-sm
              tracking-widest uppercase border border-white/15 bg-white/5
              transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/30 cursor-pointer"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.12em",
            }}
          >
            Go Back
          </button>
        </div>

        <p
          className="mt-8 text-xs tracking-widest uppercase fade-up-4 text-white/20"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Redirecting to home in{" "}
          <span
            className="font-bold"
            style={{
              color: countdown <= 3 ? "#ff3d3d" : "rgba(255,255,255,0.4)",
            }}
          >
            {countdown}s
          </span>
        </p>
      </div>

      <div
        className="absolute bottom-6 z-10 text-white/15 text-xs tracking-[0.3em] uppercase"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Synrec
      </div>
    </div>
  );
}
