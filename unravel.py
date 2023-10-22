"""Genius CLI"""

import os
import json
from pathlib import Path

import cohere
from lyricsgenius import Genius
from dotenv import load_dotenv
from flask import Flask, request, g, app

load_dotenv()

# Configure cohere client
MODEL = "command"
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

# Configure genius client
GENIUS_API_KEY = os.getenv("GENIUS_API_KEY")
genius = Genius(GENIUS_API_KEY)

# Application state
app = Flask(__name__)
context = {
    'album': None,              # Holds the album and song infos
    'album_description': None,  # Used to cache album description and pass it to songs
    'song_descriptions': {},    # Used to cache song descriptions so we don't have to re-generate
}

class Song:
    def __init__(self, num, name, lyrics):
        self.num = int(num)
        self.name = name

        if len(lyrics) > 0:
            lyric_start = lyrics.index("[")
            lyrics = lyrics[lyric_start:]
            lyrics = lyrics.strip("Embed")
            lyrics = lyrics[:-2]

        self.lyrics = lyrics

    def generate_song_section(self):
        return f"\n[start of song {self.num} - {self.name}]\n{self.lyrics}\n[end of song {self.num}]\n"

    def generate_prompt(self, album_name, album_description):
        prompt = f"Extract the narrative and themes present in the song '{self.name}', of the album {album_name} (which can be described as '{album_description}'), which has the following lyrics:"
        prompt += self.lyrics
        return prompt

class Album:
    def __init__(self, title, artist, tracks):
        self.title = title
        self.artist = artist

        self.songs = []
        bla = True
        for track in tracks:
            if bla:
                bla = False
            song = Song(track.number, track.song.title, track.song.lyrics)
            self.songs.append(song)

        self.songs.sort(key=lambda x: x.num)

    def generate_prompt(self):
        prompt = "Given the following lyrics of the whole album, write down the themes and ideas present in the album"
        prompt += f" {self.title} from {self.artist}:"

        prompt += "\n[start of songs]"
        for song in self.songs:
            prompt += song.generate_song_section()

        prompt += "[end of songs]"
        return prompt

@app.route('/album/')
def get_album():
    args = request.args.to_dict()
    artist = args['artist']
    album = args['album']

    album = genius.search_album(album, artist)
    cover = album.cover_art_url

    album = Album(album.name, album.artist, album.tracks)
    context['album'] = album

    album_prompt = album.generate_prompt()
    res = co.generate(prompt=album_prompt, model=MODEL, max_tokens=100)
    album_description = res.generations[0].text
    # print(f"Album '{album.title}' description: {album_description}")

    context['album_description'] = album_description
    return {'title': album.title, 'description': album_description, 'cover': cover}

@app.route('/song/<int:song_num>')
def get_song(song_num):
    if 'song_descriptions' in context and song_num in context['song_descriptions']:
        return {"song_description": context['song_descriptions'][song_num]}

    album = context['album']
    album_description = context['album_description']

    if song_num >= len(album.songs):
        return {"end_reached": True}

    song = album.songs[song_num]

    song_prompt = song.generate_prompt(album.title, album_description)
    res = co.generate(prompt=song_prompt, model=MODEL, max_tokens=100)

    song_description = res.generations[0].text
    # print(f"Song '{song.name}' descriptions: {song_description}")

    context['song_descriptions'][song_num] = song_description
    return {'title': song.name, "description": song_description}

def main():
    app.run()

main()
