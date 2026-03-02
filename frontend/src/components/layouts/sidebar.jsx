import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./sidebar.css";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo">Liberty Office Service</div>
      <button
  className="close-btn"
  onClick={() => setIsOpen(false)}
>
  ✕
</button>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/customers">Customer</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/payments">Payments</NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;