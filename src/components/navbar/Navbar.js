import { useState, useEffect } from "react";
import "./navbar.css";

import { FaCaretDown, FaUser, FaMoon, FaSun } from "react-icons/fa";

export default function Navbar({ user, logout }) {
  const [clicked, setClicked] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="/logo.png" alt="logo" />
        <h2>Tasklify</h2>
      </div>
      <div>
        <div className="nav-prof">
          <FaUser size={18} />
          <p>{user.email}</p>
          <FaCaretDown size={18} onClick={() => setClicked(!clicked)} />
          <div onClick={() => setIsDark(!isDark)}>
            {isDark ? <FaMoon size={15} /> : <FaSun size={15} />}
          </div>
        </div>
        <div
          className="nav-drop"
          style={{ maxHeight: clicked ? "10rem" : "0px" }}
        >
          <p onClick={logout}>Logout</p>
        </div>
      </div>
    </nav>
  );
}
