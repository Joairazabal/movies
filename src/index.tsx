import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import './index.scss'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DetailMovie from "./components/DetailMovie/DetailMovie";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/:movie" element={<App />}/>
      <Route path="/movie/:id" element={<DetailMovie />} />
     </Routes>
    </BrowserRouter>
  </Provider>
);
