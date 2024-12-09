from spotify_to_database import SpotifyToDatabase
from spotify_interface import SpotifyInterface
from youtube_interface import YoutubeInterface
from backend.database_interface_pg import DatabaseInterfacePg



import sqlite3

con = sqlite3.connect("tutorial.db")
cur = con.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS movie(title, year, score)")


