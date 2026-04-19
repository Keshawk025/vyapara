import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/");
    } catch (issue) {
      setError(issue.response?.data?.email?.[0] || "Unable to register.");
    }
  }

  return (
    <form className="glass-panel mx-auto grid max-w-md gap-4 rounded-[30px] p-6 shadow-soft" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-semibold text-white">Create Account</h1>
      <input className="h-12 rounded-full border border-white/10 bg-white/[0.04] px-4 text-white outline-none focus:border-cyan-300/40" placeholder="Username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
      <input className="h-12 rounded-full border border-white/10 bg-white/[0.04] px-4 text-white outline-none focus:border-cyan-300/40" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
      <input className="h-12 rounded-full border border-white/10 bg-white/[0.04] px-4 text-white outline-none focus:border-cyan-300/40" placeholder="First Name" value={form.first_name} onChange={(event) => setForm({ ...form, first_name: event.target.value })} />
      <input className="h-12 rounded-full border border-white/10 bg-white/[0.04] px-4 text-white outline-none focus:border-cyan-300/40" placeholder="Last Name" value={form.last_name} onChange={(event) => setForm({ ...form, last_name: event.target.value })} />
      <input className="h-12 rounded-full border border-white/10 bg-white/[0.04] px-4 text-white outline-none focus:border-cyan-300/40" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
      <button className="premium-button" type="submit">Register</button>
      {error && <div className="glass-panel rounded-[20px] px-4 py-3 text-sm text-rose-300">{error}</div>}
    </form>
  );
}

export default RegisterPage;
