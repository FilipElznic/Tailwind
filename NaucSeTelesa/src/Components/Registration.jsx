import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./Registration.css"; // Custom CSS for additional styling

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(true); // Toggle between register and login

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert("Check your email for the confirmation link!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      alert("Logged in successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center">
      <div className="auth-box text-center">
        <h2 className="text-light mb-4">
          {isRegistering ? "Register" : "Login"}
        </h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <input
            type="email"
            className="form-control mb-3 custom-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3 custom-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary btn-lg w-100">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        {error && <p className="text-danger mt-3">{error}</p>}
        <p className="text-light mt-4">
          {isRegistering
            ? "Already have an account?"
            : "Don’t have an account?"}{" "}
          <button
            className="toggle-button text-info"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Registration;
