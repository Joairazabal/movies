import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import store from "./redux/store";
import App from "./App";
import './index.css'
import {BrowserRouter} from 'react-router-dom';


const container = document.getElementById("root")!;
const root = createRoot(container);

const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const dominio = process.env.REACT_APP_AUTH0_DOMAIN

root.render (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
