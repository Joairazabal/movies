import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { allGenres } from '../../redux/slices/genres.slice'
import { genre, typeGenres } from '../../redux/types'
import { useEffect } from 'react'
import './SideBar.scss'

export default function SideBar() {
const dispatch= useAppDispatch()
const genres:typeGenres['items']=useAppSelector((state)=> state.genres.items);

useEffect(() => {
  dispatch(allGenres())    
  }, [dispatch])
console.log(genres)
  return (
    <aside className='aside__container'>
      <div>
        <h1 className='aside__h1'>Genres</h1>
      </div>
        <div>
          {genres?.map(el=>{
            return(
              <button key={el.id}>{el.name}</button>
            )
          })}
          {/* mapeo de buttons */}
        </div>
     
    </aside>
  )
}
