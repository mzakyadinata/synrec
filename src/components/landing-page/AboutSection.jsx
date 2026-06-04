import AboutImage from "../../assets/about.jpg";

const stats = [
  { value: "5K+", label: "Movies" },
  { value: "AI", label: "Powered" },
  { value: "2", label: "Language" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative flex justify-end">
      {/* Text content */}
      <div className="flex flex-col md:items-start items-center md:text-left text-center w-full md:w-[50%] px-10 md:pl-25 py-20 z-30 gap-6">
        {/* Badge */}
        <div data-aos="fade-up" data-aos-delay="0">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-body text-xs font-semibold tracking-widest uppercase"
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
            ✦ AI-Powered Discovery
          </span>
        </div>

        {/* Title */}
        <div data-aos="fade-up" data-aos-delay="150">
          <h2 className="text-3xl font-bold text-white md:text-4xl font-heading">
            About Synrec
          </h2>
        </div>

        {/* Paragraph */}
        <div data-aos="fade-up" data-aos-delay="300">
          <p className="leading-7 text-white/60 font-body text-md md:text-lg">
            Synrec is built around one core idea. Describe the movie you want to
            watch, and let AI find it for you. Type a story, a mood, or a plot
            idea in English or Indonesian, and Synrec matches it against
            thousands of film synopses to return the closest recommendations. No
            algorithm deciding what is trending, no endless scrolling. Just you
            describing what you want, and the AI doing the rest.
          </p>
        </div>

        {/* Divider */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="w-16 h-px"
          style={{
            background: "linear-gradient(to right, #DB1F2E, transparent)",
          }}
        />

        {/* Stats row */}
        <div className="flex items-center gap-8 md:gap-10">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              data-aos="fade-up"
              data-aos-delay={500 + i * 120}
              className="flex flex-col items-center md:items-start"
            >
              <span
                className="font-black leading-none font-heading"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {value}
              </span>
              <span className="mt-1 text-xs tracking-widest uppercase text-white/30 font-body">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background: "linear-gradient(to left, #0f0f0f 47%, transparent 100%)",
        }}
      />

      {/* Image */}
      <img
        src={AboutImage}
        data-aos="fade-left"
        data-aos-delay="100"
        className="inset-0 md:block hidden absolute h-full w-[55%] right-0 object-cover z-10"
        alt="About Synrec"
      />
    </section>
  );
}
