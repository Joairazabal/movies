import React from 'react'
import {movies, resultTop, seriesPopular} from '../../redux/types'
import {Link} from 'react-router-dom'
import Card from './Card'

interface Props {
    movie: Array < movies > | resultTop['results'] | seriesPopular[]
    subtitle: string | null,
    title: string,
    clase: string
}


export default function MovieCard({movie, title, subtitle, clase} : Props) {
    return (
        <section className='mt-10 w-full'>
            <div className='flex lg:items-center sm:justify-center lg:justify-start lg:gap-2  mb-8 '>
                <h1 className=' font-PT text-secundary-50 lg:text-4xl sm:text-2xl '>
                    {title}</h1>
                <strong className=' font-Nunito lg:text-4xl sm:text-2xl text-secundary sm:ml-3'>
                    {subtitle}</strong>
            </div>
            <div className='lg:grid lg:grid-cols-5 lg:gap-8 sm:grid sm:grid-cols-1 sm:gap-4  md:grid md:grid-cols-2 md:gap-4'>
                {
                movie ?. map(el => {
                    return (
                        <Card title={
                                el.title ? el.title : el.name
                            }
                            id={
                                el.id
                            }
                            poster_path={
                                el.poster_path
                            }
                            clase={clase}
                            key={
                                el.id
                            }/>
                    )
                })
            } </div>
        </section>
    )
}
