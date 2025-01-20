from spotify_to_database import SpotifyToDatabase
from database_interface_pg import DatabaseInterfacePg
from database_interface_sqlite import DatabaseInterfaceSqlite
from spotify_interface import helper_prettify
from fastapi import FastAPI, Depends, UploadFile, File
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pydantic import create_model
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


class song_base(BaseModel):
    spotify_key: Optional[int] = None
    spotify_url: Optional[str] = None
    spotify_name: Optional[str] = None
    spotify_artists: Optional[str] = None
    spotify_yt_query: Optional[str] = None
    spotify_thumbnail: Optional[str] = None
    spotify_playlist: Optional[str] = None
    youtube_url: Optional[str] = None
    youtube_name: Optional[str] = None
    youtube_length: Optional[int] = None
    youtube_file_name: Optional[str] = None

class youtube_url_base(BaseModel):
    youtube_url: Optional[str] = None





def convert_dict_list_to_models(dict_list: List[dict]) -> List[song_base]:
    """
    Converts a list of dictionaries to a list of SongBase models.

    :param dicts: A list of dictionaries.
    :return: A list of SongBase instances.
    """
    return [song_base(**dict_entry) for dict_entry in dict_list]


sqlite_db = DatabaseInterfaceSqlite("media_compiler.db")
sqlite_json_schema = {
    "spotify_key": "INTEGER PRIMARY KEY",
    "spotify_url": "TEXT",
    "spotify_name": "TEXT",
    "spotify_artists": "TEXT",
    "spotify_yt_query": "TEXT",
    "spotify_thumbnail": "TEXT",
    "spotify_playlist": "TEXT",
    "youtube_url": "TEXT",
    "youtube_name": "TEXT",
    "youtube_length": "INTEGER",
    "youtube_file_name": "TEXT",
}
sqlite_db.create_table("songs", sqlite_json_schema)
spot_data = SpotifyToDatabase(sqlite_db)
#spot_data.download_from_youtube_url("https://www.youtube.com/watch?v=B2PWmTwtYIM", {"spotify_name" : "dog"})

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def _filter_dict_valid_key(dict):
    filtered_dict = {k: v for k, v in dict.items() if v is not None}
    return filtered_dict

@app.get("/songs/")
async def read_items(params: song_base = Depends()):
    # remove none values in song_base and convert to dictioanry
    params_dict = params.model_dump()
    print(f"Received params: {params_dict}")  # Logs incoming parameters
    filtered_params = _filter_dict_valid_key(params_dict)

    all_songs = sqlite_db.get_items_from_table("songs", filtered_params)
    models = convert_dict_list_to_models(all_songs)

    return models

@app.delete("/songs/")
async def delete_items(params: song_base = Depends()):
    params_dict = params.model_dump()
    print(f"Received params: {params_dict}")  # Logs incoming parameters
    filtered_params = _filter_dict_valid_key(params_dict)
    sqlite_db.delete_from_table("songs", filtered_params)


@app.get("/playlists/")
async def read_playlists():
    # remove none values in song_base and convert to dictioanry
    all_unique_playlists = sqlite_db.get_all_unique("songs", "spotify_playlist")
    return all_unique_playlists




"""
@app.get("/audio/{item_id}")
def get_audio(item_id: str):
    song_dict = sqlite_db.get_items_from_table("songs", {"spotify_key": item_id})[0]
    song_path = song_dict.get("youtube_path")
    return FileResponse(song_path, media_type="audio/mp4", filename="audio.mp4")
"""


app.mount("/music", StaticFiles(directory="music"), name="music")
app.mount("/music_thumbnail", StaticFiles(directory="music_thumbnail"), name="music_thumbnail")



class PlaylistUrl(BaseModel):
    url: str 

@app.post("/playlists/")
async def create_playlist(playlist : PlaylistUrl): 
    spot_data.download_from_playlist(playlist.url)


@app.post("/songs/")
async def create_youtube_song(yt_link : str, params: song_base = Depends()):
    # remove none values in song_base and convert to dictioanry
    params_dict = params.model_dump()
    print(f"Received params: {params_dict}")  # Logs incoming parameters
    filtered_params = _filter_dict_valid_key(params_dict)

    spot_data.download_from_youtube_url(yt_link, filtered_params)
