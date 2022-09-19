import React,{useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {Link} from 'react-router-dom'
import InfinitiScroll from 'react-infinite-scroll-component'
import { allMovies } from '../../redux/slices/allMovies.slice'
import NavBar from '../navbar/NavBar'

export default function Movies() {
const dispatch= useAppDispatch();
const totalMovies = useAppSelector(state=> state.allMovies.items);

const [page, setPage] = useState(1)

useEffect(()=>{
dispatch(allMovies(page))
},[page])

  return (
    <div className=' bg-primary-100 h-screen w-full'>
        <NavBar/>
        <div className='bg-primary-100 flex justify-center mt-10 '>
        <div className='w-[70%]'>
        <InfinitiScroll
        dataLength={totalMovies.length}
        hasMore={true}
        next={()=> setPage(prevPage => prevPage + 1)}
        loader= {<h1>cargando man</h1>}
        className='grid grid-cols-5 gap-8 '
        >
        {totalMovies?.map((el, index)=>{
            return(
                <div className='flex flex-col items-center gap-3 text-center'key={index}>
                <Link to={`/movie/${el.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={`${el.title}`} 
                className='flex h-[20rem] w-[14rem] rounded-[10px]' />
                <h1 className='text-xl font-Nunito text-secundary'>{el.title}</h1>
                </Link>
                </div>
            )
        })}
        </InfinitiScroll>
        </div>
        </div>
    </div>
  )
}
