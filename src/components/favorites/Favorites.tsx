import React, {useEffect, useState} from 'react'
import {
    getFirestore,
    getDoc,
    doc,
    setDoc,
} from 'firebase/firestore'
import firebaseApp from '../../fireBase'
import { topMovies, user} from '../../redux/types'
import Card from '../../components/movie.card/Card'
import Navbar from '../../components/navbar/NavBar'
import Loading from '../loading/Loading'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useLenguages from '../../hooks/useLenguages'


export default function Favorites() {
    const dispatch= useAppDispatch()
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

    const allText= useLenguages()


    useEffect(() => {
        async function fetchFavs(usuario : string) {
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
            <div className='bg-primary-100 w-full flex justify-center h-screen'>
                <div className='flex flex-col gap-12 mt-10  w-full'>
                    <h1 className=' font-Nunito text-4xl text-secundary-50'>{allText.leng.favorites}</h1>
                    <div className='container w-full bg-primary-100'>
                        {
                        favs ? favs.map((el
                        : topMovies, index
                        : number) => {
                            return (
                                <div className='w-full'
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
