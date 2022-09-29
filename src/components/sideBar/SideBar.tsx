import React from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {allGenres} from '../../redux/slices/genres.slice'
import {typeGenres} from '../../redux/types'
import {useEffect} from 'react'
import {MdLabelOutline} from 'react-icons/md'
import {useSearchParams} from 'react-router-dom'
import {Value} from 'sass'

export default function SideBar() {
    const dispatch = useAppDispatch()
    const genres: typeGenres['items'] = useAppSelector((state) => state.genres.items);
    const [genre, setGenre] = useSearchParams();

    useEffect(() => {
        dispatch(allGenres())

    }, [dispatch])

    const setParams = (event : React.MouseEvent < HTMLButtonElement >) => {
        const button: HTMLButtonElement = event.currentTarget;
        setGenre({genre: button.value})
    }


    return (
        <aside className='lg:w-[25%] bg-primary-300 flex flex-col items-center sm:w-[60%]'>
            <div className='mt-8 w-[80%] text-left'>
                <h1 className='font-Nunito text-secundary lg:text-2xl sm:text-sm'>Genres</h1>
            </div>
            <div> {
                genres ?. map(el => {
                    return (
                        <div key={
                                el.id
                            }
                            className='flex items-center text-secundary-100 text-opacity-70 lg:text-2xl sm:text-[1,120rem] lg:my-1 lg:p-2 sm:my-[8px] text-start break-words
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            gap-4 font-P font-semibold lg:hover:transition lg:hover:duration-700 lg:hover:text-secundary-50  lg:hover:delay-150 lg:hover:rounded-lg
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           lg:hover:bg-secundary-200  '>
                            <MdLabelOutline className='aside__label'/>
                            <button className='aside__button'
                                value={
                                    el.id
                                }
                                onClick={
                                    (event) => setParams(event)
                            }>
                                {
                                el.name
                            }</button>
                        </div>
                    )
                })
            } </div>

        </aside>
    )
}
