import React,{useState} from 'react'
import {GrFavorite} from 'react-icons/gr'
import {
    getFirestore,
    getDoc,
    doc,
    updateDoc
} from 'firebase/firestore'
import firebaseApp from '../fireBase'
import {movies, topMovies} from '../redux/types'
import useUser from '../hooks/useUser'

interface Props {
    id: string | null | number 
    movie: topMovies
}

export default function AddFavorites({id, movie} : Props) {

    const firestore = getFirestore(firebaseApp);

    // esta funcion va a recibir el id de la movie
    // deberia crear una funcion que pregunte a la db si existe ese
    // id dentro de el array de favorites y sino es asi que lo pushee
    const user = useUser();
    const idUser = user?.email;



    async function addFavorites(idUser : string, id : string | number | null) { // referencia a los favoritos
        try{
        const favRef = doc(firestore, `usuarios/${idUser}`)
        // busco el documento
        const consulta = await getDoc(favRef);
        const resolve = consulta.data();
        const favs: movies[] | null = resolve ?. favorites.filter((el : movies) => el.id === id)
        if (favs ?. length) {
            return alert('ya existe papa')
        } else {
            const consulta = await getDoc(favRef);
            const resolve = consulta.data();
            const pushFavs = resolve ?. favorites.concat(movie)
            await updateDoc(favRef, {favorites: pushFavs})
            window.localStorage.setItem('favorites', JSON.stringify(pushFavs))
        }}catch(error){
            console.error(error)
        }
    }

    const [respuesta, setRespuesta]= useState('')

    const handleAddFav = (e : React.MouseEvent < HTMLButtonElement >) => {
        e.preventDefault();
        if(user){
        addFavorites(idUser, id)
        setRespuesta('successfully added')
        }else setRespuesta('you have to be registered to save favorites')
        
    }

    return (

        <button onClick={
                (e) => handleAddFav(e)
            }
            className="absolute "><GrFavorite className='text-secundary mt-2'/>
            {respuesta.includes('added')?
                <div>
                <span>{respuesta}</span>
                </div>
            :
            <div>
            <span>{respuesta}</span>
            </div>
            }
        </button>

    )
}
