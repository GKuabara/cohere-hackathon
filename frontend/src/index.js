import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, createBrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Album from './album';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/album/:"
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/album/:artist/:album" element={<Album />}  />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);