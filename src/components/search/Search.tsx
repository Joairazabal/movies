import React,{useState} from 'react';
import {useSearchParams, useLocation, useNavigate} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineCloseCircle} from 'react-icons/ai'

export default function Search() {

    const [movie, searchMovie] = useSearchParams();
    const [searchLength, setSearchLength]= useState('')
    const location = useLocation()

    const setParams = (e : React.ChangeEvent < HTMLInputElement >) => {
        searchMovie({search: e.target.value})
        setSearchLength(e.target.value)
    }

    const clearParams= (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        searchMovie({search: ''})
    }

    console.log(location)
    return (
        <form className='flex items-center  hover:opacity-100  active:focus:opacity-100 '>
            <div className='lg:w-52 sm:w-36 flex'>
            <input type="text" className=' bg-primary-0 border-2 rounded-md
             border-secundary-50 h-8 lg:w-52 sm:w-36 placeholder-secundary-50 text-secundary px-4 sm:text-xs' placeholder='Search Movies...'
                onChange={setParams}/>
               { !searchLength?<BsSearch className='text-secundary-50 absolute lg:left-[95%] mt-2 sm:left-[60%]  '/>
               :<button className='text-secundary-50 absolute sm:left-[60%] sm:top-[3.7vh] lg:left-[95%]  active:text-secundary lg:hover:scale-125' onClick={(e)=>clearParams(e)}><AiOutlineCloseCircle className='h-5 w-5  '/></button>}
            </div>
        </form>
    )
}
