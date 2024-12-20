

import { useEffect, useState } from 'react'
import {readSongs} from '../services/RestApi.jsx'
import AudioPlayer from '../components/AudioPlayer.jsx';



const Playlist = () => {
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
        <AudioPlayer/>
        {songsInPlaylist.map(song => 
          <h2 className = "bg-slate-400 m-1" key = {song.spotify_key}>
            {song.youtube_file_name}
          </h2>
        )}

        

      </div>
  );
};

export default Playlist;