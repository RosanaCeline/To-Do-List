import { signInWithEmailAndPassword, signInWithCustomToken, signOut } from "firebase/auth";
import { auth } from "./firebase";

const API_URL = "http://localhost:8080/auth";

// Cadastro via backend
export async function register(email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  // Login automático com Custom Token recebido do backend
  if (data.customToken) {
    const userCredential = await signInWithCustomToken(auth, data.customToken);
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    localStorage.setItem("idToken", idToken);
  }

  return data;
}

export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const idToken = await user.getIdToken();
  localStorage.setItem("idToken", idToken);

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { Authorization: `Bearer ${idToken}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}
