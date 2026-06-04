import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout, {
  AuthInput,
  AuthPasswordInput,
  AuthButton,
} from "../components/AuthLayout";
import SignUpSuccess from "../components/SignUpSuccess";
import { registerUser } from "../services/authApi";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");

    // Client-side validation
    if (!username || !fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        username,
        fullname: fullName,
        email,
        password,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {success && <SignUpSuccess name={fullName} />}

      <AuthLayout
        title="Create Your Account"
        subtitle="Let AI recommend your next favorite movie."
      >
        <div className="flex flex-col gap-4">
          <AuthInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <AuthInput
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <AuthPasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-xs text-secondary font-body">{error}</p>}

          <AuthButton onClick={handleSignUp} disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </AuthButton>
        </div>

        <p className="mt-5 text-sm text-center text-white/30 font-body">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium transition-all text-secondary hover:brightness-125"
          >
            Sign In
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
