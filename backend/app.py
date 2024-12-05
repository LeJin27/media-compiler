from spotify_interface import SpotifyInterface
from youtube_interface import YoutubeInterface
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
import pprint
import os

def helper_prettify(json_to_prettify):
    print(pprint.pformat(json_to_prettify, indent=1, width=80))


FFMPEG_PATH = '/opt/homebrew/bin/ffmpeg'
OUTPUT_PATH = {
    'home' : "./music",
}

YTDL_OPTS = {
    'format': 'm4a/bestaudio/best',
    'ffmpeg_location': FFMPEG_PATH,  # Path to your local FFmpeg binary
    'paths': OUTPUT_PATH,

    # ℹ️ See help(yt_dlp.postprocessor) for a list of available Postprocessors and their arguments
    'postprocessors': [{  # Extract audio using ffmpeg
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
    }]
}

load_dotenv()
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
APP_REDIRECT_URL = os.environ.get("APP_REDIRECT_URL")

sp = SpotifyInterface(CLIENT_ID, CLIENT_SECRET, APP_REDIRECT_URL)
yt = YoutubeInterface(YTDL_OPTS)

def download_from_playlist(sp, yt, playlist_url):
    tracks = sp.load_tracks_from_playlist(playlist_url)

    for track in tracks:
        track_yt_query = track['spotify_yt_query']
        track_url = yt.search_link(track_yt_query)

        video_json = yt.load_info(track_url)
        track.update(video_json)

        helper_prettify(track)


        
        



download_from_playlist(sp, yt, "https://open.spotify.com/playlist/07xdE0QkcFKOi8sQCcsMcz?si=42b65b6275724d38")()





