import React,{useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {Link} from 'react-router-dom'
import InfinitiScroll from 'react-infinite-scroll-component'
import { getAllSeries} from '../../redux/slices/allSeries.slice'
import NavBar from '../navbar/NavBar'
import SideBar from '../sideBar/SideBar'
import Card from '../movie.card/Card'

export default function Series() {
const dispatch= useAppDispatch();
const totalSeries = useAppSelector(state=> state.allSeries.items);

const pages = Math.floor(Math.random()*1000)

const [page, setPage] = useState(1)

useEffect(()=>{
dispatch(getAllSeries(page))
},[page])

  return (
    <div className=' bg-primary-100 h-screen'>
        <NavBar/>
        <div className='bg-primary-100 flex gap-4'>
        <SideBar/>
        <div className='w-[80%] mt-10'>
        <InfinitiScroll
        dataLength={totalSeries.length}
        hasMore={true}
        next={()=> setPage(prevPage => prevPage + 1)}
        loader= {<h1>cargando man</h1>}
        className='grid grid-cols-5 gap-8'
        >
        {totalSeries?.map((el, index)=>{
            return(
              <Card
              title={el.title}
              id={el.id}
              poster_path= {el.poster_path}
              clase={'movie'}
              />
            )
        })}
        </InfinitiScroll>
        </div>
        </div>
    </div>
  )
}
