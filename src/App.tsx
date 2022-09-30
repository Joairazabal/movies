import React, {useState, useContext} from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import DetailMovie from "./components/DetailMovie/DetailMovie";
import {Home} from "./components/home/Home";
import DetailTv from "./components/detailsTv/DetailTv";
import Movies from "./components/movies/Movies";
import Series from "./components/series/allSeries";
import Login from './components/login/Login';
import firebaseApp from './fireBase';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import UserContext from './context/userContext';

const auth = getAuth(firebaseApp);

function App() {

    const [globalUser, setGlobalUser] = useState < any > (null)
   

    onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) { // codigo en caso de que hay una sesion iniciada
            setGlobalUser(userFirebase)
        } else { // codigo en caso de no estar registrado
            setGlobalUser(null)
        }
    })

    return (
        <UserContext.Provider value={globalUser}>
            <Routes>
                <Route path="/"
                    element={<Home/>}/>
                <Route path="/movie/:id"
                    element={<DetailMovie/>}/>
                <Route path="/tv/:id"
                    element={<DetailTv/>}/>
                <Route path="/movies"
                    element={<Movies/>}/>
                <Route path="/series"
                    element={<Series/>}/>
                <Route path="/login"
                    element={<Login 
                    usuario={globalUser}/>
                    }/>
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
