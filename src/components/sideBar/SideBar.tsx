import React from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {allGenres} from '../../redux/slices/genres.slice'
import {typeGenres} from '../../redux/types'
import {useEffect} from 'react'
import ListGenres from './ListGenres'
import { useTranslation } from 'react-i18next'



interface Props {
    clase: string
}

export default function SideBar({clase} : Props) {

    const dispatch = useAppDispatch()
    const genres: typeGenres['items'] = useAppSelector((state) => state.genres.items);
    const {t}= useTranslation();

    let lenguage = localStorage.getItem('lng')

    useEffect(() => {
        if (clase === 'all') {
            dispatch(allGenres('all', lenguage))
        } else {
            dispatch(allGenres(clase, lenguage))
        }
    }, [dispatch,lenguage])


    return (
        <aside className='lg:w-[30%] bg-primary-300 flex flex-col items-center sm:w-[60%]'>

            {
            clase === 'all' ? <div className='gap-4'>
                <li className='list-none'>
                    <div className='mt-8 w-[90%] text-left '>
                        <h1 className='font-Nunito text-secundary lg:text-2xl sm:text-sm md:text-xl '>{t('asideBar.genresMovies')}</h1>
                        <ListGenres genres={
                                genres.genresMovies
                            }
                            clase={'movie'}/>
                    </div>
                </li>
                <li className='list-none'>
                    <div className='mt-8 w-[80%] text-left'>
                        <h1 className='font-Nunito text-secundary lg:text-2xl sm:text-sm md:text-xl list-none'>{t('asideBar.genresTvs')}</h1>
                        <ListGenres genres={
                                genres.genresTv
                            }
                            clase={'serie'}/>
                    </div>
                </li>
            </div> : clase === 'movie' ? <div className='mt-8 w-[90%] text-left'>
                <h1 className='font-Nunito text-secundary lg:text-2xl sm:text-sm md:text-xl'>Genres Movies</h1>
                <ListGenres genres={
                        genres.genresMovies
                    }
                    clase={'movie'}/>
            </div> : <div className='mt-8 w-[90%] text-left'>
                <h1 className='font-Nunito text-secundary lg:text-2xl sm:text-sm md:text-xl'>Genres Tvs</h1>
                <ListGenres genres={
                        genres.genresTv
                    }
                    clase={'serie'}/>
            </div>
        } </aside>
    )
}
