import React from 'react'
import { movies, moviesState } from '../../redux/todo.types'
import './MovieCard.scss'
interface Props{
    movie: Array<movies>

}

export default function MovieCard({ movie }: Props) {
  return (
    <div className='container__cards'>
    {movie?.map(el=>{
        return(
        <div className='card__container'>
        <div className='card__container card__container--img'>
        <img src={'https://image.tmdb.org/t/p/w500/'+ el.poster_path} alt="" className='card__img' /> 
        </div>
        <div className='card__container card__container--img'>
        <h1>{el.title}</h1>
        </div>
        </div>
        )
    })}
        
    </div>
  )
}
