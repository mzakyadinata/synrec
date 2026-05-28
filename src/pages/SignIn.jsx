import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout, {
  AuthInput,
  AuthPasswordInput,
  AuthButton,
} from "../components/AuthLayout";
import { loginUser } from "../services/authApi";
import { useAuth } from "../context/useAuth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      login(data); // saves token + user via AuthContext
      navigate("/pick-favorites");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Let AI find your next favorite movie."
    >
      <div className="flex flex-col gap-4">
        <AuthInput
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthPasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-[#ff3d3d] font-body text-xs">{error}</p>}

        <AuthButton onClick={handleLogin} disabled={loading}>
          {loading ? "Signing In..." : "Login"}
        </AuthButton>

        <p className="text-center text-white/40 font-body text-sm">
          <Link
            to="/forgot-password"
            className="text-white/60 hover:text-white transition-colors"
          >
            Forgot Your Password?
          </Link>
        </p>
      </div>

      <p className="text-center text-white/30 font-body text-sm mt-16">
        Haven't signed up yet?{" "}
        <Link
          to="/signup"
          className="text-[#ff3d3d] font-medium hover:brightness-125 transition-all"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
