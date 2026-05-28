import { createContext, useState } from "react";

export const AuthContext = createContext(null);

// Read and validate token from localStorage at initial render
// This runs once synchronously — no useEffect needed
function getInitialAuth() {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const savedAt = localStorage.getItem("token_saved_at");

    if (!token || !user || !savedAt) return { token: null, user: null };

    const elapsed = Date.now() - parseInt(savedAt, 10);
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    if (elapsed >= ONE_DAY_MS) {
      // Expired — clear immediately
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("token_saved_at");
      return { token: null, user: null };
    }

    return { token, user: JSON.parse(user) };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const initialAuth = getInitialAuth();
  const [token, setToken] = useState(initialAuth.token);
  const [user, setUser] = useState(initialAuth.user);

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token_saved_at");
    setToken(null);
    setUser(null);
  };

  const login = (data) => {
    // data = { token, user }
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token_saved_at", Date.now().toString());
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    clearAuth();
  };

  const isLoggedIn = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
