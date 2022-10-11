import React from 'react'
import {genre} from '../../redux/types'
import {Link, useLocation} from 'react-router-dom'
import {MdLabelOutline} from 'react-icons/md'

interface Props {
    genres: Array < genre > | null,
    clase: string
}

export default function ListGenres({genres, clase} : Props) {

    const params = useLocation()

    return (
        <>
            <div className='flex items-center text-secundary-100 text-opacity-70 lg:text-2xl sm:text-[1,120rem] gap-4 font-PT font-semibold lg:hover:transition lg:hover:duration-700 lg:hover:text-secundary-50  lg:hover:delay-150 lg:hover:rounded-lg  lg:hover:bg-secundary-200 md:text-2xl lg:my-1 lg:p-2 sm:my-[8px] text-start break-words gap-4'>
                <MdLabelOutline/>
                <Link to={
                    clase === 'movie' ? `/movies/${
                        'all'
                    }` : `/series/${
                        'all'
                    }`
                }>
                    <button>
                        All</button>
                </Link>
            </div>

            {
            genres ?. map(el => {
                return (
                    <div key={
                            el.id
                        }
                        className='flex items-center text-secundary-100 text-opacity-70 lg:text-2xl sm:text-[1,120rem] md:text-2xl lg:my-1 lg:p-2 sm:my-[8px] text-start break-words
                                                       gap-4 font-PT font-semibold lg:hover:transition lg:hover:duration-700 lg:hover:text-secundary-50  lg:hover:delay-150 lg:hover:rounded-lg  lg:hover:bg-secundary-200   '>
                        <MdLabelOutline className='aside__label'/>
                        <Link to={
                            clase === 'movie' ? `/movies/${
                                el.id
                            }` : `/series/${
                                el.id
                            }`
                        }>
                            <button className=' text-left'
                                value={
                                    el.id
                            }>
                                {
                                el.name
                            }</button>
                        </Link>
                    </div>
                )
            })
        } </>
    )
}
