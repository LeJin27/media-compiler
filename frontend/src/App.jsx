
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PageLogin from "./pages/PageLogin";
import PagePlaylist from "./pages/PagePlaylist";
import RouterHeader from "./components/RouteHeader";
import styles from './App.module.css';
import PagePlaylistGroup from "./pages/PagePlaylistGroup";
import AudioPlayerState from "./components/context/AudioPlayerState";
import AudioControls from "./components/AudioControls/AudioControls";


const App = () => (
  <div className="flex-col flex ">
    <RouterHeader />
    <AudioPlayerState>

        <Routes>
          <Route path="/" element={<div>Welcome to the Home page</div>} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/playlist" element={<PagePlaylist />} />
          <Route path="/playlistgroup" element={<PagePlaylistGroup />} />
        </Routes>
    </AudioPlayerState>
  </div>
);

export default App;