import React, {useEffect, useState} from 'react'
import {getFirestore, getDoc, doc, setDoc} from 'firebase/firestore'
import firebaseApp from '../../fireBase'
import {topMovies, user} from '../../redux/types'
import Card from '../card/Card'
import Navbar from '../../components/navbar/NavBar'
import Loading from '../loading/Loading'
import {useAppDispatch} from '../../hooks/redux'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import ContainerMovies from '../search/ContainerMovies'


export default function Favorites() {
    const dispatch = useAppDispatch()
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
    const [loading, setLoading] = useState < boolean > (true)
    const language = localStorage.getItem('lng')
    const {t} = useTranslation();

    const [user, setUser] = useState(() => {
        const user = localStorage.getItem('user')
        if (user) {
            const userParse: user = JSON.parse(user)
            return userParse.email
        } else {
            return '';
        }
    })

    useEffect(() => {
        async function fetchFavs(usuario : string) {
            const favorites = await searchFavorites(usuario)
            const favoritesParse = JSON.stringify(favorites)
            localStorage.setItem('favorites', favoritesParse)
            setFavs(favorites)
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
        fetchFavs(user)

    }, [user, favs, language])


    if (loading) {
        return <Loading/>
    }


    return (
        <>
            <Navbar/>
            <div className='bg-primary-100 w-full flex justify-center  h-screen '>
                <div className='flex flex-col w-[80%] pt-10 bg-primary-100'>
                    {
                    favs.length ? (
                        <div>
                            <h1 className=' font-Nunito text-4xl text-secundary-50 mb-6 ml-4'>
                                {
                                t('favorites.title')
                            }</h1>
                            <ContainerMovies movie={favs}/>
                        </div>
                    ) : <div className='flex flex-col items-center gap-4 justify-center mt-10'>

                            <h1 className='text-secundary text-2xl font-Nunito'>
                                {
                                t('favorites.notFavorites')
                            }</h1>
                            <Link to='/'>
                                <button className='py-2 px-4 bg-secundary-50 text-center font-PT text-lg rounded-lg text-secundary lg:hover:bg-opacity-60 lg:hover:duration-300 lg:hover:text-opacity-100 '>
                                    {
                                    t('favorites.go')
                                }</button>
                            </Link>
                        </div>
                } </div>
            </div>
        </>
    )
}
