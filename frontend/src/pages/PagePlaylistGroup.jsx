


import { useContext, useEffect, useState} from 'react';
import AudioPlayerState from '../components/context/AudioPlayerState';
import AudioPlayerContext from '../components/context/AudioPlayerContext';
import { Link } from 'react-router-dom';
import ImageCard from '../components/card/ImageCard';
import art from '../assets/Artwork.png';
import { readThumbnail } from '../services/RestApi';
import AudioControls from '../components/AudioControls/AudioControls';





const PagePlaylistGroup = ({}) => {
    const {playlists, setSongsListGivenPlaylist: setSongsListGivenPlaylist, setCurrentPlaylist, currentPlaylist, setPlaylistFromDB} = useContext(AudioPlayerContext)

    const handleFilterPlaylist = (e) => {
        console.log(e)
        setCurrentPlaylist(e)
        setSongsListGivenPlaylist(e)

    }
    useEffect(() => {
        setPlaylistFromDB()
    }, []); 

    return (
        <div >
            {currentPlaylist}
            <div></div>


                <div className='flex justify-between'>
                    <div className='spacer'></div>
                
                    
                <div className='flex outline-4 flex-col items-center'>

                    <h1 className='text-2xl font-bold'>Spotify Playlists</h1>
                    <div className='flex relative gap-3 flex-wrap rounded-xl bg-[#0f0f0f] p-5'>
                        {
                            playlists.map((playlist, i) =>
                                <Link key = {i} to="/songs" className=" w-[150px] h-[200px] relative flex items-end justify-center" onClick={(e) => handleFilterPlaylist(playlist)}>

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
                <AudioControls/>
        </div>
    );
};

export default PagePlaylistGroup;