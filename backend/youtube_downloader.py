from youtube_interface import YoutubeInterface
import sys

OUTPUT_PATH = {
    'home' : "./video_url"
}

YTDL_OPTS = {
    'format': 'm4a/bestaudio/best',
    'paths': OUTPUT_PATH,
}

yt = YoutubeInterface(YTDL_OPTS)
yt.download_video(sys.argv[1])