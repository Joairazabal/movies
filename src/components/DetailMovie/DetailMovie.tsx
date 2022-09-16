import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/slices/detailMovie.slice";
import { useEffect } from "react";
import NavBar from "../navbar/NavBar";
import { video } from "../../api/getMovies";
import { getTrailer } from "../../redux/slices/getTrailer.slice";

export default function DetailMovie() {
  const dispatch = useAppDispatch();
  let params = useParams();
  let id = params.id;

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getTrailer(id));
  }, [dispatch]);

  const details = useAppSelector(state => state.detail.items);
  const trailers = useAppSelector(state => state.trailer.items.results);

  let runtime:number= details.runtime/60
  let hora:string= runtime.toFixed(2)
  
  return (
    <div className=" bg-primary-100 h-screen w-full">
      <NavBar />
      <div className="bg-primary-100 flex flex-col items-center ">
        <div className="flex justify-around mt-28 w-[70%]">
          <img
            src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
            alt=""
            className="h-96 w-72 rounded-lg"
          />
          <div className="w-[60%]">
            <div className="flex items-end gap-2 ">
              <strong className="font-PT text-3xl ">Genres: </strong>
              {details.genres?.map(el => {
                return <h3 key={el.id} className='text-secundary font-Nunito text-xl '>{`${el.name} `} </h3>;
              })}
            </div>
            <h3 className="my-2 text-secundary font-Nunito text-xl">
              <strong className="font-PT text-3xl"> Premiere: </strong>
              {details.release_date.slice(0, 4)}
            </h3>
            <h3 className="text-secundary font-Nunito text-xl">
              <strong className="font-PT text-3xl">Duration: </strong>
              {hora}Hs
            </h3>
            <h3 className="break-words text-secundary font-Nunito text-2xl mt-4">{details.overview}</h3>
          </div>
        </div>
        <div className="w-[70%] flex justify-center h-[30rem] my-28">
          <iframe src={`${video}${trailers[0]?.key}`} allowFullScreen className=" h-full w-11/12 rounded-lg
           " />
        </div>
      </div>
    </div>
  );
}
