import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/");
    } catch {
      setError("Invalid username or password.");
    }
  }

  return (
    <form className="glass-panel mx-auto grid max-w-md gap-4 rounded-[30px] p-6 shadow-soft" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-semibold text-white">Login</h1>
      <input className="h-12 rounded-full border border-white/10 bg-white/[0.04] px-4 text-white outline-none focus:border-cyan-300/40" placeholder="Username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
      <input className="h-12 rounded-full border border-white/10 bg-white/[0.04] px-4 text-white outline-none focus:border-cyan-300/40" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
      <button className="premium-button" type="submit">Login</button>
      {error && <div className="glass-panel rounded-[20px] px-4 py-3 text-sm text-rose-300">{error}</div>}
      <p className="text-sm text-slate-400">No account yet? <Link className="text-white" to="/register">Register</Link></p>
    </form>
  );
}

export default LoginPage;
