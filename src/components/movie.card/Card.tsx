import React from 'react'
import {Link} from 'react-router-dom'
import notImage from './imageNotfound.png'

interface Props {
    poster_path: string | null;
    title: String | null;
    id: number | null | undefined;
    clase: string
}

export default function Card({poster_path, title, id, clase} : Props) {
    return (
        <div className='flex flex-col items-center text-center'>
            <Link to={
                `/${clase}/${id}`
            }>
                <img src={
                        !poster_path ? notImage : `https://image.tmdb.org/t/p/w500/${poster_path}`
                    }
                    alt={notImage}
                    className='flex lg:h-[16rem] lg:w-[16rem] sm:h-[14rem]   lg:rounded-[10px] sm:rounded-lg'/>
                <h1 className='lg:text-xl sm:text-lg break-words font-Nunito text-secundary mt-2 sm:w-[10rem] text-center  '>
                    {title}</h1>
            </Link>
        </div>
    )
}
