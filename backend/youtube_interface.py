from youtube_search import YoutubeSearch
import pprint
from yt_dlp import YoutubeDL


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
        Downloads videos given a url

        Args:
            video_url (string): Url for youtube
        """
        with YoutubeDL(self.ytdl_opts) as ydl:
            video_json = ydl.download(video_url)


    def load_info(self, video_url):
        with YoutubeDL(self.ytdl_opts) as ydl:
            yt_json = ydl.extract_info(video_url, download=False)

            video_json = {
                "youtube_length": yt_json['duration'] # gets lenght of video
            }


            return video_json
    

    
    def search_song(self, song_name):
        """
        Searches youtube using a song name and retrieves youtube urls

        Args:
            song_name (string): Name for song that is used to query youtube
            return ([string]): A list youtube urls
        """
        search_count = 1
        results = YoutubeSearch(song_name, max_results=search_count).to_dict()
    
        video = results[0]
        song_url = 'https://www.youtube.com' + video['url_suffix']
        
        return song_url
    
    def search_and_download(self, song_name):
        song_url = self.search_song(song_name)
        self.download_video(song_url)




        


    

    











