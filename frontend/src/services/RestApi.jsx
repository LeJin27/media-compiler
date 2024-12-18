import axios from 'axios'


const baseURL = "http://127.0.0.1:8000";

export const readSongs = async(dictionaryArg) => {
    try {
        console.log(dictionaryArg)
        const response = await axios.get(baseURL + '/songs/', {
            params: dictionaryArg
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }

}