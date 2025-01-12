
import React, {useRef, useState, useEffect, useContext} from 'react'
import AudioPlayerContext from '../context/AudioPlayerContext'
import { readMusic } from '../../services/RestApi'
import styles from './AudioControls.module.css';
import { BiSkipNext,BiSkipPrevious,BiPlayCircle,BiPauseCircle } from "react-icons/bi";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import WaveForm from './Waveform';


const AudioControls = ()  => {
    const audioPlayerContext = useContext(AudioPlayerContext);
    const {setPlayingStatus, songsList, currentSongId, setCurrentSongId, songIsPlaying, nextSong, prevSong} = audioPlayerContext

    const [stateVolume, setStateVolume] = useState(0.3)
    const [stateAudioSource, setStateAudioSource] = useState(null); 
    const [stateDuration, setStateDuration] = useState(0)
    const [stateCurrentTime, setStateCurrentTime] = useState(0);

    const audioRef = useRef(null) 
    const progressBarRef = useRef(); // refernce to progress bar
    const animationRef = useRef(); // reference animation


    const [analyzerData, setAnalyzerData] = useState(null);
    const audioAnalyzer = () => {
        // create a new AudioContext
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // create an analyzer node with a buffer size of 2048
        const analyzer = audioCtx.createAnalyser();
        analyzer.fftSize = 2048;

        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const source = audioCtx.createMediaElementSource(audioRef.current);
        source.connect(analyzer);
        source.connect(audioCtx.destination);
        source.onended = () => {
            source.disconnect();
        };

        // set the analyzerData state with the analyzer, bufferLength, and dataArray
        setAnalyzerData({ analyzer, bufferLength, dataArray });
    };



    const handleVolume = (q) => {
        setStateVolume(q)
        audioRef.current.volume = q
    }

    const handlePrevSong = () => {
        prevSong()
    }

    const handleNextSong = () => {
        nextSong()
    }

    const handleToggleAudio = () => {
        if (songIsPlaying) {
            audioRef.current.pause();
            cancelAnimationFrame(animationRef.current)
            setPlayingStatus(false)
        } else {
            audioRef.current.play();
            // progress bar shenanigans
            animationRef.current = requestAnimationFrame(helperWhilePlaying)
            setPlayingStatus(true)
        }
    }


    // sets progressbar  timestamp to location of audio timestamp 
    const helperWhilePlaying = () => {
        progressBarRef.current.value = audioRef.current.currentTime;
        setStateCurrentTime(progressBarRef.current.value);
        animationRef.current = requestAnimationFrame(helperWhilePlaying)


    }

    const helperOnLoadedMetaData = () => {
        const seconds = Math.floor(audioRef.current.duration);
        setStateDuration(seconds);
        progressBarRef.current.max = seconds;
        if (songIsPlaying) {
            audioRef.current.play();
            animationRef.current = requestAnimationFrame(helperWhilePlaying)
        } else {
            audioRef.current.pause();
            cancelAnimationFrame(animationRef.current)
        }
    }

    // sets audio timestamp to location of progress bar same as above but opposite
    const handleChangeRange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
        setStateCurrentTime(progressBarRef.current.value);
    }

    const helperFormatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        const returnedTime = `${returnedMinutes} : ${returnedSeconds}`;
        return returnedTime
    }

    const handleAudioEnd = () => {
        handleNextSong()
    }

    // use effect for progress bar

    // use effect for fetching audio source from fastapi
    useEffect(() => {
        const fetchAudioSource = async () => {
            if (songsList[currentSongId]?.youtube_file_name) {
                try {
                    const song_youtube_file_name = songsList[currentSongId].youtube_file_name
                    const blob = await readMusic(song_youtube_file_name);
                    const objectUrl = URL.createObjectURL(blob);
                    setStateAudioSource(objectUrl);
                    audioAnalyzer();
                } catch (error) {
                    console.error('Error fetching audio:', error);
                }
            }
        };
        fetchAudioSource();
        handleVolume(stateVolume)
        // clear object url to free memory
        return () => {
            if (stateAudioSource) {
                URL.revokeObjectURL(stateAudioSource);
            }
        };
    }, [currentSongId, songsList]);


    return <div>
        {analyzerData && <WaveForm analyzerData={analyzerData} />}
    
    <div className={` flex-col fixed flex-1 w-full bottom-0 ${styles.carbonfibre} text-white border-2 border-white p-3`}>


        <audio
            ref={audioRef}
            onLoadedMetadata={helperOnLoadedMetaData}
            type="audio/mpeg"
            preload="true"
            src={stateAudioSource}
            onEnded={handleAudioEnd}
        />

        {/*Progress Bar*/}
        <div className="flex justify-between">
            <div className="flex-col text-left ">
                <div className='start'>{songsList[currentSongId]?.spotify_name}</div>
                <div className='text-xs'>{songsList[currentSongId]?.spotify_artists}</div>
            </div>


            <div className='flex-col'>
                {/*Pause component*/}

                <div className='flex justify-center'>
                    <div key="go-previous"
                        onClick={() => {
                            handlePrevSong();
                        }}
                    >
                        <BiSkipPrevious size={30} />
                    </div>
                    <div key="play-and-pause"
                        onClick={() => {
                            handleToggleAudio();
                        }
                        }
                    >
                        {songIsPlaying ? <BiPauseCircle size={30} /> : <BiPlayCircle size={30} />}
                    </div>
                    <div key="go-next">
                        <BiSkipNext size={30}
                            onClick={() => {
                                handleNextSong();
                            }}


                        />
                    </div>


                </div>

                <div className='flex gap-4'>
                    <div>{helperFormatTime(stateCurrentTime)}</div>
                    <input
                        onChange={handleChangeRange}
                        defaultValue="0"
                        ref={progressBarRef}
                        type="range">
                    </input>
                    <div>{helperFormatTime(stateDuration)}</div>
                </div>
            </div>



            <div className='flex items-center gap-4'>
                <HiMiniSpeakerWave size={25} />


                <input
                    className=''
                    value={Math.round(stateVolume * 100)}
                    type="range"
                    onChange={(e) => handleVolume(e.target.value / 100)}>
                </input>
            </div>
        </div>






 </div>   
    </div>
}
export default AudioControls