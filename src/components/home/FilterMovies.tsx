import React, {useState} from 'react'
import {movies, seriesPopular} from '../../redux/types'
import InfinitiScroll from 'react-infinite-scroll-component'
import Loading from '../loading/Loading'
import Card from '../movie.card/Card'


interface Props {
    movies: movies[] | seriesPopular[],
    pages: number,
    setPage: any,
  
}

export default function FilterMovies({movies, pages, setPage} : Props) {

    console.log(movies)
    return (
        <div>
            <InfinitiScroll dataLength={
                    movies.length
                }
                hasMore={true}
                next={
                    () => setPage((prevPage : number) => prevPage + 1)
                }
                loader={<Loading/>}
                className='lg:grid lg:grid-cols-5 lg:gap-8  lg:w-[90%] sm:grid sm:grid-cols-1 sm:w-[100%] sm:gap-4 sm:mt-10' >
                {
                movies ?. map((el, index) => {
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
        </div>
    )
}
