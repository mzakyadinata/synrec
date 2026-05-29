// Base URL — change this to your production URL when deploying
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Register new user
// POST /auth/register
// Body: { username, fullname, email, password }
export async function registerUser({ username, fullname, email, password }) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, fullname, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  return data; // { message, user: { id, username, fullname, email } }
}

// Login user
// POST /auth/login
// Body: { email, password }
export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data; // { message, token, user: { id, username, fullname, email } }
}
