import { React, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");

  return (
    <div class="min-h-screen bg-black flex items-center justify-center">
      <div class="w-3/5 h-3/5 p-5 text-center border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" action="#">
          <div class="flex items-center justify-around">
            <label class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Artist: </label>
            <input
                onChange={(e) => setArtist(e.target.value)}
                value={artist}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Gojira"
                required
            />
          </div>
          <div class="flex items-center justify-around">
            <label class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Album: </label>
            <input
                onChange={(e) => setAlbum(e.target.value)}
                value={album}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="From mars to sirius"
                required
            />
          </div>
          <div>
            <Link to={`/album/${artist}/${album}`}>
              <button
                class="text-white bg-blue-700 hover:bg-blue-800
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                  dark:hover:bg-blue-700
                  dark:focus:ring-blue-800"
                >
                  Unravel
                </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
