from spotify_interface import SpotifyInterface
from youtube_interface import YoutubeInterface
from dotenv import load_dotenv
import pprint
import os

def helper_prettify(json_to_prettify):
    print(pprint.pformat(json_to_prettify, indent=1, width=80))


OUTPUT_PATH = {
    'home' : "./music",
}

YTDL_OPTS = {
    'format': 'm4a/bestaudio/best',
    'paths': OUTPUT_PATH,
}

load_dotenv()
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
APP_REDIRECT_URL = os.environ.get("APP_REDIRECT_URL")



sp = SpotifyInterface(CLIENT_ID, CLIENT_SECRET, APP_REDIRECT_URL)
yt = YoutubeInterface(YTDL_OPTS)

def download_from_playlist(spotify_interface, youtube_interface, playlist_url):
    """
    Downloads video from spotify playlist url

    Args:
        spotify_interface (SpotifyInterface): dependency injection
        youtube_interface (YoutubeInterface): dependency injection
        playlist_url (string): spotify playlist url 

    """
    tracks_from_playlist = spotify_interface.load_tracks_from_playlist(playlist_url)

    for track in tracks_from_playlist:
        track_yt_query = track['spotify_yt_query']
        track_url = youtube_interface.search_song(track_yt_query)
        video_json = youtube_interface.download_video(track_url)
        track.update(video_json)

        helper_prettify(track)
    



download_from_playlist(sp, yt, "https://open.spotify.com/playlist/4S7OwcSANjS6Km3BBJ5EzI?si=69a280556e814367")


        
        








