import React, {useEffect, useState, useReducer} from 'react'
import AudioPlayerReducer from './AudioPlayerReducer';
import AudioPlayerContext from './AudioPlayerContext';
import { readPlaylists, readSongs } from '../../services/RestApi';


const AudioPlayerState = (props) => {
    const intitialState = {
        currentSongId: 0,
        songsList: [],
        songIsPlaying: false,
        audio: null,
        playlists: [],
        currentPlaylist: ""
        
    }

    const handleReadPlaylists = async() => {
        const fetchedPlayLists = await readPlaylists()
        dispatch({ type: 'SET_PLAYLISTS', data: fetchedPlayLists });
    }

    const [state, dispatch] = useReducer(AudioPlayerReducer, intitialState)

    const handleSongsFromDatabase = async (query) => {
        const fetchedLists = await readSongs(query);
        dispatch({ type: 'SET_SONGS_LIST', data: fetchedLists });
    }

    const setSongsList = (playlistName) => {
        if (state.currentPlaylist === "") {
            handleSongsFromDatabase()
        } else {
            handleSongsFromDatabase({"spotify_playlist" : playlistName})
        }
    }





    useEffect(() => {
        setSongsList()
        handleReadPlaylists()
    }, []); 

    const setCurrentSongId = (id) => dispatch({type: 'SET_CURRENT_SONG', data: id})

    const setPlaylists = (playlistsArg) =>
        dispatch({type: 'SET_PLAYLISTS', data: playlistsArg})

    const setCurrentPlaylist = (playlistArg) =>
        dispatch({type: 'SET_CURRENT_PLAYLIST', data: playlistArg})

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
            nextSong,
            playlists: state.playlists,
            currentPlaylist : state.currentPlaylist,
            setCurrentPlaylist, 
            currentPlaylist: state.currentPlaylist,
            setSongsList
        }}
    >
        {props.children}

    </AudioPlayerContext.Provider>



};

export default AudioPlayerState

