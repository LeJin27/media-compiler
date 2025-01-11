import {useContext, useState, useEffect} from 'react'
import AudioPlayerContext from '../context/AudioPlayerContext';
import styles from './AudioPlaylist.module.css';
import { FiSpeaker } from "react-icons/fi";
import art from '../../assets/Artwork.png';
import { readThumbnail } from '../../services/RestApi';


let AudioPlaylist = ({}) => {

    const {currentPlaylist, songsList, currentSongId, setCurrentSongId} = useContext(AudioPlayerContext)

    const helperFormatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}`: `${seconds}`
        const returnedTime = `${returnedMinutes} : ${returnedSeconds}`;
        return returnedTime
    }

    {/*
    const handleReadThumbnail = async(spotify_thumbnail) => {
        const test = readThumbnail(spotify_thumbnail)
        console.log(test)
    }

    useEffect(() => {
        if (songsList[0]) {
            const thumbnail = ((songsList[0]).spotify_thumbnail)
            handleReadThumbnail(thumbnail)
        }
    })
    */}




    return (
        <div>
            <div className='flex items-center'>

                <div className = {`ml-[0.5rem] ${styles.playlistheader}`}>{currentPlaylist}</div>

            </div>

            <div className = "flex flex-col h-screen">
                <div className='flex gap-5 m-2 '>
                    <div>Title</div>
                    <div>Duration</div>
                </div>

                <hr
                    className=" h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"
                />

                <div className={`${styles.scrolldiv} `}>
                    <div className='flex-col flex '>

                        <div className='flex-col'>
                            {

                                songsList.map((song, i) =>
                                    <div key={i} className={`m-2 flex `}>
                                        <div
                                            onClick={() => setCurrentSongId(i)}
                                        >
                                            <div className={`${styles.personabox} flex justify-between`}>

                                                <div className='flex gap-2 items-center'>
                                                    <img alt=" " src={art} className="h-8 w-8" />
                                                    {song.spotify_name}

                                                </div>


                                                <div>{helperFormatTime(song.youtube_length)}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>


                        <div className='min-h-10'></div>

                    </div>
                </div>
            </div>
        </div>

    );
};


export default AudioPlaylist;