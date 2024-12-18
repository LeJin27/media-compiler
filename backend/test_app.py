
from spotify_to_database import SpotifyToDatabase
from database_interface_pg import DatabaseInterfacePg
from database_interface_sqlite import DatabaseInterfaceSqlite
from spotify_interface import helper_prettify
from fastapi import FastAPI, Depends, UploadFile, File
from pydantic import BaseModel
from pydantic import create_model
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware


class song_base(BaseModel):
    spotify_key: Optional[int] = None
    spotify_url: Optional[str] = None
    spotify_name: Optional[str] = None
    spotify_artists: Optional[str] = None
    spotify_yt_query: Optional[str] = None
    youtube_url: Optional[str] = None
    youtube_name: Optional[str] = None
    youtube_length: Optional[int] = None
    youtube_path: Optional[str] = None

def convert_dict_list_to_models(dict_list: List[dict]) -> List[song_base]:
    """
    Converts a list of dictionaries to a list of SongBase models.

    :param dicts: A list of dictionaries.
    :return: A list of SongBase instances.
    """
    return [song_base(**dict_entry) for dict_entry in dict_list]


sqlite_db = DatabaseInterfaceSqlite("media_compiler")
sqlite_json_schema = {
    "spotify_key": "INTEGER PRIMARY KEY",
    "spotify_url": "TEXT",
    "spotify_name": "TEXT",
    "spotify_artists": "TEXT",
    "spotify_yt_query": "TEXT",
    "youtube_url": "TEXT",
    "youtube_name": "TEXT",
    "youtube_length": "INTEGER",
    "youtube_path": "TEXT",
}
sqlite_db.create_table("songs", sqlite_json_schema)
spot_data = SpotifyToDatabase(sqlite_db)
helper_prettify(sqlite_db.get_items_from_table("songs"))