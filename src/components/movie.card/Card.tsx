import React from 'react' 
import {Link} from 'react-router-dom'

interface Props{
    poster_path:string | null
    title: String | null 
    id:number | null | undefined
    clase: string | null
}

export default function Card({ poster_path, title, id, clase}: Props) {
  return (
    <div className='flex flex-col items-center gap-3 text-center'>
                <Link to={`/${clase}/${id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`${title}`} 
                className='flex h-[20rem] w-[14rem] rounded-[10px]' />
                <h1 className='text-xl font-Nunito text-secundary'>{title}</h1>
                </Link>
    </div>
  )
}
