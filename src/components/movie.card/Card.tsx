import React from 'react'
import {Link} from 'react-router-dom'
import AddFavorites from '../../favorites/AddFavorites';
import notImage from './imageNotfound.png'

interface Props {
    poster_path: string | null;
    title: string | null;
    id: number | null | string;
    clase: string
}

export default function Card({poster_path, title, id, clase} : Props) {

    let movie = {
        poster_path: poster_path,
        title: title,
        id: id,
        name: null
    }
    return (
        <div className='flex flex-col items-center text-center '>
            <Link to={
                `/${clase}/${id}`
            }>
                <div className='flex justify-end mr-4'>
                    <AddFavorites movie={movie}
                        id={id}/>
                </div>
                <img src={
                        !poster_path ? notImage : `https://image.tmdb.org/t/p/w500/${poster_path}`
                    }

                    alt={notImage}
                    className='flex lg:h-[16rem] lg:w-[11rem] sm:h-[14rem]   lg:rounded-[10px] sm:rounded-lg gridP lg:hover:scale-105 lg:hover:duration-100 lg:hover:opacity-40'/>
                <span>{}</span>
                <h1 className='lg:text-xl sm:text-lg break-words font-Nunito text-secundary mt-2 sm:w-[10rem] text-center  '>
                    {title}</h1>
            </Link>
        </div>
    )
}
