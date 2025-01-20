import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMdSearch, IoMdRefresh  } from "react-icons/io";

import styles from './RouteHeader.module.css'
import { createPlayList } from "../services/RestApi";


const RouterHeader = () => {
  const [userInputUrl, setUserInputUrl]  = useState('')

  const handleCreatePlaylist = async(youtube_url) => {
    const message = await createPlayList(youtube_url)
    console.log(message)
  }




  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreatePlaylist(userInputUrl)
      setUserInputUrl('')
    }
  }

  const handleDropDown = (e) => {
    console.log(e)
  }

  return (
    <div className="bg-_header-bar p-10">
        <div className="flex gap-5 items-center">


        <div className="relative flex h-[3rem]">
          <input
            className="bg-transparent border-4 border-[#3ECAFF] rounded-3xl text-xl text-white flex pl-9 pr-9 relative outline-none"
            type="text" placeholder = "spotify playlist url..."value={userInputUrl} onChange={(e) => setUserInputUrl(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          >

          </input>
          <IoMdSearch className = "absolute m-0 -translate-y-[-50%] ml-3" size={25} color="#ffffff"/>
          <IoMdRefresh onClick = {handleDropDown} className = "absolute m-0 -translate-y-[-50%] mr-3 right-0" size={25} color="#ffffff"/>
        </div>


        <Link className = {styles.text_animation} to="/">Home</Link>
        <Link className = {styles.text_animation} to="/songs">Songs</Link>
        <Link className = {styles.text_animation} to="/playlists">Playlists</Link>
        <div className = {styles.text_animation}>Youtube</div>



      </div>
    </div>
  );
};

export default RouterHeader;