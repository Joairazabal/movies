
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { allMovies } from "../../redux/slices/get.slice";
import { movies, moviesState } from "../../redux/types";
import MovieCard from "../movie.card/MovieCard";
import './home.scss'
import SideBar from "../sideBar/SideBar";

export function Home() {
  const dispatch = useAppDispatch();
  let movies:moviesState['items']=useAppSelector((state) => state.movies.items);


  useEffect(() => {
    dispatch(allMovies())    
    }, [dispatch])
  return (
    <section className="home__container">
      <SideBar/>
         <MovieCard movie={movies}/>
    </section>
    )
    
}
