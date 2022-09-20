import React from 'react'
import { movies,  resultTop,  seriesPopular } from '../../redux/types'
import {Link} from 'react-router-dom'
import Card from './Card'

interface Props{
    movie: Array<movies> | resultTop['results'] | seriesPopular[]
    subtitle:string
    title:string
    clase:string
}


export default function MovieCard( {movie, title, subtitle, clase}: Props) {
  return (
    <section className='mt-10 '>
    <div className='flex items-center gap-2 mb-8'>
    <h1 className=' font-PT text-secundary-50 text-4xl'>{title}</h1><strong className=' font-Nunito text-4xl text-secundary'>{subtitle}</strong>
    </div>
    <div className='grid grid-cols-5  gap-8'>
    {movie?.map(el=>{
        return(
          <Card
          title={el.title?el.title:el.name}
          id={el.id}
          poster_path= {el.poster_path}
          clase={clase}
          key={el.id}
          />
        )
    })}
        
    </div>
    </section>
  )
}
