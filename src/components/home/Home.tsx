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
import {filterTvSeries} from "../../redux/slices/allSeries.slice";


export function Home() {
    const dispatch = useAppDispatch();
    const params: Location = useLocation();
    let query = params.search.substring(8).toString();
    let filtro = params.search.substring(7)


    const movies: moviesState["items"] = useAppSelector(state => state.movies.items);
    const top: resultTop['results'] = useAppSelector(state => state.topMovies.items.results);
    const seriesPopular: seriesPopular[] = useAppSelector(state => state.estrenos.items);
    const search: movies[] = useAppSelector(state => state.searchMovies.items);
    const loading = useAppSelector(state => state.movies.loading)


    useEffect(() => {
        if (query.length > 3) {
            dispatch(searchMovies(query))
        } else {
            if (params.pathname === '/' && params.search === '' || query === '') {
                dispatch(populartyMovies());
                dispatch(topMovies());
                dispatch(getEstrenos());
                setTimeout(() => {
                    dispatch(setLoadingHome())

                }, 600)

            }
        }
    }, [params.search, filtro]);

    if (loading) 
        return <Loading/>

console.log(process.env.API_KEY_FB)

    return (
        <section>
            <NavBar/>
            <div className=" bg-primary-100 flex ">
                <SideBar clase='all'/>
                <main className="flex flex-col items-center w-full  sm:w-[100%]">
                    {
                    query.length > 3 ? (
                        <ContainerMovies movie={search}/>
                    ) : (
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
