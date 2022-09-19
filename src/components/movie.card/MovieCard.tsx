import React from 'react'
import { movies,  resultTop,  seriesPopular } from '../../redux/types'
import './MovieCard.scss'
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
    <section className='section__container'>
    <div className='section__container--h1'>
    <h1>{title}</h1><strong>{subtitle}</strong>
    </div>
    <div className='container__cards'>
    {movie?.map(el=>{
        return(
          <Card
          title={el.title}
          id={el.id}
          poster_path= {el.poster_path}
          clase={clase}
          
          />
        )
    })}
        
    </div>
    </section>
  )
}
