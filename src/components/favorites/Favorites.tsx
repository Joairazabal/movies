import React, {useEffect, useState} from 'react'
import {
    getFirestore,
    getDoc,
    doc,
    setDoc,
    updateDoc
} from 'firebase/firestore'
import firebaseApp from '../../fireBase'
import {movies, topMovies, user} from '../../redux/types'
import Card from '../../components/movie.card/Card'
import Navbar from '../../components/navbar/NavBar'
import Loading from '../loading/Loading'


export default function Favorites() {

    const firestore = getFirestore(firebaseApp);

    async function searchFavorites(idFav : string) {
        const favRef = doc(firestore, `usuarios/${idFav}`)
        // busco el usuario
        const consulta = await getDoc(favRef);
        if (consulta.exists()) { // si existe
            const resolve = consulta.data();
            return resolve.favorites
            // retorno los favoritos
        } else { // si no existe
            await setDoc(favRef, {favorites: []})
        }
    }

    const [favs, setFavs] = useState([])

    const [user, setUser] = useState(() => {
        const user = localStorage.getItem('user')
        if (user) {
            const userParse: user = JSON.parse(user)
            return userParse.email
        } else 
            return ''
        
    })

    useEffect(() => {
        async function fetchFavs(usuario : string) {
            console.log(usuario)
            const favorites = await searchFavorites(usuario)
            const favoritesParse = JSON.stringify(favorites)
            localStorage.setItem('favorites', favoritesParse)
            setFavs(favorites)
        }
        fetchFavs(user)

    }, [user])


    if (!favs.length) 
        return <Loading/>

    

    return (
        <>
            <Navbar/>
            <div className='bg-primary-100 flex justify-center'>
                <div className='flex flex-col gap-12 mt-10'>
                    <h1 className=' font-Nunito text-4xl text-secundary-50'>Favorites</h1>
                    <div className='container bg-primary-100'>
                        {
                        favs ? favs.map((el
                        : topMovies, index
                        : number) => {
                            return (
                                <div className=''
                                    key={index}>
                                    <Card poster_path={
                                            el.poster_path
                                        }
                                        title={
                                            el.title
                                        }
                                        id={
                                            el.id
                                        }
                                        clase={'movie'}/>
                                </div>
                            )
                        }) : <h1>no tienes favoritos</h1>
                    } </div>
                </div>
            </div>
        </>
    )
}
