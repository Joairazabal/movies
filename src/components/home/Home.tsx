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

export function Home() {
  const dispatch = useAppDispatch();
  const params:Location= useLocation();
  let query= params.search.substring(8).toString();

  const movies: moviesState["items"] = useAppSelector(state => state.movies.items );
  const top: resultTop['results']= useAppSelector(state => state.topMovies.items.results);
  const seriesPopular: seriesPopular[]= useAppSelector(state=> state.estrenos.items);
  const search:movies[]= useAppSelector(state=> state.searchMovies.items);
 
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setTimeout(()=>{
      setloading(false)
    },500)
    if(params.search === '' || query.length === 0  ){
    dispatch(populartyMovies());
    dispatch(topMovies())
    dispatch(getEstrenos())
    }else dispatch(searchMovies(query))
  }, [dispatch,params]);

  if(loading) return <Loading/>

  return (
    <section >
      <NavBar/>
      <div className=" bg-primary-100 flex gap-6">
      <SideBar />
      <main className="w-[80%] flex flex-col items-center">
     {  search.length?(
      <ContainerMovies movie={search}/>
     ):
     (
      <div>
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
      
)
}
      </main>
      </div>
    </section>
  );
}
