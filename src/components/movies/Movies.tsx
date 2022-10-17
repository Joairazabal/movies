import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {useLocation, useSearchParams} from 'react-router-dom'
import InfinitiScroll from 'react-infinite-scroll-component'
import {allMovies, filterMovies} from '../../redux/slices/allMovies.slice'
import NavBar from '../navbar/NavBar'
import SideBar from '../sideBar/SideBar'
import Card from '../card/Card'
import Loading from '../loading/Loading'
import {searchMovies, setClearSearch} from '../../redux/slices/searchMovies.slice'
import ContainerMovies from '../search/ContainerMovies'
import {useTranslation} from 'react-i18next'
import {BiLeftArrow} from 'react-icons/bi'
import {BiRightArrow} from 'react-icons/bi'
import Paginated from '../../paginated/Paginated'


export default function Movies() {
    const dispatch = useAppDispatch();
    const params = useLocation();
    const {t} = useTranslation();


    const totalMovies = useAppSelector(state => state.allMovies.items);
    const movies = useAppSelector(state => state.searchMovies.items)

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    let [parametros, setSearchParams] = useSearchParams();

    let query = params.search.substring(8).toString();
    let genre = params.pathname.substring(8)
    let pages = parametros.get('page')

    useEffect(() => {
        if (query.length > 3) {
            dispatch(searchMovies(query))
        } else if (genre !== 'all' && genre) {
            let parseParams = parseInt(pages ? pages : '1', 10)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            dispatch(filterMovies(genre, parseParams))
        } else 
            dispatch(setClearSearch())
         dispatch(allMovies(page))
    }, [genre, page, query, params.search])


    if (! totalMovies.length && ! movies.length) 
        return <Loading></Loading>


    


    return (
        <div className=' bg-primary-100 h-screen'>
            <NavBar/>
            <div className='bg-primary-100 flex gap-4'>
                <SideBar clase='movie'/>
                <div className='flex lg:flex-col lg:items-center mt-10 w-full sm:flex-col sm:items-center '>
                    <h1 className='text-secundary-50 text-4xl font-Nunito mb-8' id='#header'>
                        {
                        t('navBar.movies')
                    }</h1>
                    {
                    movies.length ? (
                        <ContainerMovies movie={movies}/>
                    ) : ! genre.length || genre === 'all' ? (
                        <InfinitiScroll dataLength={
                                totalMovies.length
                            }
                            hasMore={true}
                            next={
                                () => setPage((prevPage : number) => prevPage + 1)
                            }
                            loader={<Loading/>}
                            className='lg:grid lg:grid-cols-5 lg:gap-8  sm:grid sm:grid-cols-1 md:grid-cols-3 sm:w-[100%] sm:gap-4'>
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
                        <div className='flex items-center flex-col w-full'>
                            {
                            loading ? <Loading/>: (
                                <><ContainerMovies movie={totalMovies}
                                        classe={'movie'}/><Paginated clase='movie'
                                        genre={genre}
                                        set={setLoading}/></>
                            )
                        } </div>
                    )
                } </div>
            </div>
        </div>
    )
}
