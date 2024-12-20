import React from "react";
import { Link } from "react-router-dom";

const RouterHeader = () => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "green" }}>GeeksForGeeks</h1>
        <p>We are learning routes in Vite project</p>
        <nav>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/playlist">Playlist</Link>
            </li>
          </ul>
        </nav>
      </div>{" "}
    </div>
  );
};

export default RouterHeader;