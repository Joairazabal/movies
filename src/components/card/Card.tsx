import React from 'react'
import {Link} from 'react-router-dom'
import AddFavorites from '../favorites/AddFavorites';
import notImage from './imageNotfound.png'
import {Ring} from '@uiball/loaders'


interface Props {
    poster_path: string | null;
    title: string | null;
    id: number | null | string;
    clase: string | undefined
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
                {
                poster_path ? <img src={
                        !poster_path ? notImage : `https://image.tmdb.org/t/p/w500/${poster_path}`
                    }
                    loading='lazy'
                    alt={
                        `${title} not found`
                    }
                    className='flex lg:h-[14rem] lg:w-[10rem] sm:h-[14rem]   lg:rounded-[10px] sm:rounded-lg gridP
                                            lg:hover:focus:rounded-[10px] lg:hover:duration-100 lg:hover:opacity-40'/> : <div className='flex justify-center items-center h-full'>
                    <Ring size={40}
                        lineWeight={5}
                        speed={2}
                        color="#f5f5f5f5"/>
                </div>
            }
                <h1 className='lg:text-xl sm:text-lg break-words font-Nunito text-secundary mt-2 sm:w-[10rem] lg:w-[10rem] text-center  '>
                    {title}</h1>
            </Link>
        </div>
    )
}
