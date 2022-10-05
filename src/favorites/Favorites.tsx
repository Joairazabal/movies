import React, {useEffect, useState} from 'react'
import {getFirestore, getDoc, doc, setDoc} from 'firebase/firestore'
import firebaseApp from '../fireBase'
import { movies, topMovies } from '../redux/types'
import Card from '../components/movie.card/Card'
import Navbar from '../components/navbar/NavBar'

interface Props {
    usuario: any
}

export default function Favorites({usuario} : Props) {

    const firestore = getFirestore(firebaseApp);

    async function searchFavorites(idFav : any) { // referencia a los favoritos
        const favRef = doc(firestore, `usuarios/${idFav}`)
        // busco el documento
        const consulta = await getDoc(favRef);
        if (consulta.exists()) { // si existe
            const resolve = consulta.data();
            return resolve.favorites
        } else { // si no existe
            await setDoc(favRef, {favorites: []})
            getDoc(favRef)
            const consulta = await getDoc(favRef);
            const resolve = consulta.data();
            return alert('no estas registrado')
        }
    }
    const [favs, setFavs] = useState (()=>{
        const saved = localStorage.getItem("favorites");
        if(saved?.length){
            const initialValue = JSON.parse(saved)
            return initialValue 
    }else{
        return 'no existen favs'
    }})
    
    console.log(favs)

    useEffect(() => {
        async function fetchFavs(usuario:string) {
            const favorites = await searchFavorites(usuario)
            const favoritesParse= JSON.stringify(favorites)
            localStorage.setItem('favorites', favoritesParse)
            console.log(localStorage)
        }
        fetchFavs(usuario)
    }, [usuario])



    return (
        <>
        <Navbar/>
        <div className='bg-primary-100 flex justify-center'>
        <div className='flex flex-col gap-12 mt-10'>
           <h1 className=' font-Nunito text-4xl text-secundary-50'>Favorites</h1>
           <div className='container'>
           {favs? favs.map((el:topMovies, index:number)=>{
                return(
                <div className='' key={index}>
                <Card poster_path={el.poster_path} title={el.title} id={el.id} clase={'movie'}/>
                </div>
            )}): <span>hola</span>
        }    
        </div>
        </div>
        </div>
        </>
    )
}
