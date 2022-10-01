import {useEffect, useState} from "react";
import {useLocation, Location, useParams, useSearchParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {populartyMovies} from "../../redux/slices/get.slice";
import {movies, moviesState, resultTop, seriesPopular} from "../../redux/types";
import MovieCard from "../movie.card/MovieCard";
import SideBar from "../sideBar/SideBar";
import {topMovies} from "../../redux/slices/topMovies.slice";
import {getEstrenos} from "../../redux/slices/estrenos.slice";
import {searchMovies} from "../../redux/slices/searchMovies.slice";
import ContainerMovies from "../search/ContainerMovies";
import NavBar from "../navbar/NavBar";
import Loading from "../loading/Loading";
import {allMovies, filterMovies} from "../../redux/slices/allMovies.slice";
import FilterMovies from "./FilterMovies";


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

    const [loading, setloading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 300)
        if (params.search.includes('genre')) {
            dispatch(filterMovies(filtro, page))
        } else if (query.length > 3) {
            dispatch(searchMovies(query))
        } else if( params.pathname === '/' && params.search ==='' || query === ''){
            dispatch(populartyMovies());
            dispatch(topMovies())
            dispatch(getEstrenos())
        }
    }, [params.search, filtro, page]);
    
    if (loading) 
        return <Loading/>
    
    return (
        <section>
            <NavBar/>
            <div className=" bg-primary-100 flex ">
                <SideBar/>
                <main className="flex flex-col items-center  sm:w-[100%]">
                    {
                    params.search.includes('genre') ? (
                        <FilterMovies movies={filters}
                            pages={page}
                            setPage={setPage}/>
                    ) : query.length>3? (
                        <ContainerMovies movie={search}/>
                    ) : (
                        <div className="flex flex-col items-center gap-4 sm:w-[100%] lg:w-[80%] ml-4 ">
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
