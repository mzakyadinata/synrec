import { Sparkles, Heart, Flame, Search } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Recommendations",
    desc: "Personalized movie suggestions powered by AI.",
    stat: "10K+",
    statLabel: "movies catalogued",
    accent: "rgba(219,31,46,0.06)",
    accentBorder: "rgba(219,31,46,0.2)",
    aos: {
      data: "fade-up-right",
      delay: "0",
    },
  },
  {
    icon: Heart,
    title: "My Watchlist",
    desc: "Keep your favorite movies in one place.",
    stat: "∞",
    statLabel: "saves, no limit",
    accent: "rgba(255,80,80,0.05)",
    accentBorder: "rgba(255,80,80,0.15)",
    aos: {
      data: "fade-up",
      delay: "100",
    },
  },
  {
    icon: Flame,
    title: "Trending Now",
    desc: "Explore the most popular movies right now.",
    stat: "24/7",
    statLabel: "updated live",
    accent: "rgba(255,120,30,0.05)",
    accentBorder: "rgba(255,120,30,0.15)",
    aos: {
      data: "fade-up-left",
      delay: "200",
    },
  },
  {
    icon: Search,
    title: "Smart Search",
    desc: "Find movies by mood, genre, or preferences.",
    stat: "50+",
    statLabel: "genres & moods",
    accent: "rgba(100,120,255,0.05)",
    accentBorder: "rgba(100,120,255,0.15)",
    aos: {
      data: "fade-left",
      delay: "300",
    },
  },
];

export default function FeaturesSection() {
  return (
    <>
      {/* Gradient for lucide icon */}
      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="icon-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#db1f2e" />
            <stop offset="50%" stopColor="#ff3d3d" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>
      </svg>

      <section
        id="features"
        className="flex flex-col items-center px-8 py-16 md:px-15 md:items-start"
      >
        <h2 className="mb-2 text-3xl font-bold text-center text-white md:text-4xl font-heading">
          Features
        </h2>
        <p className="mb-10 text-sm text-center text-white/40 font-body md:text-left">
          Everything you need to discover your next favorite film.
        </p>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-4">
          {features.map(
            ({
              icon: Icon,
              title,
              desc,
              stat,
              statLabel,
              accent,
              accentBorder,
              aos,
            }) => (
              <div
                key={title}
                className="relative flex flex-col justify-between p-5 overflow-hidden transition-transform duration-300 rounded-2xl min-h-32 md:min-h-82 group hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, #1a1a1a 60%)`,
                  border: `1px solid ${accentBorder}`,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 0 ${accentBorder}`,
                }}
                data-aos={aos.data}
                data-aos-delay={aos.delay}
              >
                {/* Watermark background icon */}
                <div className="absolute pointer-events-none select-none bottom-10 right-3">
                  <Icon
                    size={110}
                    strokeWidth={1}
                    className="opacity-[0.04]"
                    color="white"
                  />
                </div>

                {/* Top: title + desc */}
                <div className="relative z-10 pt-1 pl-1 space-y-2">
                  <h3 className="text-lg font-bold leading-snug text-white font-heading">
                    {title}
                  </h3>
                  <p className="text-sm leading-6 text-white/50 font-body">
                    {desc}
                  </p>
                </div>

                {/* Middle: stat number */}
                <div className="relative z-10 pl-1 my-4">
                  <p
                    className="font-black leading-none font-heading"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 2.75rem)",
                      background:
                        "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.3) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat}
                  </p>
                  <p className="mt-1 text-xs tracking-wide uppercase text-white/25 font-body">
                    {statLabel}
                  </p>
                </div>

                {/* Bottom: small gradient icon */}
                <div className="relative z-10 flex justify-end">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${accentBorder}`,
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={2.2}
                      style={{ stroke: "url(#icon-gradient)" }}
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="h-24 md:h-32" />
      </section>
    </>
  );
}
