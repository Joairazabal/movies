import React from 'react'
import { movies,  resultTop,  seriesPopular,  topMovies, } from '../../redux/types'
import './MovieCard.scss'
import {Link} from 'react-router-dom'

interface Props{
    movie: Array<movies> | resultTop['results'] | seriesPopular[]
    subtitle:string
    title:string
}


export default function MovieCard( {movie, title, subtitle}: Props) {
  return (
    <section className='section__container'>
    <div className='section__container--h1'>
    <h1>{title}</h1><strong>{subtitle}</strong>
    </div>
    <div className='container__cards'>
    {movie?.map(el=>{
        return(
        <div className='card__container' key={el.id}>
        <Link to={`movie/${el.id}`}>
        <div className='card__container card__container--img'>
        <img src={'https://image.tmdb.org/t/p/w500/'+ el.poster_path} alt="" className='card__img' /> 
        </div>
        <div className='card__container card__container--img'>
        <h1 className='aside__h1'>{el.title?el.title:el.name}</h1>
        </div>
        </Link>      
        </div>
        )
    })}
        
    </div>
    </section>
  )
}
