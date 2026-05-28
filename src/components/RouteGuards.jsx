import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// Shows a blank screen while checking auth — prevents flash
function AuthLoading() {
  return <div className="min-h-screen bg-[#0f0f0f]" />;
}

// ProtectedRoute — redirects to / if not logged in
export function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <AuthLoading />;
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
}

// GuestRoute — redirects to / if already logged in (for /signin, /signup)
export function GuestRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <AuthLoading />;
  if (isLoggedIn) return <Navigate to="/" replace />;
  return children;
}
