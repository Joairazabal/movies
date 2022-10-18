import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {useLocation} from 'react-router-dom'
import InfinitiScroll from 'react-infinite-scroll-component'
import {filterTvSeries, getAllSeries} from '../../redux/slices/allSeries.slice'
import NavBar from '../navbar/NavBar'
import SideBar from '../sideBar/SideBar'
import Card from '../card/Card'
import Loading from '../loading/Loading'
import {searchMovies} from '../../redux/slices/searchMovies.slice'
import ContainerMovies from '../search/ContainerMovies'
import {setClearSearch} from '../../redux/slices/searchMovies.slice'
import Paginated from '../paginated/Paginated'
import {useSearchParams} from 'react-router-dom'


export default function Series() {
    const dispatch = useAppDispatch();
    const totalSeries = useAppSelector(state => state.allSeries.items);
    const series = useAppSelector(state => state.searchMovies.items)
    const params = useLocation();

    let [parametros, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true)

    let genre = params.pathname.substring(8)
    let filtro = params.search.substring(7)
    let pages = parametros.get('page')
    const [page, setPage] = useState(1)

    let language = localStorage.getItem('lng')

    useEffect(() => {
        if (filtro.length > 3) {
            dispatch(searchMovies(filtro,language))
        } else if (genre !== 'all' && genre) {
            let parseParams = parseInt(pages ? pages : '1', 10)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            dispatch(filterTvSeries(genre, parseParams, language))
        } else {
            dispatch(setClearSearch())
            dispatch(getAllSeries(page, language))
        }
    }, [ language,page,genre, filtro,params.search])


    return (
        <div className=' bg-primary-100 h-screen'>
            <NavBar/>
            <div className='bg-primary-100 flex gap-4  '>
                <SideBar clase='tv'/>
                <div className='mt-10 w-full grid justify-items-center '>
                    <h1 className='text-secundary-50 text-4xl font-Nunito mb-4' id='#header'>
                        Series</h1>
                    {
                    filtro.length > 3 ? (
                        <ContainerMovies movie={series}/>
                    ) : ! genre.length || genre === 'all' ? (
                        <InfinitiScroll dataLength={
                                totalSeries.length
                            }
                            hasMore={true}
                            next={
                                () => setPage(prevPage => prevPage + 1)
                            }

                            loader={<Loading/>}
                            className='lg:grid lg:grid-cols-5 lg:gap-8  sm:grid sm:grid-cols-1 md:grid-cols-3 sm:w-[100%] sm:gap-4'>
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
                        <section className='flex flex-col items-center w-full'>
                            {
                            loading ? <Loading/>: <>
                                <ContainerMovies movie={totalSeries}
                                    classe={'tv'}/>
                                <Paginated clase='tv'
                                    genre={genre}
                                />
                            </>
                        } </section>
                    )
                } </div>
            </div>
        </div>
    )
}
