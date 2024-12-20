//import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
//import { Axios } from 'axios'
//import { readSongs } from './services/RestApi'
//
//
//
//function App() {
//const [songsInPlaylist, setSongsInPlaylist] = useState([]);
//
//  const handleReadSongs = async(query) => {
//    const fetchedLists = await readSongs(query);
//    setSongsInPlaylist(fetchedLists)
//  }
//
//  useEffect(() => {
//    handleReadSongs()
//  }, []); 
//
//  return (
//      <div className='flex-col'>
//        {songsInPlaylist.map(song => <h2 className = "bg-slate-400 m-1"
//        key = {song.spotify_name}>{song.youtube_path}</h2>)}
//
//        <button onClick={()=>{}}/>
//        
//
//      </div>
//  )
//  
//}
//
//export default App;

import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Playlist from "./pages/Playlist";
import Header from "./components/Header";


const App = () => (
  <div style={{ textAlign: "center" }}>
    <Header />
    <Routes>
      <Route path="/" element={<div>Welcome to the Home page</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/playlist" element={<Playlist />} />
    </Routes>
  </div>
);

export default App;