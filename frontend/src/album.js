import { React, useCallback, useEffect, useState } from 'react';
import './App.css';
import { Link, useParams } from 'react-router-dom';

export default function Album() {
  // Route params
  const { artist, album } = useParams();

  // Song state
  const [title, setTitle] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [lyrics, setLyrics] = useState(undefined);
  const [cover, setCover] = useState(undefined);

  // Pagination and card state
  const [loading, setLoading] = useState(false);
  const [songNum, setSongNum] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  
  useEffect(() => {
      const params = new URLSearchParams({artist, album});
      const url = "http://127.0.0.1:5000/album?" + params;
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(json => {
            console.log(json);
            setTitle(json.title);
            setDescription(json.description);
            setCover(json.cover);
        })
        .catch(e => console.log("fetch failed with", e))
  }, []);

  const handleSong = useCallback((num) => {
    if (num < 1 || endReached) { return }

    const url = `http://127.0.0.1:5000/${artist}/${album}/${num}`;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setEndReached(false);
        if (json.hasOwnProperty('endReached')) {
          setEndReached(true);
        }
        
        setTitle(json.title);
        setDescription(json.description);
        const newLyrics = json.lyrics.replaceAll(/\[Verse\s\d\]/g, "\n").replaceAll(/\[Chorus\s\d\]/g, "\n\n")
        setLyrics(newLyrics);
        setSongNum(num);
      })
  }, [endReached]);

  return (
    <div class="min-h-screen bg-black flex items-center justify-center space-around">
      <div class="w-3/5 h-3/5 p-5 text-center border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-evenly">
          <div class="w-1/2 flex justify-center items-center">
            <img class="w-full" src={cover} alt={"Cover art of " + album} />
          </div>
          <div class="h-full w-2 bg-color-white" />
          <div class="w-1/2 min-h-full flex flex-col justify-between items-center">
            <h2 class="text-white">{title}</h2>
            {showDescription? <p class="text-white">{description}</p> : <p class="min-h-full text-white">{lyrics}</p>  }
            <button
              onClick={() => setShowDescription((showing) => lyrics.length > 0 && !showing)}
              class="
                w-fit
                text-white bg-blue-700 hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                dark:hover:bg-blue-700
                dark:focus:ring-blue-800"
            >
              {showDescription? "Show lyrics" : "Show description"}
            </button>
          </div>
        </div>
        <button onClick={() => handleSong(songNum-1)} type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button onClick={() => handleSong(songNum+1)} type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}
