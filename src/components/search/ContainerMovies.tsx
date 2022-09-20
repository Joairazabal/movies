import React,{useEffect} from 'react'
import { movies,seriesPopular, person } from '../../redux/types'

import Card from '../movie.card/Card'

interface Props{
    movie: movies[] | seriesPopular[] | person[]
}

export default function ({movie}:Props) {

const foto=(el:any)=>{
if(el.profile_path)return el.profile_path
else if(el.poster_path) return el.poster_path
}

console.log(movie)
  return (
    <section className='grid grid-cols-5 w-[80%] gap-8 bg-primary-100 mt-10'>
    {movie?.map(el=>{
      return(
        <Card
        poster_path={foto(el)}
        title={el.title?el.title:el.name}
        clase={el.media_type}
        id={el.id}
        />
        )
    })}
    </section>
  )
}
