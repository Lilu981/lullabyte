import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = [
    { id: 1, username: "admin", password: "admin123", role: "admin", name: "Admin" },
    { id: 2, username: "utente", password: "utente123", role: "user", name: "Genitore" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim()) {
      setError("Inserisci il nome utente");
      return;
    }
    if (!form.password.trim()) {
      setError("Inserisci la password");
      return;
    }
    const found = users.find((u) => u.username === form.username && u.password === form.password);
    if (!found) {
      setError("Credenziali non corrette");
      return;
    }
    dispatch(login(found));
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <span className="login-emoji">🌸</span>
          <h1>Bentornato su LullaByte</h1>
          <p>Accedi per salvare le tue canzoni preferite</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Nome utente</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="es. utente" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn-primary btn-full">
            Accedi
          </button>
        </form>
        <div className="login-hint">
          <p>
            🔑 <strong>utente</strong> / utente123
          </p>
          <p>
            🔑 <strong>admin</strong> / admin123
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
