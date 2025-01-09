import spotipy
import pprint
from spotipy.oauth2 import SpotifyOAuth
import json
import requests

from dotenv import load_dotenv
import os


def helper_prettify(json_to_prettify):
    """
    Helper function that prints a formatted json file

    Args:
        json_to_prettify: A dictionary or json 
    """
    print(pprint.pformat(json_to_prettify, indent=1, width=80))

class SpotifyInterface:
    def __init__(self, client_id, client_secret, app_redirect_url): 
        self.sp_client_id = client_id
        self.sp_client_secret = client_secret
        self.sp_app_redirect_url = app_redirect_url

        self.sp_spotify = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=client_id,
                             client_secret=client_secret,
                             redirect_uri=app_redirect_url,
                             scope="user-library-read"))
    

    def _convert_item_to_track_json(self, item, playlist_name, playlist_thumbnail):
        """
        Helper function that converts an item from playlistitems to a track json datastructure

        Args:
            item (string): An item from a query from playlist_items
        """
        
        track = item.get('track')
        if not track: 
            return None
        

        artists = track.get('artists', [])
        track_name = track.get('name', "Unknown Track") 
        track_spotify_url = track.get('external_urls', {}).get("spotify", "Unknown URL")

        track_artists = []

        track_yt_query = track_name
        track_yt_query += " by"



        for artist in artists: 
            track_artists.append(artist['name'])
            track_yt_query += " " + artist['name']
        
        if (len(artists) == 0): 
            track_yt_query = track_name
        
        
        track_json = {"spotify_name": track_name,
                      "spotify_url": track_spotify_url,
                      "spotify_artists": track_artists,
                      "spotify_yt_query": track_yt_query,
                      "spotify_thumbnail": playlist_thumbnail,
                      "spotify_playlist": playlist_name
                      }
        return track_json
        
        
    def load_tracks_from_playlist(self, playlist_url):
        """
        Returns a json datastructure of loaded tracks containing all related meta data

        Args:
            playlist_url (string): Unique identifier for playlist
            return ([json]): A list of tracks metadata 
        """
        spotify = self.sp_spotify
        playlist_data = spotify.playlist(playlist_url) 
        playlist_name = playlist_data.get('name', "Unknown Playlist")
        print(playlist_name)
        results = spotify.playlist_items(playlist_url)


        loaded_tracks = []
        for item in results['items']:
            image_url = item['track']['album']['images'][0]['url']
            filename = image_url.split('/')[-1]
            r = requests.get(image_url, allow_redirects=True)
            track_thumbnail_name = filename + ".png"
            completeName = "./music_thumbnail/" + filename + ".png"
            open(completeName, 'wb').write(r.content)


            print("\n\n\n")


            #helper_prettify(item)
            track_json = self._convert_item_to_track_json(item, playlist_name, track_thumbnail_name)
            loaded_tracks.append(track_json)
        
        return loaded_tracks
    

if __name__ == "__main__":
    load_dotenv()
    CLIENT_ID = os.environ.get("CLIENT_ID")
    CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
    APP_REDIRECT_URL = os.environ.get("APP_REDIRECT_URL")

    meow = SpotifyInterface(CLIENT_ID, CLIENT_SECRET, APP_REDIRECT_URL)
    tracks = meow.load_tracks_from_playlist("https://open.spotify.com/playlist/07xdE0QkcFKOi8sQCcsMcz?si=K9IbtnKYQz2aUfOMOM4Dng")




            


            


            
            



















