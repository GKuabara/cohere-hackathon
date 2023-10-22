import { React, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");

  return (
    <div class="min-h-screen bg-[#1a1b26] flex items-center justify-center">
      <div class="w-3/5 h-3/5 p-5 text-center border rounded-lg shadow sm:p-6 md:p-8 dark:bg-[#24283b] dark:border-[#c0caf5]">
        <form class="space-y-6 flex flex-col items-center" action="#">
          <div class="flex items-center space-x-5">
            <label class="block mb-2 text-base font-large dark:text-[#a9b1d6]">Artist: </label>
            <input
                onChange={(e) => setArtist(e.target.value)}
                value={artist}
                class="bg-gray-50 border text-bold rounded-lg block p-2.5 dark:bg-gray-600 dark:border-[#c0caf5] dark:placeholder-gray-400 dark:text-gray-400"
                placeholder="Gojira"
                required
            />
          </div>
          <div class="flex items-center space-x-5">
            <label class="block mb-2 text-base font-large dark:text-[#a9b1d6]">Album: </label>
            <input
                onChange={(e) => setAlbum(e.target.value)}
                value={album}
                class="bg-gray-50 border text-bold rounded-lg block p-2.5 dark:bg-gray-600 dark:border-[#c0caf5] dark:placeholder-gray-400 dark:text-gray-400"
                placeholder="From mars to sirius"
                required
            />
          </div>
          <div>
            <Link to={`/album/${artist}/${album}`}>
              <button
                class="text-[#1a1b26] bg-[#7aa2f7] hover:bg-blue-800
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center
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
