
import { FormEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { allMovies } from "../../redux/get.slice";
import { movies, moviesState } from "../../redux/todo.types";
import MovieCard from "../movie.card/MovieCard";
import './home.scss'


export function Home() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.movies.loading);
  const movies:moviesState['items']=useAppSelector((state) => state.movies.items);


  useEffect(() => {
    dispatch(allMovies())    
    }, [dispatch])
  console.log(movies, "axaaa")
  return (
    <section className="home__container">
         <MovieCard movie={movies}/>
    </section>
    )
    
}
