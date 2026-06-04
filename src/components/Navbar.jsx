import {
  Menu,
  Home,
  Info,
  Sparkles,
  // Search,
  Heart,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import ConfirmDialog from "./ConfirmDialog";

const guestLinks = [
  { icon: Home, label: "Home", scrollId: null, path: null },
  { icon: Info, label: "About", scrollId: "about", path: null },
  { icon: Sparkles, label: "Features", scrollId: "features", path: null },
];

const authLinks = [
  { icon: Home, label: "Home", scrollId: null, path: "/" },
  // { icon: Search, label: "Search", scrollId: null, path: "/search" },
  { icon: Heart, label: "Favorites", scrollId: null, path: "/favorites" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
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

  // Show confirmation dialog instead of logging out immediately
  const handleLogoutClick = () => {
    setShowSidebar(false);
    setShowLogoutConfirm(true);
  };

  // Called when user confirms logout
  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
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
            src="/brand-logo.svg"
            alt="Synrec Logo"
            className="ml-2 cursor-pointer w-35"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop: nav links */}
        <ul className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleNavClick(link)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer
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
        <div className="flex items-center gap-2 mr-3">
          {isLoggedIn ? (
            <>
              {/* Desktop */}
              <button
                onClick={handleLogoutClick}
                className="
        hidden md:flex items-center gap-3
        px-3 py-2 rounded-full
        border border-white/10
        bg-white/2
        hover:bg-white/6
        hover:border-red-500/30
        transition-all duration-200
      "
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-col items-start">
                  <span className="text-white/80 text-sm font-medium leading-none">
                    {user?.username}
                  </span>
                  <span className="text-white/40 text-[11px]">Logout</span>
                </div>

                <LogOut size={15} className="text-white/40" />
              </button>

              {/* Mobile */}
              <div
                className="
        flex md:hidden items-center gap-2
        px-2 py-1 rounded-full
      "
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>

                <span className="text-white/80 text-sm font-medium max-w-[90px] truncate">
                  {user?.username}
                </span>
              </div>
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
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/60
                hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm"
            >
              <LogOut size={18} className="text-white/40" />
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Logout confirmation dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Log out?"
        message="You'll need to sign in again to access your recommendations and favorites."
        confirmLabel="Log Out"
        cancelLabel="Stay"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}
