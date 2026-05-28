import { useAuth } from "../context/useAuth";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

export default function Home() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Dashboard /> : <LandingPage />;
}
