import React from 'react';
import {useSearchParams} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'

export default function Search() {

    const [movie, searchMovie] = useSearchParams();

    const setParams = (e : React.ChangeEvent < HTMLInputElement >) => {
        searchMovie({search: e.target.value})
    }

    return (
        <form className='flex items-center opacity-40 hover:opacity-100  active:focus:opacity-100 '>
            <input type="text" className=' bg-primary-0 border-2 before:border-opacity-100 rounded-md
                                                                        border-secundary-50 h-8 lg:w-52 sm:w-36 placeholder-secundary-50' placeholder='Search Movies...'
                onChange={setParams}/>
            <button disabled><BsSearch className='text-secundary-50 absolute -ml-7 -mt-2 '/></button>
        </form>
    )
}
