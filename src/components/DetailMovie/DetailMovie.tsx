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
    }, [dispatch]);

    const details = useAppSelector(state => state.detail.items);
    const trailers = useAppSelector(state => state.trailer.items);

    const runtime: number = details.runtime ? details.runtime / 60 : 0
    const time = runtime.toFixed(2)
    const hs = `${
        time.slice(0, 1)
    }h`
    const minute = `${
        time.slice(2, 3)
    }m`

    const estreno = details.release_date ?. slice(0, 4)

    return (
        <div className=" bg-primary-100 w-full">
            <NavBar/> {
            details.id ? <div className="bg-primary-100 flex flex-col items-center  ">
                <img src={
                        `https://image.tmdb.org/t/p/original/${
                            details.backdrop_path
                        }`
                    }
                    alt=""
                    className="w-full top-[10vh] left-0 h-[130vh]"/>
                <div className="top-[10vh] left-0 w-[100%] h-[130vh] absolute from-secundary-300 to-secundary-400 bg-gradient-to-br"/>
                <div className="absolute left-14 bottom-[-18vh] ">
                    <div className="gap-2 flex flex-col ">
                        <img src={
                                `https://image.tmdb.org/t/p/w500/${
                                    details.poster_path
                                }`
                            }
                            alt=""
                            className=" lg:h-72 lg:w-52 sm:h-52 sm:w-36 rounded-lg relative mb-2"/>
                        <h1 className=" lg:text-2xl font-PT text-secundary lg:break-words sm:text-lg">
                            {
                            details.title
                        }</h1>
                        <h3 className="text-secundary lg:text-lg sm:text-xs font-Nunito">
                            {
                            `${hs} ${minute} `
                        }
                            - {estreno}</h3>
                        <div className="flex items-center gap-2">
                            <strong className="font-PT lg:text-xl sm:text-xs text-secundary-50 ">Genres:</strong>
                            {
                            details.genres ?. map(el => {
                                return <h3 key={
                                        el.id
                                    }
                                    className='text-secundary font-Nunito sm:text-xs lg:text-lg break-words text-start'>
                                    {
                                    `${
                                        el.name
                                    } `
                                } </h3>;
                            })
                        } </div>
                        <div className="flex items-start gap-2  mb-14">
                            <strong className="font-PT lg:text-xl sm:text-xs text-secundary-50 ">Actors:
                            </strong>
                            <p className='text-secundary font-Nunito sm:text-xs lgtext-lg flex'>
                                {
                                details.actors ?. join(', ')
                            }</p>
                        </div>
                        <div className="flex lg:justify-start sm:justify-center">
                            <p className="break-words text-secundary font-Nunito lg:text-2xl lg:leading-[2rem] w-[70%] lg:tracking-wide sm:text-sm">
                                {
                                details.overview
                            }</p>
                        </div>
                    </div>
                </div>
                <section className="w-[70%] flex flex-col gap-10 justify-center my-28 bg-secundary-200 py-10 items-center rounded-lg">
                    {
                    trailers ?. map(el => {
                        return (
                            <iframe src={
                                    `${video}${
                                        el.key
                                    }`
                                }
                                allowFullScreen
                                className=" h-[30rem] w-full"/>
                        )
                    })
                }</section>
            </div> : <h1>error</h1>
        }
            <div>
                <Sugerencias/>
            </div>
        </div>
    );
}
