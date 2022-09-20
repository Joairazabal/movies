import React,{useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {useLocation} from 'react-router-dom'
import InfinitiScroll from 'react-infinite-scroll-component'
import { allMovies } from '../../redux/slices/allMovies.slice'
import NavBar from '../navbar/NavBar'
import SideBar from '../sideBar/SideBar'
import Card from '../movie.card/Card'
import Loading from '../loading/Loading'
import { searchMovies } from '../../redux/slices/searchMovies.slice'
import ContainerMovies from '../search/ContainerMovies'

export default function Movies() {
const dispatch= useAppDispatch();
const totalMovies = useAppSelector(state=> state.allMovies.items);
const movies= useAppSelector(state=> state.searchMovies.items)
const pages = Math.floor(Math.random()*1000);
const params= useLocation();
let query= params.search.substring(8).toString();
const [page, setPage] = useState(1)

useEffect(()=>{
if(query === '' || query.length > 45){
dispatch(allMovies(page))
}else dispatch(searchMovies(query))
},[page, query])

  return (
    <div className=' bg-primary-100 h-screen'>
        <NavBar/>
        <div className='bg-primary-100 flex gap-4'>
        <SideBar/>
        <div className='flex flex-col items-center mt-10  '>
        {movies.length? 
        (<ContainerMovies movie={movies}/>)
        :
        (<InfinitiScroll
        dataLength={totalMovies.length}
        hasMore={true}
        next={()=> setPage(prevPage => prevPage + 1)}
        loader= {<Loading/>}
        className='grid grid-cols-5 gap-8  w-[80%]'>
       { totalMovies?.map((el, index)=>{
            return(
              <Card
              title={el.title}
              id={el.id}
              poster_path= {el.poster_path}
              clase={'movie'}
              key={index}
              />
            )}
            )}
            </InfinitiScroll>
            )}
        </div>
        </div>
    </div>
  )
}
