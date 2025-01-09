import React from "react";
import { Link } from "react-router-dom";

const RouterHeader = () => {
  return (
    <div className="bg-_header-bar">
        <h1 >Test</h1>
        <div className="flex-col flex">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/songs">Songs</Link>
          <Link to="/playlists">Playlists</Link>
      </div>
    </div>
  );
};

export default RouterHeader;