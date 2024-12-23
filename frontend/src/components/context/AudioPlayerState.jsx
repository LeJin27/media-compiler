import React, {useEffect, useState, useReducer} from 'react'
import AudioPlayerReducer from './AudioPlayerReducer';
import AudioPlayerContext from './AudioPlayerContext';
import { readSongs } from '../../services/RestApi';


const AudioPlayerState = (props) => {
    const intitialState = {
        currentSong: 0,
        songsList: [],
        songIsPlaying: false,
        audio: null,
    }

    const [currentState, dispatch] = useReducer(AudioPlayerReducer, intitialState)

    const handleReadSongsToContext = async (query) => {
        const fetchedLists = await readSongs(query);
        dispatch({ type: 'SET_SONGS_LIST', data: fetchedLists });
    }

    useEffect(() => {
        handleReadSongsToContext()
    }, []); 

    const setCurrentSong = (id) => dispatch({type: 'SET_CURRENT_SONG', data: id})

    return <AudioPlayerContext.Provider
        value = {{
            currentSong: currentState.currentSong,
            songsList: currentState.songsList,
            songIsPlaying: currentState.songIsPlaying,
            audio: currentState.audio,
            setCurrentSong
        }}
    >
        {props.children}

    </AudioPlayerContext.Provider>



};

export default AudioPlayerState

