import React, {useEffect} from 'react'
import {useAppSelector, useAppDispatch} from '../../hooks/redux';
import {video} from '../../api/getMovies';
import {useParams} from 'react-router-dom';
import {setClearTv, getDetailTv, getActorsTv} from '../../redux/slices/detailTvs.slice';
import {getTrailerTv} from '../../redux/slices/getTrailerTv.slice';
import NavBar from "../navbar/NavBar";
import Sugerencias from '../DetailMovie/Sugerencias';

export default function DetailTv() {

    const detailsTv = useAppSelector(state => state.detailTv.items);
    const trailersTv = useAppSelector(state => state.trailerTv.items);

    const dispatch = useAppDispatch();
    let params = useParams();
    let id = params.id;

    const estreno = detailsTv.release_date ?. slice(0, 4)

    useEffect(() => {
        dispatch(setClearTv())
        dispatch(getTrailerTv(id));
        dispatch(getDetailTv(id));
        dispatch(getActorsTv(id))
        dispatch(setClearTv())
    }, [dispatch]);

    return (
        <div className=" bg-primary-100 w-full">
            <NavBar/> {
            detailsTv.id ? <div className="bg-primary-100 flex flex-col items-center ">
                <img src={
                        `https://image.tmdb.org/t/p/original/${
                            detailsTv.backdrop_path
                        }`
                    }
                    alt=""
                    className="w-full top-[10vh] left-0 h-[130vh]  sm:hidden lg:block md:hidden "/>
                <img src={
                        `https://image.tmdb.org/t/p/w300/${
                            detailsTv.backdrop_path
                        }`
                    }
                    alt=""
                    className="w-full top-[10vh] left-0 h-[120vh] lg:hidden sm:block md:hidden"/>

                <img src={
                        `https://image.tmdb.org/t/p/w780/${
                            detailsTv.backdrop_path
                        }`
                    }
                    alt=""
                    className="w-full top-[10vh] left-0 h-[120vh] lg:hidden sm:hidden md:block"/>
                <div className="top-[10vh] left-0 w-[100%] h-[130vh] absolute from-primary-100 to-secundary-400 bg-gradient-to-br"/>
                <div className="absolute left-14 lg:bottom-[-24vh] sm:bottom-[-24vh] ">
                    <div className="flex flex-col ">
                        <img src={
                                `https://image.tmdb.org/t/p/w500/${
                                    detailsTv.poster_path
                                }`
                            }
                            alt=""
                            className=" lg:h-72 lg:w-52 sm:h-64 sm:w-44 rounded-lg relative mb-2"/>
                        <h1 className=" lg:text-xl font-PT text-secundary lg:break-words sm:text-lg">
                            {
                            detailsTv.title
                        }</h1>

                        <li className="flex items-center gap-2">
                            <strong className="font-PT lg:text-lg sm:text-xs text-secundary-50 ">Genres:</strong>
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
                                <strong className="font-PT lg:text-lg sm:text-xs text-secundary-50 ">Actors:
                                </strong>
                                <p className='text-secundary font-Nunito sm:text-xs lg:text-lg flex'>
                                    {
                                    detailsTv.actors ?. join(', ')
                                }</p>

                            </div>
                        ) : null
                    }
                        <div className="flex lg:justify-start ">
                            <p className="break-words text-secundary font-Nunito lg:text-xl leading-[2rem] lg:w-[70%] sm:w-[85%] lg:tracking-wide sm:text-sm font-semibold">
                                {
                                detailsTv.overview
                            }</p>
                        </div>
                    </div>
                </div>
                <section className="lg:w-[70%] sm:w-[85%] flex flex-col gap-10 justify-center my-28 bg-secundary-200 py-10 items-center rounded-lg">
                    {
                    trailersTv ?. map(el => {
                        return (
                            <iframe src={
                                    `${video}${
                                        el.key
                                    }`
                                }
                                allowFullScreen
                                className=" lg:h-[30rem] lg:w-full sm:h-64 sm:w-full md:h-[30rem]"/>
                        )
                    })
                }</section>
            </div> : <h1>error</h1>
        }
            <div>
                <Sugerencias/>
            </div>
        </div>
    )
}
