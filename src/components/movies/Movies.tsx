import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {useLocation} from 'react-router-dom'
import InfinitiScroll from 'react-infinite-scroll-component'
import {allMovies, filterMovies} from '../../redux/slices/allMovies.slice'
import NavBar from '../navbar/NavBar'
import SideBar from '../sideBar/SideBar'
import Card from '../movie.card/Card'
import Loading from '../loading/Loading'
import {searchMovies, setClearSearch} from '../../redux/slices/searchMovies.slice'
import ContainerMovies from '../search/ContainerMovies'


export default function Movies() {
    const dispatch = useAppDispatch();
    const params = useLocation();
    let query = params.search.substring(8).toString();

    const totalMovies = useAppSelector(state => state.allMovies.items);
    const movies = useAppSelector(state => state.searchMovies.items)

    let genre = params.pathname.substring(8)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (query.length > 3) {
            dispatch(searchMovies(query))
        } else if (genre !== 'all') {
            dispatch(filterMovies(genre, page))
        } else 
            dispatch(setClearSearch())
         dispatch(allMovies(page))
    }, [genre, page, query])


    return (
        <div className=' bg-primary-100 h-screen'>
            <NavBar/>
            <div className='bg-primary-100 flex gap-4'>
                <SideBar clase='movie'/>
                <div className='flex lg:flex-col lg:items-center mt-10 w-full sm:flex-col sm:items-center '>
                    {
                    movies.length ? (
                        <ContainerMovies movie={movies}/>
                    ) : ! genre.length || genre === 'all' ? (
                        <InfinitiScroll dataLength={
                                totalMovies.length
                            }
                            hasMore={true}
                            next={
                                () => setPage(prevPage => prevPage + 1)
                            }
                            loader={<Loading/>}
                            className='lg:grid lg:grid-cols-5 lg:gap-8  sm:grid sm:grid-cols-1 sm:w-[100%] sm:gap-4'>
                            {
                            totalMovies ?. map((el, index) => {
                                return (
                                    <Card title={
                                            el.title
                                        }
                                        id={
                                            el.id
                                        }
                                        poster_path={
                                            el.poster_path
                                        }
                                        clase={'movie'}
                                        key={index}/>
                                )
                            })
                        } </InfinitiScroll>
                    ) : query.length > 3 ? (
                        <ContainerMovies movie={movies}/>
                    ) : (
                        <ContainerMovies movie={totalMovies}/>
                    )
                } </div>
            </div>
        </div>
    )
}
