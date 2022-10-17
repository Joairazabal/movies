import {SetState} from 'immer/dist/internal';
import React from 'react'
import {BiLeftArrow} from 'react-icons/bi'
import {BiRightArrow} from 'react-icons/bi'
import {useSearchParams} from 'react-router-dom'
import {useAppDispatch} from '../hooks/redux';
import {filterMovies} from '../redux/slices/allMovies.slice'
import {filterTvSeries} from '../redux/slices/allSeries.slice'

interface Props {
    clase: string;
    genre: string;
    set: React.Dispatch < React.SetStateAction < boolean >>
}

export default function Paginated({clase, genre, set} : Props): any {

    const dispatch = useAppDispatch();
    let [parametros, setSearchParams] = useSearchParams();

    const handleSetPageIncrement = (e : React.MouseEvent < HTMLButtonElement >, parametros : URLSearchParams) => {
        e.preventDefault();
        if (parametros.get('page')) {
            let getParams = parametros.get('page')
            let paramsIncremented = parseInt(getParams ? getParams : '1', 10) + 1
            parametros.set('page', paramsIncremented.toString())
            setSearchParams(parametros)
            if (clase === 'movie') {
                dispatch(filterMovies(genre, paramsIncremented))
            } else {
                dispatch(filterTvSeries(genre, paramsIncremented))
            }
        } else {
            setSearchParams({page: '2'})
        }
    }

    const handleSetPageDecrement = (e : React.MouseEvent < HTMLButtonElement >) => {
        e.preventDefault();

        if (parametros.get('page')) {
            let getParams = parametros.get('page')
            let paramsIncremented = parseInt(getParams ? getParams : '1', 10) - 1
            parametros.set('page', paramsIncremented.toString())
            setSearchParams(parametros)
            if (clase === 'movie') {
                setTimeout(() => {
                    set(false)
                }, 1000)
                dispatch(filterMovies(genre, paramsIncremented))
            } else {
                setTimeout(() => {
                    set(false)
                }, 500)
                dispatch(filterTvSeries(genre, paramsIncremented))
            }
        } else {
            return
        }
    }
    return (
        <div className='flex justify-center my-10 gap-1'>
            <button className=' bg-secundary-100 py-1 px-2 rounded-lg focus:scale-110 focus:duration-500'
                onClick={
                    e => handleSetPageDecrement(e)
            }>
                <BiLeftArrow className='h-6 w-6 text-primary-100'/>
            </button>
            <button className=' bg-secundary-100 py-1 px-2 rounded-lg'
                onClick={
                    e => handleSetPageIncrement(e, parametros)
            }><BiRightArrow className='h-6 w-6 text-primary-100'/></button>
        </div>
    )
}
