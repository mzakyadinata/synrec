import { useEffect, useRef, useState } from "react";
import AboutImage from "../../assets/about.jpg";

const stats = [
  { value: "10K+", label: "Movies" },
  { value: "50+", label: "Genres" },
  { value: "98%", label: "Match Rate" },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .about-fade {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .about-fade.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .about-img {
          opacity: 0;
          transform: translateX(32px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .about-img.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .stat-item {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .stat-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="relative flex justify-end"
      >
        {/* Text content */}
        <div className="flex flex-col md:items-start items-center md:text-left text-center w-full md:w-[50%] px-10 md:pl-25 py-20 z-30 gap-6">
          {/* Badge */}
          <div
            className={`about-fade ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "0s" }}
          >
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
          <div
            className={`about-fade ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl font-heading">
              About NeuroFlix
            </h2>
          </div>

          {/* Paragraph */}
          <div
            className={`about-fade ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <p className="leading-7 text-white/60 font-body text-md md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              pharetra lacus tincidunt ex ornare, non sodales sem elementum.
              Fusce egestas efficitur metus, non malesuada orci aliquet vitae.
              Cras posuere nisi vel volutpat cursus. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Phasellus pharetra lacus tincidunt ex
              ornare, non sodales sem elementum. Fusce egestas efficitur metus,
              non malesuada orci aliquet vitae.
            </p>
          </div>

          {/* Divider */}
          <div
            className={`about-fade w-16 h-px ${visible ? "visible" : ""}`}
            style={{
              transitionDelay: "0.4s",
              background: "linear-gradient(to right, #DB1F2E, transparent)",
            }}
          />

          {/* Stats row */}
          <div className="flex items-center gap-8 md:gap-10">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`stat-item ${
                  visible ? "visible" : ""
                } flex flex-col items-center md:items-start`}
                style={{ transitionDelay: `${0.5 + i * 0.12}s` }}
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
            background:
              "linear-gradient(to left, #0f0f0f 47%, transparent 100%)",
          }}
        />

        {/* Image */}
        <img
          src={AboutImage}
          className={`about-img ${
            visible ? "visible" : ""
          } inset-0 md:block hidden absolute h-full w-[55%] right-0 object-cover z-10`}
          style={{ transitionDelay: "0.1s" }}
          alt="About NeuroFlix"
        />
      </section>
    </>
  );
}
