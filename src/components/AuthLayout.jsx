import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import bgImage from "../assets/background.jpg";

// Reusable text/email input
export function AuthInput({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3.5
        text-white placeholder-white/40 font-body text-sm
        focus:outline-none focus:border-secondary/70 focus:bg-white/5
        transition-all duration-200"
    />
  );
}

// Reusable password input with eye toggle
export function AuthPasswordInput({ placeholder, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3.5 pr-11
          text-white placeholder-white/40 font-body text-sm
          focus:outline-none focus:border-secondary/70 focus:bg-white/5
          transition-all duration-200"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute transition-colors -translate-y-1/2 right-3 top-1/2 text-white/30 hover:text-white/70"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? (
          <EyeOff size={18} className="cursor-pointer" />
        ) : (
          <Eye size={18} className="cursor-pointer" />
        )}
      </button>
    </div>
  );
}

// Reusable gradient button
export function AuthButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 rounded-lg font-heading font-bold text-white text-base
        tracking-wide transition-all duration-200 active:scale-[0.98] cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
      style={{
        background:
          "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 40%, #DB1F2ECC 100%)",
      }}
    >
      {children}
    </button>
  );
}

// Auth layout wrapper
export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="h-screen bg-[#0f0f0f] flex ">
      {/* ── Desktop: left image panel ── */}
      <div className="relative hidden w-1/2 overflow-hidden md:block">
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, transparent 40%, #0f0f0f 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0f0f0f 0%, transparent 25%, transparent 75%, #0f0f0f 100%)",
          }}
        />
        <div className="absolute z-10 bottom-10 left-10  ">
          <Link
            to="/"
            className="text-sm transition-colors text-white/30 font-brand hover:text-white/60"
          >
            ← Back to Synrec
          </Link>
        </div>
      </div>

      {/* ── Mobile: top image strip ── */}
      <div className="absolute top-0 left-0 right-0 h-48 overflow-hidden md:hidden">
        <img
          src={bgImage}
          alt=""
          className="object-cover object-top w-full h-full"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 30%, #0f0f0f 100%)",
          }}
        />
      </div>

      {/* ── Form panel ── */}
      <div className="relative flex flex-col justify-center w-full px-8 pb-12 md:w-1/2 md:px-16 lg:px-24 pt-52 md:pt-10">
        <Link
          to="/"
          className="absolute z-10 text-xs transition-colors md:hidden top-6 left-6 text-white/40 font-body hover:text-white/70"
        >
          ← Synrec
        </Link>
        <div className="w-full max-w-sm mx-auto md:mx-0 ">
          <h1 className="mb-2 text-3xl font-bold text-white font-heading md:text-4xl">
            {title}
          </h1>
          <p className="mb-8 text-sm font-body text-white/40">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
