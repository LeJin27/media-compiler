


import { useContext, useEffect, useState} from 'react';
import AudioPlayerState from '../components/context/AudioPlayerState';
import AudioPlayerContext from '../components/context/AudioPlayerContext';
import { Link } from 'react-router-dom';





const PagePlaylistGroup = ({}) => {
    const {playlists, setSongsList, setCurrentPlaylist, currentPlaylist} = useContext(AudioPlayerContext)

    const handleFilterPlaylist = (e) => {
        console.log(e)
        setCurrentPlaylist(e)
        setSongsList(e)
    }





    return (
        <div>
            {currentPlaylist}
            <AudioPlayerState>
                <div className='flex-col relative gap-3 flex rounded-xl'>
                    {
                        playlists.map((playlist, i) =>
                            <div className="bg-white" onClick={(e) => handleFilterPlaylist(playlist)}>{playlist}</div>
                        )
                    }
                </div>
            </AudioPlayerState>
        </div>
    );
};

export default PagePlaylistGroup;