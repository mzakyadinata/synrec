import { Routes, Route } from "react-router-dom";
import { GuestRoute, ProtectedRoute } from "../components/RouteGuards";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PickFavorites from "../pages/PickFavorites";
import RecommendationsPage from "../pages/RecommendationsPage";
import FavoritesPage from "../pages/FavoritesPage";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* / → LandingPage if guest, Dashboard if logged in */}
      <Route path="/" element={<Home />} />

      {/* Guest-only */}
      <Route
        path="/signin"
        element={
          <GuestRoute>
            <SignIn />
          </GuestRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute>
            <SignUp />
          </GuestRoute>
        }
      />

      {/* Protected — must be logged in */}
      <Route
        path="/pick-favorites"
        element={
          <ProtectedRoute>
            <PickFavorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <RecommendationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
