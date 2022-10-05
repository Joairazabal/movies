import {useEffect, useState} from "react";
import {useLocation, Location, useParams, useSearchParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {populartyMovies, setLoadingHome} from "../../redux/slices/get.slice";
import {movies, moviesState, resultTop, seriesPopular} from "../../redux/types";
import MovieCard from "../movie.card/MovieCard";
import SideBar from "../sideBar/SideBar";
import {topMovies} from "../../redux/slices/topMovies.slice";
import {getEstrenos} from "../../redux/slices/estrenos.slice";
import {searchMovies} from "../../redux/slices/searchMovies.slice";
import ContainerMovies from "../search/ContainerMovies";
import NavBar from "../navbar/NavBar";
import Loading from "../loading/Loading";
import {filterMovies} from "../../redux/slices/allMovies.slice";
import FilterMovies from "./FilterMovies";
import { filterTvSeries } from "../../redux/slices/allSeries.slice";


export function Home() {
    const dispatch = useAppDispatch();
    const params: Location = useLocation();
    let query = params.search.substring(8).toString();
    let filtro = params.search.substring(7)
    


    const movies: moviesState["items"] = useAppSelector(state => state.movies.items);
    const top: resultTop['results'] = useAppSelector(state => state.topMovies.items.results);
    const seriesPopular: seriesPopular[] = useAppSelector(state => state.estrenos.items);
    const search: movies[] = useAppSelector(state => state.searchMovies.items);
    const filters: movies[] = useAppSelector(state => state.allMovies.items)
    const filtersTv: seriesPopular[]= useAppSelector(state=> state.allSeries.items)
    const loading = useAppSelector(state => state.movies.loading)


    const [page, setPage] = useState(1)

    useEffect(() => {
        if ( params.pathname === '/' && params.search.includes('movie')) {
            dispatch(filterMovies(filtro, page))
        } else if (query.length > 3) {
            dispatch(searchMovies(query))
        }
        else if(params.pathname === '/' && params.search.includes('serie')){
            dispatch(filterTvSeries(filtro, page))
        }
        else if( params.pathname === '/' && params.search ==='' || query === ''){
            dispatch(populartyMovies());
            dispatch(topMovies())
            dispatch(getEstrenos())
            setTimeout(()=>{
                dispatch(setLoadingHome())

            }, 500)
        }
    }, [params.search, filtro, page]);
    
    if (loading) return <Loading/>
    
    
    return (
        <section>
            <NavBar/>
            <div className=" bg-primary-100 flex ">
                <SideBar clase='all'/>
                <main className="flex flex-col items-center  sm:w-[100%]">
                    {
                    params.search.includes('movie') ? (
                        <FilterMovies movies={filters} 
                            pages={page}
                            setPage={setPage}/>
                    ) : query.length>3? (
                        <ContainerMovies movie={search}/>
                    ) : params.search.includes('serie')?
                    <FilterMovies movies={filtersTv} 
                            pages={page}
                            setPage={setPage}/>
                    :(
                        <div className="flex flex-col items-center gap-4 sm:w-[70%] lg:w-[90%] ml-4 ">
                            <MovieCard movie={movies}
                                title={'popular'}
                                subtitle={'movies'}
                                clase={'movie'}/>
                            <MovieCard movie={top}
                                title={'top 10'}
                                subtitle={'movies'}
                                clase={'movie'}/>
                            <MovieCard movie={seriesPopular}
                                title={'tv popular'}
                                subtitle={'series '}
                                clase={'tv'}/>
                        </div>

                    )
                } </main>
            </div>
        </section>
    );
}
