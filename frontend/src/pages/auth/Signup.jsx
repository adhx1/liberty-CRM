import { useState } from "react";
import { signup } from "../../api/auth";
import "./Auth.css";
import { Link } from "react-router-dom";


const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert("Signup successful. Please login.");
      window.location.href = "/login";
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Signup</button>
      </form>

      <p className="auth-switch">
  Already have an account? <Link to="/login">Login</Link>
</p>
    </div>
  );
};

export default Signup;