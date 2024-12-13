from spotify_to_database import SpotifyToDatabase
from database_interface_pg import DatabaseInterfacePg
from database_interface_sqlite import DatabaseInterfaceSqlite
from spotify_interface import helper_prettify
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from pydantic import create_model
from typing import Optional, List


def postgres():
    pg_db = DatabaseInterfacePg(
        host="localhost", dbname="songs", user="postgres", password="dog", port=5432)
    pg_schema_json = {
        "spotify_key": "SERIAL PRIMARY KEY",
        "spotify_url": "TEXT",
        "spotify_name": "VARCHAR(255)",
        "spotify_artists": "VARCHAR(255)[]",
        "spotify_yt_query": "TEXT",
        "youtube_url": "TEXT",
        "youtube_name": "VARCHAR(255)",
        "youtube_length": "NUMERIC",
        "youtube_path": "TEXT",
    }
    pg_db.create_table("songs", schema_json=pg_schema_json)
    spot_data = SpotifyToDatabase(pg_db)
    spot_data.download_from_playlist(
        "https://open.spotify.com/playlist/3EL0PRZNjtWmFFLXiAgb2b?si=5560SJQcTPGDZHEtO4KViw")


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

app = FastAPI()


def _filter_dict_valid_key(dict):
    filtered_dict = {k: v for k, v in dict.items() if v is not None}
    return filtered_dict


@app.get("/songs/")
async def read_items(params: song_base = Depends()):
    # remove none values in song_base and convert to dictioanry
    params_dict = params.model_dump()
    filtered_params = _filter_dict_valid_key(params_dict)

    all_songs = sqlite_db.get_items_from_table("songs", filtered_params)
    models = convert_dict_list_to_models(all_songs)

    return models




