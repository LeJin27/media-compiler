import axios from 'axios'


const baseURL = "http://127.0.0.1:8000";

export const readSongs = async(dictionary_arg) => {
    try {
        console.log(dictionary_arg)
        const response = await axios.get(baseURL + '/songs/', {
            params: dictionary_arg
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }

}

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