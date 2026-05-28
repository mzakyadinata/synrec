import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function SignUpSuccess({ name }) {
  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
      }}
    >
      {/* Card */}
      <div
        className="flex flex-col items-center w-full max-w-sm px-8 py-10 text-center rounded-2xl"
        style={{
          background: "linear-gradient(160deg, #1f1f1f 0%, #141414 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(219,31,46,0.08)",
        }}
      >
        {/* Checkmark */}
        <div
          className="flex items-center justify-center w-16 h-16 mb-5 rounded-full"
          style={{
            background: "linear-gradient(135deg, #DB1F2E 0%, #FF3D3D 100%)",
            boxShadow: "0 0 32px rgba(219,31,46,0.5)",
          }}
        >
          <CheckCircle size={32} className="text-white" strokeWidth={2} />
        </div>

        {/* Text */}
        <h1 className="mb-2 text-2xl font-bold text-white font-heading">
          You're In!
        </h1>
        <p className="mb-1 text-sm font-body text-white/50">
          Welcome{name ? `, ${name}` : ""}! Your account has been created
          successfully.
        </p>
        <p className="mb-8 text-xs font-body text-white/25">
          Let AI find your next favorite movie.
        </p>

        {/* Divider */}
        <div
          className="w-12 h-px mb-8"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(219,31,46,0.5), transparent)",
          }}
        />

        {/* CTA */}
        <Link
          to="/signin"
          className="w-full py-3 rounded-xl font-heading font-bold text-white text-sm
            tracking-wide text-center transition-all duration-200 active:scale-[0.98] hover:brightness-110 mb-3"
          style={{
            background:
              "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 40%, #DB1F2ECC 100%)",
          }}
        >
          Sign In Now
        </Link>
        <Link
          to="/"
          className="text-xs transition-colors text-white/25 font-body hover:text-white/50"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
