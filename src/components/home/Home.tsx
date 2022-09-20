import { useEffect, useState} from "react";
import { useLocation, Location} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { populartyMovies } from "../../redux/slices/get.slice";
import { movies, moviesState, resultTop, seriesPopular } from "../../redux/types";
import MovieCard from "../movie.card/MovieCard";
import SideBar from "../sideBar/SideBar";
import { topMovies } from "../../redux/slices/topMovies.slice";
import { getEstrenos } from "../../redux/slices/estrenos.slice";
import { searchMovies } from "../../redux/slices/searchMovies.slice";
import ContainerMovies from "../search/ContainerMovies";
import NavBar from "../navbar/NavBar";
import Loading from "../loading/Loading";
import {useAuth0} from '@auth0/auth0-react'

export function Home() {
  const dispatch = useAppDispatch();
  const params:Location= useLocation();
  let query= params.search.substring(8).toString();
  const {user}=useAuth0()  


  const movies: moviesState["items"] = useAppSelector(state => state.movies.items);
  const top: resultTop['results']= useAppSelector(state => state.topMovies.items.results);
  const seriesPopular: seriesPopular[]= useAppSelector(state=> state.estrenos.items);
  const search:movies[]= useAppSelector(state=> state.searchMovies.items);
 
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setTimeout(()=>{
      setloading(false)
    },500)
    if(params.search === '' || query.length > 45  ){
    dispatch(populartyMovies());
    dispatch(topMovies())
    dispatch(getEstrenos())
    }else dispatch(searchMovies(query))
  }, [params]);
console.log(movies[4].backdrop_path)
  if(loading) return <Loading/>

  return (
    <section >
      <NavBar/>
      <div className=" bg-primary-100 flex ">
      <SideBar />
      <main className="flex flex-col items-center">
     {  search.length?(
      <ContainerMovies movie={search}/>
     ):
     (
      <div className="">
       <img src={`https://image.tmdb.org/t/p/w1280/${movies[8].backdrop_path}`} alt="asdasd" 
        className="flex absolute w-[80%] h-[40vh] bg-center"/>
        <div className="absolute">
          <h1>{movies[8].title}</h1>
        </div>
       
      <div className="flex flex-col items-center gap-4 w-[80%] ml-4">
      <MovieCard movie={movies}
        title={'popular'}
        subtitle={'movies'}
        clase={'movie'} />
      <MovieCard movie={top}
        title={'top 10'}
        subtitle={'movies'}
        clase={'movie'} />
      <MovieCard
      movie={seriesPopular}
      title={'tv popular'}
      subtitle={'series '}
      clase={'serie'}/>
      </div>
      </div>
      )}
      </main>
      </div>
    </section>
  );
}
