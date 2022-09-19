import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import './index.scss'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DetailMovie from "./components/DetailMovie/DetailMovie";
import { Home } from "./components/home/Home";
import DetailTv from "./components/detailsTv/DetailTv";
import Movies from "./components/movies/Movies";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/movie/:id" element={<DetailMovie />} />
      <Route path="/serie/:id" element={<DetailTv />} />
      <Route path="/movies" element={<Movies />} />

     </Routes>
    </BrowserRouter>
  </Provider>
);
