import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useParams } from "react-router-dom";
import { getDetail, setClear } from "../../redux/slices/detailMovie.slice";
import { useEffect } from "react";
import NavBar from "../navbar/NavBar";
import { video } from "../../api/getMovies";
import { getTrailer } from "../../redux/slices/getTrailer.slice";
import { setClearState } from "../../redux/slices/getTrailerTv.slice";

export default function DetailMovie() {
  const dispatch = useAppDispatch();
  let params = useParams();
  let id = params.id;

  useEffect(() => {
    dispatch(setClear())
    dispatch(setClearState())
    dispatch(getDetail(id));
    dispatch(getTrailer(id));
  }, [dispatch]);

  const details = useAppSelector(state => state.detail.items);
  const trailers = useAppSelector(state => state.trailer.items);
  
  let runtime:number= details.runtime?details.runtime/60:0
  let hora:string= runtime.toFixed(2)
  
  return (
    <div className=" bg-primary-100 h-screen w-full">
      <NavBar />

          {details.id? 
            <div className="bg-primary-100 flex flex-col items-center ">
              <div className="flex justify-around mt-28 w-[70%]">
                <div className="gap-4 flex flex-col justify-center w-72">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                  alt=""
                  className="h-96 w-72 rounded-lg"
                />
                <h1 className=" text-2xl font-PT text-secundary text-center break-words">{details.title}</h1>
                </div>
                
                <div className="w-[60%]">
                  <div className="flex items-end gap-2 ">
                    <strong className="font-PT text-3xl text-secundary-50 ">Genres: </strong>
                    {details.genres?.map(el => {
                      return <h3 key={el.id} className='text-secundary font-Nunito text-xl '>{`${el.name} `} </h3>;
                    })}
                  </div>
                  <h3 className="my-2 text-secundary font-Nunito text-xl">
                    <strong className="font-PT text-3xl text-secundary-50"> Premiere: </strong>
                    {details.release_date}
                  </h3>
                  <h3 className="text-secundary font-Nunito text-xl">
                    <strong className="font-PT text-3xl text-secundary-50">Duration: </strong>
                    {hora}Hs
                  </h3>
                  <h3 className="break-words text-secundary font-Nunito text-2xl mt-4">{details.overview}</h3>
                </div>
              </div>
              <div className="w-[70%] flex flex-col gap-10 justify-center my-28">
              {  trailers?.map(el=>{
              return( <iframe src={`${video}${el.key}`} allowFullScreen className=" h-[30rem] w-11/12 rounded-lg" />
              )})
              }</div>
            </div>

          : <h1>error</h1>
          
          }
    </div>
  );
}
