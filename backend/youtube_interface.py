from youtube_search import YoutubeSearch
import pprint
from yt_dlp import YoutubeDL
import os



def helper_prettify(json_to_prettify):
    print(pprint.pformat(json_to_prettify, indent=1, width=80))


#ffmpeg_path = '/opt/homebrew/bin/ffmpeg'
#output_path = {
#    'home' : "./music",
#}
#
#ytdl_opts = {
#    'format': 'm4a/bestaudio/best',
#    'ffmpeg_location': ffmpeg_path,  # Path to your local FFmpeg binary
#    'paths': output_path,
#
#    # ℹ️ See help(yt_dlp.postprocessor) for a list of available Postprocessors and their arguments
#    'postprocessors': [{  # Extract audio using ffmpeg
#        'key': 'FFmpegExtractAudio',
#        'preferredcodec': 'mp3',
#    }]
#}

class YoutubeInterface():
    def __init__(self, ytdl_opts):
        self.ytdl_opts = ytdl_opts
    
    def download_video(self, video_url):
        """
        Downloads video and returns a json containing related metadata

        Args:
            video_url (string): A youtube url.

        Returns:
            video_json (dict): Meta data related to youtube file
        """
        file_path = ""
        with YoutubeDL(self.ytdl_opts) as ydl:
            video_json = ydl.extract_info(video_url, download=True)
            file_path = ydl.prepare_filename(video_json)
            file_name = os.path.basename(file_path)

            video_json = {
                "youtube_length": video_json['duration'], # gets lenght of video
                "youtube_name": video_json['fulltitle'],
                "youtube_url": video_json['original_url'],
                "youtube_file_name" : file_name
            }
        
        return video_json

    def load_info(self, video_url):
        """
        Returns all info related to url

        Args:
            video_url (string): A youtube url.

        Returns:
            yt_json (dict): Metadata that contains all extracted data
        """
        with YoutubeDL(self.ytdl_opts) as ydl:
            yt_json = ydl.extract_info(video_url, download=False)
            return yt_json
    

    
    def search_song(self, song_name):
        """
        Searches youtube using a song name and retrieves youtube urls

        Args:
            song_name (string): Name for song that is used to query youtube

        Returns:
            song_url (string): Metadata that contains all extracted data
        """
        search_count = 1
        results = YoutubeSearch(song_name, max_results=search_count).to_dict()
    
        video = results[0]
        song_url = 'https://www.youtube.com' + video['url_suffix']
        
        return song_url
    





        


    

    











