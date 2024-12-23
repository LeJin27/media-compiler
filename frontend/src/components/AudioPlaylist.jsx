import {useContext} from 'react'
import AudioPlayerContext from './context/AudioPlayerContext';





let AudioPlaylist = () => {

    const {songsList, currentSong, setCurrentSong} = useContext(AudioPlayerContext)



    return (
        <div>
            <div>{currentSong}</div>
            {

                songsList.map((song, i) =>
                    <li key = {i} onClick={() => setCurrentSong(i)}>{song.youtube_file_name}</li>
                )
            }
        </div>

    );
};


export default AudioPlaylist;