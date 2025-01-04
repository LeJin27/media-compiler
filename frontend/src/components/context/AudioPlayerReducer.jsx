let AudioPlayerReducer = (state, action)  => {
    switch(action.type) {
        case 'SET_SONGS_LIST':
            return {
                ... state,
                songsList: action.data
            }
        case 'SET_CURRENT_SONG':
            return {
                ...state,
                currentSongId: action.data,
            }
        case 'SET_PLAYING_STATUS': 
            return {
                ...state, 
                songIsPlaying: action.data
            }
        case 'SET_PLAYLISTS': 
            return {
                ...state, 
                playlists: action.data
            }
        case 'SET_CURRENT_PLAYLIST':
            return {
                ...state,
                currentPlaylist: action.data,
            }
        default:
            return state
    }

}

export default AudioPlayerReducer