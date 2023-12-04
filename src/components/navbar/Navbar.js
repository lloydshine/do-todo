import { useState } from "react";
import "./navbar.css";

import { FaCaretDown } from "react-icons/fa";

export default function Navbar({ user, logout }) {
  const [clicked, setClicked] = useState(false);

  return (
    <nav className="navbar">
      <h2>Tasklify</h2>
      <div>
        <div
          className="nav-prof"
          onClick={() => setClicked(!clicked)}
          style={{ color: clicked ? "red" : "white" }}
        >
          <p>{user.email}</p>
          <FaCaretDown size={18} />
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
