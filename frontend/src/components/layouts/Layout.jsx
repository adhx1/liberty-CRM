import { useState } from "react";
import Sidebar from "./sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

  {isOpen && (
        <div
          className="overlay"
          onClick={() => setIsOpen(false)}
        />
      )}


      <div className="main-content">
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {children}
      </div>
    </div>
  );
};

export default Layout;