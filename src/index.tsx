import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import store from "./redux/store";
import App from "./App";
import './index.css'
import {BrowserRouter} from 'react-router-dom';

const container = document.getElementById("root")!;
const root = createRoot(container);
console.log(process.env.API_KEY_FB)
root.render (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
