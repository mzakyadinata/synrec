import HeroSlider from "../components/landing-page/HeroSlider";
import Navbar from "../components/Navbar";
import AboutSection from "../components/landing-page/AboutSection";
import FeaturesSection from "../components/landing-page/FeaturesSection";
import HowItWorksSection from "../components/landing-page/HowItWorksSection";

function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="z-10 bg-[#0f0f0f] space-y-20 overflow-x-hidden">
        <HeroSlider />
        {/* About  */}
        <AboutSection />

        {/* How It Works */}
        <HowItWorksSection />

        {/* Features  */}
        <FeaturesSection />

        {/* Footer */}
        <footer className="bg-[#0f0f0f] border-t border-white/10 px-8 py-6 text-center">
          <p className="text-xs text-white/30 font-body">
            © 2026 Synrec. Powered by AI movie recommendations.
          </p>
        </footer>
      </main>
    </>
  );
}

export default LandingPage;
