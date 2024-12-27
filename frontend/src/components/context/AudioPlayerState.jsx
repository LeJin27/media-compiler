import React, {useEffect, useState, useReducer} from 'react'
import AudioPlayerReducer from './AudioPlayerReducer';
import AudioPlayerContext from './AudioPlayerContext';
import { readSongs } from '../../services/RestApi';


const AudioPlayerState = (props) => {
    const intitialState = {
        currentSongId: 0,
        songsList: [],
        songIsPlaying: false,
        audio: null,
    }

    const [state, dispatch] = useReducer(AudioPlayerReducer, intitialState)

    const handleSetSongsFromDatabase = async (query) => {
        const fetchedLists = await readSongs(query);
        dispatch({ type: 'SET_SONGS_LIST', data: fetchedLists });
    }


    useEffect(() => {
        handleSetSongsFromDatabase()
    }, []); 

    const setCurrentSongId = (id) => dispatch({type: 'SET_CURRENT_SONG', data: id})

    const setPlayingStatus = (playingStatus) =>
        dispatch({type: 'SET_PLAYING_STATUS', data: playingStatus})

    const setPause = () =>
        dispatch({type: 'SET_PLAYING_STATUS', data: true})

    const nextSong = () => {
        if (state.currentSongId === state.songsList.length - 1) {
            setCurrentSongId(0)
        } else {
            setCurrentSongId(state.currentSongId + 1)
        }
    }
    const prevSong = () => {
        if (state.currentSongId === 0) {
            setCurrentSongId(state.songsList.length - 1)
        } else {
            setCurrentSongId(state.currentSongId - 1)
        }
    }


    return <AudioPlayerContext.Provider
        value = {{
            currentSongId: state.currentSongId,
            songsList: state.songsList,
            songIsPlaying: state.songIsPlaying,
            setCurrentSongId,
            setPause,
            setPlayingStatus,
            prevSong,
            nextSong
        }}
    >
        {props.children}

    </AudioPlayerContext.Provider>



};

export default AudioPlayerState

