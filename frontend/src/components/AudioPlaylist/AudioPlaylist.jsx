import {useContext} from 'react'
import AudioPlayerContext from '../context/AudioPlayerContext';
import styles from './AudioPlaylist.module.css';


let AudioPlaylist = () => {

    const {songsList, currentSongId, setCurrentSongId} = useContext(AudioPlayerContext)

    const helperFormatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}`: `${seconds}`
        const returnedTime = `${returnedMinutes} : ${returnedSeconds}`;
        return returnedTime
    }


    return (
        <div className='flex-col '>
            <div>{currentSongId}</div>

            <div className={`${styles.scrolldiv}`}>

                <div className='flex-col'>
                    {
                        songsList.map((song, i) =>
                            <div className="m-5 flex">
                                <div className={`${styles.personaboxskew}`}>
                                    <div className={`${styles.personabox} flex justify-between`}>
                                        <div
                                            key={i}
                                            onClick={() => setCurrentSongId(i)}
                                        >
                                            {song.spotify_name}
                                        </div>
                                        <div>{helperFormatTime(song.youtube_length)}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    );
};


export default AudioPlaylist;