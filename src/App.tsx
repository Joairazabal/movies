
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DetailMovie from "./components/DetailMovie/DetailMovie";
import { Home } from "./components/home/Home";
import DetailTv from "./components/detailsTv/DetailTv";
import Movies from "./components/movies/Movies";
import Series from "./components/series/allSeries";
import Logo from './components/assest/Logo';


function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/movie/:id" element={<DetailMovie />} />
      <Route path="/serie/:id" element={<DetailTv />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/series" element={<Series />} />
      <Route path="/logo" element={<Logo/>} />
     </Routes>
    </>
  );
}

export default App;
