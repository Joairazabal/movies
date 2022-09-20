
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DetailMovie from "./components/DetailMovie/DetailMovie";
import { Home } from "./components/home/Home";
import DetailTv from "./components/detailsTv/DetailTv";
import Movies from "./components/movies/Movies";
import Series from "./components/series/allSeries";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/movie/:id" element={<DetailMovie />} />
      <Route path="/tv/:id" element={<DetailTv />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/series" element={<Series />} />
     </Routes>
    </>
  );
}

export default App;
