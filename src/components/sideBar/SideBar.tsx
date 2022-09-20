import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { allGenres } from '../../redux/slices/genres.slice'
import { typeGenres } from '../../redux/types'
import { useEffect } from 'react'
import{MdLabelOutline} from 'react-icons/md'

export default function SideBar() {
const dispatch= useAppDispatch()
const genres:typeGenres['items']=useAppSelector((state)=> state.genres.items);

useEffect(() => {
  dispatch(allGenres())    
  }, [])

  return (
    <aside className='w-[25%] bg-primary-300 flex flex-col items-center'>
      <div className='mt-8 w-[80%] text-left'>
        <h1 className='font-Nunito text-secundary text-2xl'>Genres</h1>
      </div>
        <div>
          {genres?.map(el=>{
            return(
              <div key={el.id} className='flex items-center text-left text-secundary-100 text-opacity-70 text-2xl my-2 p-2
               gap-4 font-P font-semibold hover:transition hover:duration-700 hover:text-secundary-50  hover:delay-150 hover:rounded-lg
               hover:bg-secundary-200  '>
              <MdLabelOutline className='aside__label'/>
              <button  className='aside__button'>{el.name}</button>
              </div>
            )
          })}
        </div>
     
    </aside>
  )
}
