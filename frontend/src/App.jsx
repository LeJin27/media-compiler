
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PageLogin from "./pages/PageLogin";
import PagePlaylist from "./pages/PagePlaylist";
import RouterHeader from "./components/RouteHeader";


const App = () => (
  <div style={{ textAlign: "center" }}>
    <RouterHeader />
    <Routes>
      <Route path="/" element={<div>Welcome to the Home page</div>} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/playlist" element={<PagePlaylist />} />
    </Routes>
  </div>
);

export default App;