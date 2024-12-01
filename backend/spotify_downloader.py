from spotify_interface import SpotifyInterface
from youtube_interface import YoutubeInterface
from dotenv import load_dotenv
import os



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

playlist = "https://open.spotify.com/playlist/5IhxS3JJ3KjowyTGuxiCDi"
tracks = sp.load_tracks_from_playlist(playlist)

for track in tracks:
    track_yt_query = track['track_yt_query']
    yt.search_and_download(track_yt_query)





