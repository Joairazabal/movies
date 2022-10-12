import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useParams} from "react-router-dom";
import {getActors, getDetail, setClear} from "../../redux/slices/detailMovie.slice";
import {useEffect} from "react";
import NavBar from "../navbar/NavBar";
import {video} from "../../api/getMovies";
import {getTrailer} from "../../redux/slices/getTrailer.slice";
import {setClearState} from "../../redux/slices/getTrailerTv.slice";
import Sugerencias from './Sugerencias'
import Loading from "../loading/Loading";
import {RiErrorWarningLine} from 'react-icons/ri'

export default function DetailMovie() {
    const dispatch = useAppDispatch();
    let params = useParams();
    let id = params.id;

    useEffect(() => {
        dispatch(setClear())
        dispatch(setClearState())
        dispatch(getDetail(id));
        dispatch(getTrailer(id));
        dispatch(getActors(id))
    }, [dispatch, params]);

    const details = useAppSelector(state => state.detail.items);
    const trailers = useAppSelector(state => state.trailer.items);
    const loading = useAppSelector(state => state.detail.loading)

    const runtime: number = details.runtime ? details.runtime / 60 : 0
    const time = runtime.toFixed(2)
    const hs = `${
        time.slice(0, 1)
    }h`
    const minute = `${
        time.slice(2, 3)
    }m`

    const estreno = details.release_date ?. slice(0, 4)

    if (!details.backdrop_path) 
        return <Loading/>


    

console.log(trailers)
    return (
        <div className=" bg-primary-100 w-full">
            <NavBar/> {
            details.id ? <div className="bg-primary-100 grid grid-cols-[1fr] grid-rows-[1fr] lg:items-end sm:items-start ">
                <img src={
                        `https://image.tmdb.org/t/p/original/${
                            details.backdrop_path
                        }`
                    }
                    alt=""
                    className="w-full gridP lg:h-[130vh] md:hidden sm:hidden lg:block"/>
                <img src={
                        `https://image.tmdb.org/t/p/w780/${
                            details.backdrop_path
                        }`
                    }
                    alt=""
                    className="w-full left-0  gridP lg:hidden sm:block sm:h-[40vh] md:hidden object-fill"/>

                <img src={
                        `https://image.tmdb.org/t/p/w780/${
                            details.backdrop_path
                        }`
                    }
                    alt=""
                    className="w-full  left-0  md:h-[60vh] lg:hidden gridP sm:hidden md:block object-fill"/>

                <div className="gridP grid  lg:items-center sm:items-end md:items-center md:pt-10 lg:h-[130vh] from-primary-100 to-secundary-400 bg-gradient-to-br sm:h-[60%] sm:pt-[18vh] sm:pb-[8rem]  md:h-[70vh] sm:pl-8 ">
                    <div className="gap-2 flex flex-col sm:justify-center md:justify-start sm:-mt-10 lg:mt-8 ">
                        <img src={
                                `https://image.tmdb.org/t/p/w500/${
                                    details.poster_path
                                }`
                            }
                            alt=""
                            className=" lg:h-72 lg:w-52 sm:h-44 sm:w-32 rounded-lg mb-2"/>
                        <h1 className=" lg:text-2xl  font-PT text-secundary lg:break-words sm:text-lg sm:mb-4 sm:-mt-2 lg:mb-0 ">
                            {
                            details.title
                        }</h1>
                        <h3 className="text-secundary lg:text-lg sm:text-xs font-Nunito">
                            {
                            `${hs} ${minute} `
                        }
                            - {estreno}</h3>
                        <li className="flex items-center gap-2">
                            <strong className="font-PT lg:text-lg sm:text-xs text-secundary-50 ">Genres:</strong>
                            {
                            details.genres ?. map(el => {
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
                        <div className="flex items-start gap-2 lg:mb-14 ">
                            <strong className="font-PT lg:text-lg sm:text-xs text-secundary-50 ">Actors:
                            </strong>
                            <p className='text-secundary font-Nunito sm:text-xs lg:text-lg flex'>
                                {
                                details.actors ? details.actors.join(', ') : 'Actors noy found'
                            }</p>
                        </div>
                        <div className="flex lg:justify-start sm:flex sm:justify-end sm:pt-10 sm:flex-col sm:gap-4 md:mt-0 ">
                            <h3 className="text-secundary-50 text-2xl font-Nunito sm:block lg:hidden">Overview</h3>
                            <p className="break-words text-secundary font-Nunito lg:text-xl leading-[2rem] lg:w-[70%] sm:w-[85%] lg:tracking-wide sm:text-sm font-semibold ">
                            {
                                details.overview? details.overview:(
                                <div className='flex gap-4 text-secundary-50 font-PT items-center'>
                                    <RiErrorWarningLine/>
                                    <h3 className='text-2xl'>Overview not found</h3>
                                </div>)
                            }</p>
                        </div>
                    </div>
                </div>
                <section className=" flex flex-col justify-center  items-center ">
                    <div className="lg:w-[70%] sm:w-[85%] lg:my-28 bg-secundary-200 rounded-lg lg:py-10   ">
                        {
                        trailers.length? trailers.map(el => {
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
            <div className="mt-10">
                <Sugerencias/>
            </div>
        </div>
    );
}
