

import { useEffect, useState} from 'react';
import AudioPlayerMain from '../components/AudioPlayerMain.jsx';
import styles from './PagePlaylist.module.css';





const PagePlaylist = () => {




    return (

        <div className='flex-col relative'>
            <AudioPlayerMain />
        </div>
    );
};

export default PagePlaylist;