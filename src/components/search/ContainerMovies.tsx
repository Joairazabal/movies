import React from 'react'
import { movies } from '../../redux/types'
import {Link} from 'react-router-dom'

interface Props{
    movie: movies[]
}

export default function ({movie}:Props) {
  return (
    <section className='grid grid-cols-5 w-[90%] gap-8 bg-primary-100 mt-10'>
    {
        movie.map(el=>{
            return(
                <div className='flex flex-col items-center gap-3 text-center'>
                <Link to={`/movie/${el.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={`${el.title}`} 
                className='flex h-[20rem] w-[14rem] rounded-[10px]' />
                <h1 className='text-xl font-Nunito text-secundary'>{el.title}</h1>
                </Link>
                </div>
            )
        })
    }
    </section>
  )
}
