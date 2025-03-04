"use client"
import { useState } from "react";
import { useAuthContext } from "../auth/authProvider";


const LoginPage = () => {
  const { handleLogin } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();
    const response = await handleLogin(email, password);
    if (!response.success) {
      setError(response.errors?.[0]?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submitLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;