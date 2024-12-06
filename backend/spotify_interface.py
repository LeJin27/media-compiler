import spotipy
import pprint
from spotipy.oauth2 import SpotifyOAuth
import json

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

    def load_tailor_swift(self):
        taylor_uri = 'spotify:artist:06HL4z0CvFAxyc27GXpf02'
        results = self.sp_spotify.artist_albums(taylor_uri, album_type='album')
        albums = results['items']

        while results['next']:
            results = self.sp_spotify.next(results)
            albums.extend(results['items'])

        for album in albums:
            print(album['name'])
    
    def load_albums(self, artist_url):
        spotify = self.sp_spotify

        #query given artist url 
        results = spotify.artist_albums(artist_url, album_type='album')

        # parsing url
        albums = results['items']
        while results['next']:
            results = spotify.next(results)
            albums.extend(results['items'])

        # printing results
        for album in albums:
            print(album['name'])

        
    

    def _convert_item_to_track_json(self, item):
        """
        Helper function that converts an item from playlistitems to a track json datastructure

        Args:
            item (string): An item from a query from playlist_items
        """
        track = item['track']
        artists = track['artists'] # a list of artists

        track_name = track['name']
        track_external_url = track['external_urls']

        track_artists = []

        track_yt_query = track_name
        for artist in artists: 
            track_artists.append(artist['name'])
            track_yt_query += " " + artist['name']

        
        track_json = {"spotify_name": track_name,
                      "spotify_artists": track_artists,
                      "spotify_external_urls": track_external_url,
                      "spotify_yt_query": track_yt_query
                      }
        return track_json
        
        
    def load_tracks_from_playlist(self, playlist_id):
        """
        Returns a json datastructure of loaded tracks containing all related meta data

        Args:
            playlist_id (string): Unique identifier for playlist
            return ([json]): A list of tracks metadata 
        """
        spotify = self.sp_spotify
        results = spotify.playlist_items(playlist_id)


        loaded_tracks = []
        for item in results['items']:
            track_json = self._convert_item_to_track_json(item)
            loaded_tracks.append(track_json)
        
        return loaded_tracks
    



            


            


            
            



















