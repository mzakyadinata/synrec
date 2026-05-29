import { Film, Brain, Gift } from "lucide-react";

const howItWorks = [
  {
    step: "01",
    icon: Film,
    title: "Choose Your Preferences",
    desc: "Select your favorite genres, moods, and movie styles.",
    gradient:
      "linear-gradient(139deg, rgba(219,31,46,0.65) 0%, rgba(26,26,26,.9) 100%)",
    glowColor: "rgba(219,31,46,0.35)",
  },
  {
    step: "02",
    icon: Brain,
    title: "AI Learns Your Taste",
    desc: "Our intelligent model analyzes your movie interests.",
    gradient:
      "linear-gradient(139deg, rgba(219,31,46,0.65) 0%, rgba(26,26,26,.9) 64%)",
    glowColor: "rgba(219,31,46,0.25)",
  },
  {
    step: "03",
    icon: Gift,
    title: "Discover Great Movies",
    desc: "Get personalized recommendations tailored just for you.",
    gradient:
      "linear-gradient(139deg, rgba(219,31,46,0.65) 0%, rgba(26,26,26,.9) 37%)",
    glowColor: "rgba(219,31,46,0.2)",
    customShadow:
      "shadow-[1px_1px_3px_rgba(255,255,255,0.3),0px_-3px_4px_rgba(219,31,46,0.3)]",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative px-8 py-24 overflow-hidden">
      {/* Background text */}
      <h2 className="hidden md:block absolute text-[20vw] font-black font-heading text-white/10 leading-[0.85] pointer-events-none select-none text-center">
        HOW IT WORKS?
      </h2>

      {/* Mobile title */}
      <h2 className="mb-8 text-3xl font-bold text-center text-white md:hidden font-heading">
        How It Works?
      </h2>

      {/* Cards */}
      <div className="relative z-10 flex flex-col w-full max-w-5xl gap-8 mx-auto">
        {howItWorks.map(
          (
            {
              step,
              icon: Icon,
              title,
              desc,
              gradient,
              glowColor,
              customShadow,
            },
            index
          ) => (
            <div
              key={step}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`how-card relative rounded-2xl overflow-hidden w-full md:max-w-md ${
                index === 0
                  ? "md:self-start"
                  : index === 1
                  ? "md:self-end"
                  : "md:self-start md:ml-20"
              } ${
                customShadow || "shadow-[1px_1px_3px_rgba(255,255,255,0.3)]"
              }`}
              style={{ background: gradient }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 40px ${glowColor}, 0 0 0 1px rgba(219,31,46,0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div className="px-5 py-5 pl-6">
                <span className="block text-2xl font-extrabold text-white step-num font-heading">
                  {step}
                </span>
                <div className="flex items-center gap-2 mt-1 mb-1">
                  <Icon
                    size={20}
                    strokeWidth={2.4}
                    className="card-icon text-white/80"
                  />
                  <h3 className="text-lg font-semibold text-white font-heading">
                    {title}
                  </h3>
                </div>
                <p className="card-desc text-[#b3b3b3] font-body font-medium text-xs leading-5">
                  {desc}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
