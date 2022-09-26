import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {allMovies} from '../../redux/slices/allMovies.slice';
import Card from '../movie.card/Card';

export default function Sugerencias() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(allMovies(4))
    }, [])

    const movies = useAppSelector(state => state.allMovies.items)
    const shortMovies = movies.slice(1, 11)
    return (
        <div className='flex flex-col items-center gap-8'>

            <h1 className=' font-PT text-4xl text-secundary-50'>Sugerenciaas</h1>
            <div className='grid grid-cols-5 gap-8 w-[70%] '>
                {
                shortMovies ?. map(el => {
                    return (
                        <Card poster_path={
                                el.poster_path
                            }
                            title={
                                el.title
                            }
                            clase={
                                el.media_type
                            }
                            id={
                                el.id
                            }/>
                    )
                })
            } </div>
        </div>
    )
}
