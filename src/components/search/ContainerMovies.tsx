import React from 'react'
import { movies } from '../../redux/types'

interface Props{
    movie: movies[]
}

export default function ({movie}:Props) {
  return (
    <section>
    {
        movie.map(el=>{
            return(
                <div>
                <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={`${el.title}`} />
                <h2>{el.title}</h2>
                </div>
            )
        })
    }
    </section>
  )
}
