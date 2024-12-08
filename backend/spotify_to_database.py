from spotify_interface import SpotifyInterface
from youtube_interface import YoutubeInterface
from database_interface import DatabaseInterface
from dotenv import load_dotenv
import pprint
import os

def helper_prettify(json_to_prettify):
    print(pprint.pformat(json_to_prettify, indent=1, width=80))


class SpotifyToDatabase():

    def __init__(self):
        ### Youtube Interface Setup
        OUTPUT_PATH = {
            'home' : "./music"
        }

        YTDL_OPTS = {
            'format': 'm4a/bestaudio/best',
            'paths': OUTPUT_PATH,
        }

        ### Spotify Interface Setup

        load_dotenv()
        CLIENT_ID = os.environ.get("CLIENT_ID")
        CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
        APP_REDIRECT_URL = os.environ.get("APP_REDIRECT_URL")

        ### Databse interface setup

        
        schema_json = {
           "spotify_key": "SERIAL PRIMARY KEY", 
           "spotify_url" : "TEXT",
           "spotify_name": "VARCHAR(255)",
           "spotify_artists": "VARCHAR(255)[]", 
           "spotify_yt_query": "TEXT", 
           "youtube_url": "TEXT",
           "youtube_name": "VARCHAR(255)",
           "youtube_length": "NUMERIC",
           "youtube_path": "TEXT",
        }
        
        self.youtube_interface = YoutubeInterface(YTDL_OPTS)
        self.spotify_interface = SpotifyInterface(CLIENT_ID, CLIENT_SECRET, APP_REDIRECT_URL)
        self.user_db = DatabaseInterface(host=os.environ.get("PG_HOST"), dbname=os.environ.get("PG_DBNAME"), user=os.environ.get("PG_USER"), password=os.environ.get("PG_PASSWORD"), port=os.environ.get("PG_PORT"))
        self.user_db.create_table(os.environ.get("PG_TABLE_NAME"), schema_json=schema_json)


    def download_from_playlist(self, playlist_url):
        """
        Downloads video from spotify playlist url

        Args:
            spotify_interface (SpotifyInterface): dependency injection
            youtube_interface (YoutubeInterface): dependency injection
            playlist_url (string): spotify playlist url 

        Returns:
            [dict]: List of dictionaries that contains all tracks meta data

        """
        tracks_from_playlist = self.spotify_interface.load_tracks_from_playlist(playlist_url)

        for track in tracks_from_playlist:
            track_yt_query = track['spotify_yt_query']
            track_url = self.youtube_interface.search_song(track_yt_query)
            video_json = self.youtube_interface.download_video(track_url)
            track.update(video_json)
            self.user_db.insert_into_table(os.environ.get("PG_TABLE_NAME"), track)
    


spotData = SpotifyToDatabase()
spotData.download_from_playlist("https://open.spotify.com/playlist/3EL0PRZNjtWmFFLXiAgb2b?si=5560SJQcTPGDZHEtO4KViw")

        

        








