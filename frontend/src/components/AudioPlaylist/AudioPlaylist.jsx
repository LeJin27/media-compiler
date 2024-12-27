import {useContext} from 'react'
import AudioPlayerContext from '../context/AudioPlayerContext';
import './AudioPlaylist.css';


let AudioPlaylist = () => {

    const {songsList, currentSongId, setCurrentSongId} = useContext(AudioPlayerContext)


    return (
        <div className='flex-col'>
            <div>{currentSongId}</div>

            <div className='scroll-div '>

                <div className='flex-col'>
                    {

                        songsList.map((song, i) =>
                            <div className="m-5 flex">
                                <div className='persona-box-skew'>
                                    <div
                                        className="persona-box"
                                        key={i}
                                        onClick={() => setCurrentSongId(i)}>{song.spotify_name}
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