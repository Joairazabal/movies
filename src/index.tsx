import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {Auth0Provider} from '@auth0/auth0-react'

const container = document.getElementById("root")!;
const root = createRoot(container);

const clientId= process.env.REACT_APP_AUTH0_CLIENT_ID
const dominio= process.env.REACT_APP_AUTH0_DOMAIN

root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Auth0Provider domain={dominio} clientId={clientId} redirectUri={window.location.origin}>
    <App/>
    </Auth0Provider>
    </BrowserRouter>
  </Provider>
);
