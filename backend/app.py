from spotify_to_database import SpotifyToDatabase
from spotify_interface import SpotifyInterface
from youtube_interface import YoutubeInterface
from database_interface import DatabaseInterface


def helper_prettify(json_to_prettify):
    print(pprint.pformat(json_to_prettify, indent=1, width=80))

spotData = SpotifyToDatabase()




