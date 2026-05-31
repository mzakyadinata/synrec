import { Sparkles } from "lucide-react";

export default function LoadingScreen({
  message = "Finding your perfect movies...",
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0f0f]">
      {/* Ambient glow */}
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(219,31,46,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Spinning icon ring */}
        <div className="relative w-20 h-20">
          {/* Outer spinning ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "#ff3d3d",
              borderRightColor: "rgba(219,31,46,0.3)",
              animation: "spin 1s linear infinite",
            }}
          />
          {/* Inner icon */}
          <div
            className="absolute inset-2 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #DB1F2E, #FF3D3D)" }}
          >
            <Sparkles size={22} className="text-white" />
          </div>
        </div>

        {/* Pulsing dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-secondary"
              style={{
                animation: "pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-white font-heading font-semibold text-lg mb-1">
            {message}
          </p>
          <p className="text-white/30 font-body text-sm">
            Our AI is analyzing your taste
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
