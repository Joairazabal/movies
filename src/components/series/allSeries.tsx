import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {useLocation} from 'react-router-dom'
import InfinitiScroll from 'react-infinite-scroll-component'
import {filterTvSeries, getAllSeries} from '../../redux/slices/allSeries.slice'
import NavBar from '../navbar/NavBar'
import SideBar from '../sideBar/SideBar'
import Card from '../movie.card/Card'
import Loading from '../loading/Loading'
import {searchMovies} from '../../redux/slices/searchMovies.slice'
import ContainerMovies from '../search/ContainerMovies'
import {setClearSearch} from '../../redux/slices/searchMovies.slice'

export default function Series() {
    const dispatch = useAppDispatch();
    const totalSeries = useAppSelector(state => state.allSeries.items);
    const series = useAppSelector(state => state.searchMovies.items)
    const params = useLocation();
    let genre = params.pathname.substring(8)
    let filtro = params.search.substring(7)

    const [page, setPage] = useState(1)

    useEffect(() => {
        if (filtro.length > 3) {
            dispatch(searchMovies(filtro))
        } else if (genre !== 'all' && genre) {
            dispatch(filterTvSeries(genre, page))
        } else {
            dispatch(setClearSearch())
            dispatch(getAllSeries(page))
        }
    }, [page, filtro, genre])

    console.log(page)

    return (
        <div className=' bg-primary-100 h-screen'>
            <NavBar/>
            <div className='bg-primary-100 flex gap-4  '>
                <SideBar clase='tv'/>
                <div className='mt-10 w-full '>
                    {
                    filtro.length > 3 ? (
                        <ContainerMovies movie={series}/>
                    ) : ! genre.length || genre === 'all' ? (
                        <InfinitiScroll dataLength={
                                totalSeries.length
                            }
                            hasMore={true}
                            next={() => setPage(prevPage => prevPage + 1) }
                            
                            loader={<Loading/>}
                            className='lg:grid lg:grid-cols-5 lg:gap-8  lg:w-[85%] sm:grid sm:grid-cols-1 sm:w-[100%] sm:gap-4'>
                            {
                            totalSeries ?. map((el, index) => {
                                return (
                                    <Card title={
                                            el.name
                                        }
                                        id={
                                            el.id
                                        }
                                        poster_path={
                                            el.poster_path
                                        }
                                        clase={'tv'}
                                        key={index}/>
                                )
                            })
                        } </InfinitiScroll>
                    ) : (
                        <ContainerMovies movie={totalSeries}/>
                    )
                } </div>
            </div>
        </div>
    )
}
