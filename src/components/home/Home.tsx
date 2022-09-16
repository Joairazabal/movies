import { useEffect } from "react";
import {useParams, useLocation, Location} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { populartyMovies } from "../../redux/slices/get.slice";
import { movies, moviesState, resultTop, seriesPopular } from "../../redux/types";
import MovieCard from "../movie.card/MovieCard";
import SideBar from "../sideBar/SideBar";
import { topMovies } from "../../redux/slices/topMovies.slice";
import { getEstrenos } from "../../redux/slices/estrenos.slice";
import { searchMovies } from "../../redux/slices/searchMovies.slice";
import ContainerMovies from "../search/ContainerMovies";

export function Home() {
  const dispatch = useAppDispatch();
  const params:Location= useLocation();
  
  const movies: moviesState["items"] = useAppSelector(state => state.movies.items );
  const top: resultTop['results']= useAppSelector(state => state.topMovies.items.results)
  const seriesPopular: seriesPopular[]= useAppSelector(state=> state.estrenos.items)
  const search:movies[]= useAppSelector(state=> state.searchMovies.items)

  
  let query= params.search.substring(8).toString();

  useEffect(() => {
    if(query.length === 0 || params.search.length === 8){
    dispatch(populartyMovies());
    dispatch(topMovies())
    dispatch(getEstrenos())
    }else dispatch(searchMovies(query))
    console.log(params)
  }, [ params]);

  return (
    <section className=" bg-primary-100 flex gap-6">
      <SideBar />
      <main className="w-[80%] flex flex-col items-center">
     {  search.length?(
      <ContainerMovies movie={search}/>
     ):
     (
      <div>
      <MovieCard movie={movies}
        title={'popular'}
        subtitle={'movies'} />
      <MovieCard movie={top}
        title={'top 10'}
        subtitle={'movies'} />
      <MovieCard
      movie={seriesPopular}
      title={'tv popular'}
      subtitle={'series '}/>
      </div>
)
}
      </main>
    </section>
  );
}
