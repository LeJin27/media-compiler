from spotify_to_database import SpotifyToDatabase
from spotify_interface import SpotifyInterface
from youtube_interface import YoutubeInterface
from database_interface_pg import DatabaseInterfacePg
from database_interface_sqlite import DatabaseInterfaceSqlite



def postgres():
    pg_db = DatabaseInterfacePg(host="localhost", dbname="songs", user="postgres", password="dog", port=5432)
    pg_schema_json = {
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
    pg_db.create_table("songs", schema_json=pg_schema_json)
    spotData = SpotifyToDatabase(pg_db)
    spotData.download_from_playlist("https://open.spotify.com/playlist/3EL0PRZNjtWmFFLXiAgb2b?si=5560SJQcTPGDZHEtO4KViw")


sqlite_db = DatabaseInterfaceSqlite("media_compiler")
sqlite_json_schema = {
   "spotify_key": "INTEGER PRIMARY KEY", 
   "spotify_url" : "TEXT",
   "spotify_name": "TEXT",
   "spotify_artists": "TEXT", 
   "spotify_yt_query": "TEXT", 
   "youtube_url": "TEXT",
   "youtube_name": "TEXT",
   "youtube_length": "INTEGER",
   "youtube_path": "TEXT",
}
sqlite_db.create_table("songs", sqlite_json_schema)
spotData = SpotifyToDatabase(sqlite_db)
spotData.download_from_playlist("https://open.spotify.com/playlist/3GhsvsVomUEGcVk33Jb8L6?si=GcVSv4tKTrCw_YxW69gSig")
