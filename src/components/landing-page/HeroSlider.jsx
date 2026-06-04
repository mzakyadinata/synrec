import { useEffect, useState } from "react";
import avenger from "../../assets/avenger.jpg";
import interstellar from "../../assets/interstellar.jpg";
import zootopia from "../../assets/zootopia.jpg";
import { Link } from "react-router-dom";

const slides = [
  {
    image: avenger,
    title: "Let's find your next favorite movie",
    subtitle: "Get personalized recommendations based on your taste",
  },
  {
    image: interstellar,
    title: "Discover films that move you",
    subtitle: "AI-curated picks matched to your unique mood and style",
  },
  {
    image: zootopia,
    title: "Your perfect watch is out there",
    subtitle: "Tell us what you love — we'll handle the rest",
  },
];

const SLIDE_DURATION = 5000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Progress bar + auto advance
  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 50);

    const slideTimeout = setTimeout(() => {
      // Fade content out
      setContentVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        // Fade content back in
        setContentVisible(true);
      }, 400);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimeout);
      setProgress(0);
    };
  }, [current]);

  const goTo = (index) => {
    if (index === current) return;
    setContentVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setContentVisible(true);
    }, 400);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background images */}
      {slides.map(({ image }, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 bg-center bg-cover"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === current ? 1 : 0,
          }}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #0f0f0f 0%, rgba(15,15,15,0.6) 50%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content — left aligned */}
      <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-20 md:px-16 lg:px-24">
        <div
          className="max-w-xl"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-body text-xs font-semibold tracking-widest uppercase mb-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(219,31,46,0.35) 50%, rgba(255,255,255,0.06) 100%)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#ffffff",
              boxShadow:
                "0 2px 12px rgba(219,31,46,0.3), inset 0 1px 0 rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            ✦ AI-Powered Recommendations
          </span>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl font-brand">
            {slides[current].title}
          </h1>

          {/* Subtitle */}
          <p className="max-w-md mb-8 text-sm font-light text-white/60 font-body md:text-base">
            {slides[current].subtitle}
          </p>

          {/* Button */}
          <Link
            to="/signup"
            className="px-10 py-4 text-base font-semibold tracking-wide text-white transition-all duration-200 rounded-full active:scale-95 hover:brightness-110"
            style={{
              background:
                "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 29%, #FF3D3DE6 68%, #DB1F2ECC 100%)",
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Slide indicators with progress bar */}
        <div className="flex items-center gap-3 mt-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className="relative h-1 overflow-hidden transition-all duration-300 rounded-full cursor-pointer"
              style={{
                width: index === current ? "48px" : "20px",
                background: "rgba(255,255,255,0.2)",
              }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Progress fill */}
              {index === current && (
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(to right, #DB1F2E, #FF3D3D)",
                    transition: "width 0.05s linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
