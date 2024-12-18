import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Axios } from 'axios'
import { readSongs } from './services/RestApi'



function App() {
const [songsInPlaylist, setSongsInPlaylist] = useState([]);

  const handleReadSongs = async(query) => {
    const fetchedLists = await readSongs(query);
    setSongsInPlaylist(fetchedLists)
  }

  useEffect(() => {
    handleReadSongs()
  }, []); 

  return (
      <div className='flex-col'>
        {songsInPlaylist.map(song => <h2 className = "bg-slate-400 m-1"
        key = {song.spotify_name}>{song.youtube_path}</h2>)}

        <button onClick={()=>{}}/>
        

      </div>
  )
  
}

export default App;
