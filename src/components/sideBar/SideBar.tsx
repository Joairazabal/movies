import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { allGenres } from '../../redux/slices/genres.slice'
import { genre, typeGenres } from '../../redux/types'
import { useEffect } from 'react'
import './SideBar.scss'
import{MdLabelOutline} from 'react-icons/md'

export default function SideBar() {
const dispatch= useAppDispatch()
const genres:typeGenres['items']=useAppSelector((state)=> state.genres.items);

useEffect(() => {
  dispatch(allGenres())    
  }, [dispatch])

  return (
    <aside className='aside'>
      <div className='aside__container--h1'>
        <h1 className='aside__h1'>Genres</h1>
      </div>
        <div className='aside__container--buttons'>
          {genres?.map(el=>{
            return(
              <div key={el.id} className='aside__container--icons'>
              <MdLabelOutline className='aside__label'/>
              <button  className='aside__button'>{el.name}</button>
              </div>
            )
          })}
          {/* mapeo de buttons */}
        </div>
     
    </aside>
  )
}
