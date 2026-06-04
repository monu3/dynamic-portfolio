import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminCredentials } from "../../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.sessionStorage.getItem("adminCredentials");
      if (stored) {
        navigate("/admin/dashboard");
      }
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    setAdminCredentials(username, password);
    navigate("/admin/dashboard");
  };

  return (
    <div className="admin-page admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p>Use your admin credentials to access the portfolio editor.</p>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
