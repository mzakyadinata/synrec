import {
  Menu,
  Home,
  Info,
  Sparkles,
  Search,
  Heart,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import logo from "../assets/logos/logo-brand.svg";

const guestLinks = [
  { icon: Home, label: "Home", scrollId: null, path: null },
  { icon: Info, label: "About", scrollId: "about", path: null },
  { icon: Sparkles, label: "Features", scrollId: "features", path: null },
];

const authLinks = [
  { icon: Home, label: "Home", scrollId: null, path: "/" },
  { icon: Search, label: "Search", scrollId: null, path: "/search" },
  { icon: Heart, label: "Favorites", scrollId: null, path: "/favorites" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const headerRef = useRef(null);
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = isLoggedIn ? authLinks : guestLinks;

  useEffect(() => {
    const handleScroll = () =>
      setScrolled(window.scrollY > window.innerHeight / 4);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSidebar]);

  const handleNavClick = ({ scrollId, path }) => {
    setShowSidebar(false);

    if (path) {
      navigate(path);
      return;
    }

    // Scroll behavior for guest links
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!scrollId) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(scrollId);
          const header = headerRef.current;
          if (el) {
            const headerHeight = header
              ? header.getBoundingClientRect().height
              : 60;
            const top =
              el.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      });
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActiveLink = (path) => path && location.pathname === path;

  return (
    <>
      <header
        ref={headerRef}
        className={`${
          scrolled ? "bg-black" : "bg-[#0f0f0f]/80"
        } w-screen h-15 z-50 fixed top-0 left-0 border-b border-gray-800 flex items-center px-4 transition-colors duration-300`}
      >
        {/* Left: burger (mobile) + logo */}
        <div className="flex items-center gap-1 mr-4">
          <button
            onClick={() => setShowSidebar((prev) => !prev)}
            className="md:hidden text-white cursor-pointer p-1 rounded hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
          <div className="md:hidden w-px h-9 bg-gray-300/50" />
          <img
            src={logo}
            alt="Neuroflix Logo"
            className="ml-2 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop: nav links */}
        <ul className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNavClick(link)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                  ${
                    isActiveLink(link.path)
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: auth */}
        <div className="flex items-center gap-2  mr-3">
          {isLoggedIn ? (
            <>
              <span className="hidden md:block text-white/40 font-body text-xs mr-1">
                {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white/70 text-sm
                  border border-white/15 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                <LogOut size={15} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="px-5 py-2 rounded-full font-semibold text-white text-sm tracking-wide
                transition-all duration-200 active:scale-95 hover:brightness-110"
              style={{
                background:
                  "linear-gradient(to right, #DB1F2ECC 0%, #FF3D3D 29%, #FF3D3DE6 68%, #DB1F2ECC 100%)",
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setShowSidebar(false)}
        className={`md:hidden fixed top-15 left-0 right-0 bottom-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          showSidebar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <nav
        className={`md:hidden fixed top-15 left-0 bottom-0 w-64 z-50 flex flex-col justify-between py-6
          bg-[#0f0f0f]/95 backdrop-blur-md border-r border-white/10
          transition-transform duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="flex flex-col gap-1 px-3">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNavClick(link)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm
                  ${
                    isActiveLink(link.path)
                      ? "text-white bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                <link.icon size={18} className="text-white/60" />
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {isLoggedIn && (
          <div className="px-5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/60
                hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm"
            >
              <LogOut size={18} className="text-white/40" />
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
