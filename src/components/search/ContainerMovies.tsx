import React, {useEffect} from 'react'
import {movies, seriesPopular, person} from '../../redux/types'

import Card from '../movie.card/Card'

interface Props {
    movie: movies[] | seriesPopular[] | person[]
    classe?: string | undefined
}

export default function ({movie, classe} : Props) {

    const foto = (el : any) => {
        if (el.profile_path) {
            return el.profile_path
         } else{ if (el.poster_path) 
            return el.poster_path
         }
    }

    return (
        <section className='lg:grid lg:grid-cols-5 w-[90%] lg:gap-8 sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 md:gap-4 bg-primary-100 mt-10'>
            {
                movie ?. map(el => {
                console.log()
                return (
                    <Card poster_path={
                            foto(el)
                        }
                        title={
                            el.title ? el.title : el.name
                        }
                        clase={
                            el.media_type? el.media_type: classe
                        }
                        id={
                            el.id
                        }/>
                )
            })
        } </section>
    )
}
