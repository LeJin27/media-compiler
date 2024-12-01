from spotify_interface import SpotifyInterface
from dotenv import load_dotenv
import os

# env variables
load_dotenv() # load environemnt that contains sensitive information
client_id = os.getenv("CLIENT_ID") 
client_secret = os.getenv("CLIENT_SECRET")
app_redirect_url = os.getenv("APP_REDIRECT_URL")

sp = SpotifyInterface(client_id, client_secret, app_redirect_url)
sp.load_tracks_from_playlist('https://open.spotify.com/playlist/2aMwIFBJnJNH0U8QUQT8uU')
