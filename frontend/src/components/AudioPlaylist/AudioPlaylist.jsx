import {useContext, useState, useEffect} from 'react'
import AudioPlayerContext from '../context/AudioPlayerContext';
import styles from './AudioPlaylist.module.css';
import { FiSpeaker } from "react-icons/fi";
import art from '../../assets/Artwork.png';
import { deleteSong, readThumbnail } from '../../services/RestApi';
import ContextMenu from './ContextMenu';
import { createPortal } from 'react-dom';


let AudioPlaylist = ({}) => {

    const {setSongsList,currentPlaylist, songsList, currentSongId, setCurrentSongId} = useContext(AudioPlayerContext)



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




    
    const [menuVisible, setMenuVisible]  = useState(false)
    const [menuPosition, setMenuPosition]  = useState({x: 0, y: 0})
    const [menuItems, setMenuItems] = useState([
        { label: 'Remove from this playlist'},
        { label: 'Option 2', action: () => console.log('Option 2 selected') },
    ]);

    const handleMenuSong = async(song) => {
        await deleteSong({"spotify_key" : song.spotify_key})
        setSongsList(songsList.filter(eachSong => eachSong.spotify_key !== song.spotify_key))
    }

    const handleContextMenu = (event, song) => {
        event.preventDefault();
        setMenuPosition({x: event.pageX, y: event.pageY});
        setMenuVisible(true)
        setMenuItems(prevMenuItems => prevMenuItems.map(item => {
            if (item.label === 'Remove from this playlist') {
                return {
                    ...item,
                    action: () => handleMenuSong(song)  // Update the action with the correct song
                };
            }
            return item; // Leave other items unchanged
        }));


    };

    const handleClick = () => {
        if (menuVisible) setMenuVisible(false);
    };




    return (
        <div className='relative flex-1' onClick={handleClick}>
            <div className='flex items-center'>

                <div className={`ml-[0.5rem] ${styles.playlistheader}`}>{currentPlaylist}</div>

            </div>





            <div className="flex flex-col h-screen">
                <div className='flex gap-5 m-2 justify-between'>
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
                                            onClick={() => setCurrentSongId(i)
                                            }
                                            onContextMenu={(event) => handleContextMenu(event, song)}
                                            className='flex flex-grow '
                                        >


                                            <div className={`${styles.personabox} flex justify-between flex-grow-1`}>
                                                <div className='flex gap-2 items-center'>
                                                    <img alt=" " src={song.spotify_thumbnail} className="h-8 w-8" />
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

            {menuVisible && createPortal(<ContextMenu items={menuItems} position={menuPosition} />, document.getElementById("root"))}
        </div>

    );
};


export default AudioPlaylist;