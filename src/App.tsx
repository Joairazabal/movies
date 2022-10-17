import React, {useState, useMemo} from 'react';
import {Route, Routes} from 'react-router-dom';
import DetailMovie from "./components/DetailMovie/DetailMovie";
import {Home} from "./components/home/Home";
import DetailTv from "./components/detailsTv/DetailTv";
import Movies from "./components/movies/Movies";
import Series from "./components/series/allSeries";
import Login from './components/login/Login';
import firebaseApp from './fireBase';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import UserContext from './context/userContext';
import Favorites from './components/favorites/Favorites';
import './i18next'

const auth = getAuth(firebaseApp);

function App() {

    const [globalUser, setGlobalUser] = useState < any > (null)
   

    onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) { // codigo en caso de que hay una sesion iniciada
            setGlobalUser(userFirebase)
            const user= JSON.stringify(userFirebase)
            localStorage.setItem('user', user)
        } else { // codigo en caso de no estar registrado
            setGlobalUser(null)
        }
    })
useMemo(() => globalUser, [globalUser])
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
                <Route path="/movies/:genre"
                    element={<Movies/>}/>
                <Route path="/series/:genre"
                    element={<Series/>}/>
                <Route path="/login"
                    element={<Login 
                    usuario={globalUser}/>
                    }/>
                <Route path="/favorites"
                    element={<Favorites/>
                    }/>
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
