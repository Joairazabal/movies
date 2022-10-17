import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {suggestionsMovies} from '../../redux/slices/allMovies.slice';
import Card from '../card/Card';
import {useTranslation} from 'react-i18next';

export default function Sugerencias() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(suggestionsMovies(100))
    }, [])

    const movies = useAppSelector(state => state.allMovies.items)
    const shortMovies = movies.slice(1, 11)
    const {t} = useTranslation();
    return (
        <div className='flex flex-col items-center gap-8'>

            <h1 className=' font-PT text-4xl text-secundary-50'>
                {
                t('Suggestions')
            }</h1>
            <div className='lg:grid lg:grid-cols-5 lg:gap-8 md:grid md:grid-cols-4 md:gap-8 lg:w-[70%] sm:grid-cols-1 sm:gap-4 sm:w-[85%]  '>
                {
                shortMovies ?. map(el => {
                    return (
                        <div className='my-4'
                            key={
                                el.id
                        }>
                            <Card poster_path={
                                    el.poster_path
                                }
                                title={
                                    el.title
                                }
                                clase={'movie'}
                                id={
                                    el.id
                                }/>
                        </div>
                    )
                })
            } </div>
        </div>
    )
}
