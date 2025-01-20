import axios from 'axios'
import art from '../assets/Artwork.png'


const baseURL = "http://127.0.0.1:8000";

//reading form database
export const readSongs = async(dictionary_arg) => {
    try {
        const response = await axios.get(baseURL + '/songs/', {
            params: dictionary_arg
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }

}

export const deleteSong = async(dictionary_arg) => {
    try {
        const response = await axios.delete(baseURL + '/songs/', {
            params: dictionary_arg
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting song:', error);
        throw error;
    }
}

//reading local files music folder
export const readMusic = async(youtube_file_name) => {
    try {
        const response = await axios.get(baseURL + '/music/' + youtube_file_name, {
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
}
export const readThumbnail = async(thumbnail_name) => {
    try {
        if (thumbnail_name == null) {
            return art;
        }


        const response = await axios.get(baseURL + '/music_thumbnail/' + thumbnail_name, {
            responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
}

//reading from database
export const readPlaylists = async() => {
    try {
        const response = await axios.get(baseURL + '/playlists/')
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
}

export const createPlayList = async(youtube_url) => {
    try {
        const response = await axios.post(baseURL + '/playlists/', {
            "url" : youtube_url
        });
        return response.data;
    } catch (error) {
        console.error('Error creating playlist:', error);
        throw error;
    }
}


export const addYoutubeVideo = async(youtube_url, dictionary_arg) => {
    try {
        const response = await axios.post(baseURL + '/playlists/', {
            "yt_link" : youtube_url,
            "params" : dictionary_arg
        });
        return response.data;
    } catch (error) {
        console.error('Error creating song from youtube video:', error);
        throw error;
    }
}