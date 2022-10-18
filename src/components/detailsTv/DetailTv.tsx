import React, {useEffect, useState} from 'react'
import {useAppSelector, useAppDispatch} from '../../hooks/redux';
import {video} from '../../api/getMovies';
import {useParams} from 'react-router-dom';
import {setClearTv, getDetailTv, getActorsTv, getProvider} from '../../redux/slices/detailTvs.slice';
import {getTrailerTv, setClearState} from '../../redux/slices/getTrailerTv.slice';
import NavBar from "../navbar/NavBar";
import Sugerencias from '../DetailMovie/Sugerencias';
import Loading from '../loading/Loading';
import {RiErrorWarningLine} from 'react-icons/ri'
import { useTranslation } from 'react-i18next';

export default function DetailTv() {

    const detailsTv = useAppSelector(state => state.detailTv.items);
    const trailersTv = useAppSelector(state => state.trailerTv.items);
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch();
    let params = useParams();
    let id = params.id;
    const {t}= useTranslation();
    let lenguage = localStorage.getItem('lenguage')


    useEffect(() => {
        dispatch(setClearTv())
        dispatch(setClearState())
        dispatch(getTrailerTv(id,lenguage));
        dispatch(getDetailTv(id,lenguage));
        dispatch(getProvider(id, 'tv'))
        dispatch(getActorsTv(id))
        setLoading(false)
    }, [dispatch, params,lenguage]);

    if (! detailsTv.backdrop_path) 
        return <Loading/>


    


    console.log(detailsTv.providers)


    return (
        <div className=" bg-primary-100 w-full">
            <NavBar/> {
            detailsTv.id ? <div className="bg-primary-100 grid grid-cols-[1fr] grid-rows-[1fr] lg:items-end sm:items-start ">
                <img src={
                        `https://image.tmdb.org/t/p/original/${
                            detailsTv.backdrop_path
                        }`
                    }
                    alt=""
                    className="w-full gridP lg:h-[130vh] md:hidden sm:hidden lg:block"/>
                <img src={
                        `https://image.tmdb.org/t/p/w780/${
                            detailsTv.backdrop_path
                        }`
                    }
                    alt=""
                    className="w-full left-0  gridP lg:hidden sm:block sm:h-[40vh] md:hidden object-fill"/>

                <img src={
                        `https://image.tmdb.org/t/p/w780/${
                            detailsTv.backdrop_path
                        }`
                    }
                    alt=""
                    className="w-full  left-0  lg:hidden gridP sm:hidden md:block object-fill"/>

                <div className="gridP grid  lg:items-center sm:items-end md:items-center md:pt-10 lg:h-[130vh] from-primary-100 to-secundary-400 bg-gradient-to-br sm:h-[60%] sm:pt-[18vh] sm:pb-[8rem]  md:h-[70vh] sm:pl-8">
                    <div className="gap-2 flex flex-col sm:justify-center md:justify-start sm:-mt-10 ">
                        <img src={
                                `https://image.tmdb.org/t/p/w500/${
                                    detailsTv.poster_path
                                }`
                            }
                            alt=""
                            className=" lg:h-72 lg:w-52 sm:h-44 sm:w-32 rounded-lg mb-2"/>
                        <h1 className=" lg:text-xl font-PT text-secundary lg:break-words sm:text-lg lg:text-start">
                            {
                            detailsTv.name
                        }</h1>

                        <li className="flex items-center gap-2">
                            <strong className="font-PT lg:text-lg sm:text-xs text-secundary-50 ">{t('details.genres')}:</strong>
                            {
                            detailsTv.genres ?. map(el => {
                                return <h3 key={
                                        el.id
                                    }
                                    className='flex text-secundary font-Nunito sm:text-xs lg:text-lg break-words text-start'>
                                    {
                                    `${
                                        el.name
                                    } `
                                } </h3>;
                            })
                        } </li>
                        <div className=" text-secundary font-Nunito sm:text-xs lg:text-lg gap-2 flex">
                            <strong className="font-PT lg:text-lg sm:text-xs text-secundary-50">
                                Premiere:
                            </strong>
                            <h3>{
                                detailsTv.first_air_date
                            }</h3>
                        </div>
                        <div className="text-secundary font-Nunito sm:text-xs lg:text-lg gap-2 flex">
                            <strong className="font-PT lg:text-lg sm:text-xs text-secundary-50">Seasons:
                            </strong>
                            <h3>{
                                detailsTv.number_of_seasons
                            } </h3>
                        </div>

                        {
                        detailsTv.actors ? (
                            <div className="flex items-start gap-2 lg:mb-14 sm:mb-8 md:mb-8 ">
                                <strong className="font-PT lg:text-lg sm:text-xs text-secundary-50 ">{t('details.actors')}:
                                </strong>
                                <p className='text-secundary font-Nunito sm:text-xs lg:text-lg flex'>
                                    {
                                    detailsTv.actors ?. join(', ')
                                }</p>

                            </div>
                        ) : null
                    }
                        <div className="flex lg:justify-start sm:flex sm:justify-end sm:h-[35%] sm:flex-col sm:gap-4 md:mt-0 ">
                            <div>
                                <h3 className="text-secundary-50 text-2xl font-Nunito sm:block lg:hidden">{t('details.overview')}</h3>
                                <p className="break-words text-secundary font-Nunito lg:text-xl leading-[2rem] lg:w-[70%] sm:w-[85%] lg:tracking-wide sm:text-sm font-semibold">
                                    {
                                    detailsTv.overview ? detailsTv.overview : (
                                        <div className='flex lg:gap-4 sm:gap-2 text-secundary-50 font-PT items-center sm:mt-6'>
                                            <RiErrorWarningLine/>
                                            <h3 className='lg:text-2xl sm:text-sm'>Overview not found</h3>
                                        </div>
                                    )
                                }</p>
                            </div>
                            {
                            detailsTv.providers ? (
                                <div className='flex flex-col gap-2'>
                                    <div>
                                        <h3 className='text-secundary-50 text-2xl font-Nunito'>Providers</h3>
                                    </div>
                                    <div className='flex gap-4'>
                                        {
                                        detailsTv.providers ?. map(el => {
                                            return (

                                                <img src={
                                                        `https://image.tmdb.org/t/p/w500/${
                                                            el.logo_path
                                                        }`
                                                    }
                                                    alt=""
                                                    className='sm:h-[25%] sm:w-[25%] lg:h-14 md:h-14 md:w-14 lg:w-14 rounded-lg lg:hover:scale-110 lg:hover:duration-500 lg:hover:transition '/>


                                            )
                                        })
                                    } </div>
                                </div>
                            ) : null
                        } </div>
                    </div>
                </div>
                <section className=" flex flex-col justify-center  items-center ">
                    <div className="lg:w-[70%] sm:w-[85%] lg:my-28 bg-secundary-200 rounded-lg lg:py-10   ">
                        {
                        trailersTv ? trailersTv.map(el => {
                            return (
                                <iframe src={
                                        `${video}${
                                            el.key
                                        }`
                                    }
                                    allowFullScreen
                                    className=" lg:h-[30rem] lg:w-full sm:h-64 sm:w-full md:h-[30rem] sm:my-8"/>
                            )
                        }) : <div className="flex justify-center items-center gap-2 flex-col">
                            <RiErrorWarningLine className="lg:h-14 lg:w-14 sm:h-10 sm:w-10 text-secundary-50"/>
                            <span className=" lg:text-2xl sm:text-lg text-secundary-50 font-PT">No trailer found</span>
                        </div>
                    } </div>
                </section>
            </div> : <h1>error</h1>
        }
            <div className='sm:mt-10'>
                <Sugerencias/>
            </div>
        </div>
    )
}
