


import { useContext, useEffect, useState} from 'react';
import AudioPlayerState from '../components/context/AudioPlayerState';
import AudioPlayerContext from '../components/context/AudioPlayerContext';
import { Link } from 'react-router-dom';
import ImageCard from '../components/card/ImageCard';
import art from '../assets/Artwork.png';
import { readThumbnail } from '../services/RestApi';





const PagePlaylistGroup = ({}) => {
    const {playlists, setSongsList, setCurrentPlaylist, currentPlaylist} = useContext(AudioPlayerContext)

    const handleFilterPlaylist = (e) => {
        console.log(e)
        setCurrentPlaylist(e)
        setSongsList(e)

    }




    return (
        <div >
            {currentPlaylist}
            <div></div>


            <AudioPlayerState>
                <div className='flex justify-between'>
                    <div className='spacer'></div>
                
                    
                <div className='flex outline-4 flex-col items-center'>

                    <h1 className='text-2xl font-bold'>Spotify Playlists</h1>
                    <div className='flex relative gap-3 flex-wrap rounded-xl bg-[#0f0f0f] p-5'>
                        {
                            playlists.map((playlist, i) =>
                                <Link to="/songs" className=" w-[150px] h-[200px] relative flex items-end justify-center" onClick={(e) => handleFilterPlaylist(playlist)}>

                                    <ImageCard imgSrc={art}>
                                        <h3>{playlist}</h3>

                                    </ImageCard>
                                
                                </Link>
                            )
                        }
                    </div>
                </div>

                    <div className = "spacer"></div>
                </div>
            </AudioPlayerState>
        </div>
    );
};

export default PagePlaylistGroup;