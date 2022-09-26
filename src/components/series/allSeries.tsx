import React,{useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {useLocation} from 'react-router-dom'
import InfinitiScroll from 'react-infinite-scroll-component'
import { getAllSeries} from '../../redux/slices/allSeries.slice'
import NavBar from '../navbar/NavBar'
import SideBar from '../sideBar/SideBar'
import Card from '../movie.card/Card'

export default function Series() {
const dispatch= useAppDispatch();
const totalSeries = useAppSelector(state=> state.allSeries.items);
const params= useLocation();
let query= params.search.substring(8).toString();
const pages = Math.floor(Math.random()*1000)

const [page, setPage] = useState(1)

useEffect(()=>{
dispatch(getAllSeries(page))

},[page])

  return (
    <div className=' bg-primary-100 h-screen'>
        <NavBar/>
        <div className='bg-primary-100 flex gap-4  '>
        <SideBar/>
        <div className='mt-10 '>
        <InfinitiScroll
        dataLength={totalSeries.length}
        hasMore={true}
        next={()=> setPage(prevPage => prevPage + 1)}
        loader= {<h1>cargando man</h1>}
        className='grid grid-cols-5 gap-8 w-[80%] '
        >
        {totalSeries?.map((el, index)=>{
            return(
              <Card
              title={el.name}
              id={el.id}
              poster_path= {el.poster_path}
              clase={'tv'}
              key={index}
              />
            )
        })}
        </InfinitiScroll>
        </div>
        </div>
    </div>
  )
}
