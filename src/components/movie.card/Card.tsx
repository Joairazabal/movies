import React from 'react' 
import {Link} from 'react-router-dom'
import notImage from './imageNotfound.png'

interface Props{
    poster_path:string | null
    title: String | null 
    id:number | null | undefined
    clase: string 
}

export default function Card({ poster_path, title, id, clase}: Props) {
  return (
    <div className='flex flex-col items-center text-center'>
                <Link to={`/${clase}/${id}`}>
                <img src={!poster_path?notImage:`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={notImage} 
                className='flex h-[18rem] w-[14rem] rounded-[10px]' />
                <h1 className='text-xl font-Nunito text-secundary mt-2'>{title}</h1>
                </Link>
    </div>
  )
}
