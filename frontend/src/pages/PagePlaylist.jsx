

import { useEffect, useState} from 'react';
import AudioPlayerMain from '../components/AudioPlayerMain.jsx';
import styles from './PagePlaylist.module.css';





const PagePlaylist = () => {
    const [mousePosition, setMousePosition] = useState({
        left: 0,
        top: 0
    })
    function handleMouseMove(e) { setMousePosition({left: e.pageX, top: e.pageY}); }





    return (
        <div onMouseMove={(e) => handleMouseMove(e)}>

            <div className='flex-col relative'>

                <AudioPlayerMain />



            </div>
        </div>
    );
};

export default PagePlaylist;