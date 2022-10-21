import React, {useState, useEffect} from 'react'
import {GrFavorite} from 'react-icons/gr'
import {getFirestore, getDoc, doc, updateDoc} from 'firebase/firestore'
import firebaseApp from '../../fireBase'
import {movies, topMovies} from '../../redux/types'
import useUser from '../../hooks/useUser'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

interface Props {
    id: string | null | number;
    movie: topMovies;
}

export default function AddFavorites({id, movie} : Props) {

    const firestore = getFirestore(firebaseApp);

    // esta funcion va a recibir el id de la movie
    // deberia crear una funcion que pregunte a la db si existe ese
    // id dentro de el array de favorites y sino es asi que lo pushee
    const user = useUser();
    const idUser = user ?. email;
    const {t} = useTranslation();


    async function addFavorites(idUser : string, id : string | number | null) { // referencia a los favoritos
        try {
            const favRef = doc(firestore, `usuarios/${idUser}`)
            // busco el documento
            const consulta = await getDoc(favRef);
            const resolve = consulta.data();
            const favs: movies[] | null = resolve ?. favorites.filter((el : movies) => el.id === id)
            if (favs ?. length) {
                const filterClear = resolve ?. favorites.filter((el : movies) => el.id !== id)
                await updateDoc(favRef, {favorites: filterClear})
                window.localStorage.setItem('favorites', JSON.stringify(filterClear))
            } else {
                const consulta = await getDoc(favRef);
                const resolve = consulta.data();
                const pushFavs = resolve ?. favorites.concat(movie)
                await updateDoc(favRef, {favorites: pushFavs})
                window.localStorage.setItem('favorites', JSON.stringify(pushFavs))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const [respuesta, setRespuesta] = useState < boolean > (false)

    const [open, setOpen] = useState < boolean > (false);

    const handleAddFav = (e : React.MouseEvent < HTMLButtonElement >) => {
        e.preventDefault();
        if (user) {
            addFavorites(idUser, id)
            if (respuesta === false) {
                setRespuesta(true)
            } else {
                setRespuesta(false)
            }
        } else {
            const time = () => {
                setOpen(true)
                setTimeout(() => {
                    setOpen(false)
                }, 2000)
            };
            time()
        }
    }

    useEffect(() => {
        function setFavs() {
            const favs = localStorage.getItem('favorites');
            if (favs ?. length) {
                const parseFavs = JSON.parse(favs ? favs : '')
                const filterFavs: movies[] = parseFavs ? parseFavs.filter((el
                : movies) => el.id === id) : console.log('bucle')
                if (filterFavs.length) {
                    setRespuesta(true)
                } else {
                    setRespuesta(false)
                }
            } else 
                return


            


        }

        setFavs()
    }, [idUser])

    return (
        <div className='absolute'>
            {
            idUser ? <div className='absolute top-8'>
                <span></span>
            </div> : <div className={
                open ? "visible bg-primary-400 absolute w-[15rem] -mt-7 -ml-8 rounded-lg   " : 'hidden '
            }>
                <span className=' break-words pl-6 '>
                    {
                    t('favorites.required')
                }
                    <Link to='/login'>
                        <strong className=' text-secundary-50 pl-2'>
                            {
                            t('navBar.login')
                        }</strong>
                    </Link>
                </span>
                <div className="absolute content-[''] left-[10%] -mt-4 translate-x-[-50%] h-5 w-5 bg-primary-400 rotate-[45deg]"></div>
            </div>
        }
            <button onClick={
                    (e) => handleAddFav(e)
                }
                className="absolute  right-0 lg:hover:scale-105 z-10 ">
                <svg xmlns="http://www.w3.org/2000/svg" id='fav' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='hsl(213, 100%, 50%)' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={
                        respuesta ? 'feather mt-2' : ' hover:scale-110 duration-300 mt-2 text-secundary-50'
                }>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>

    )
}
