import React,{useEffect}from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { video } from '../../api/getMovies';
import { useParams } from 'react-router-dom';
import { setClearTv,getDetailTv,} from '../../redux/slices/detailTvs.slice';
import {getTrailerTv} from '../../redux/slices/getTrailerTv.slice';

export default function DetailTv() {

    const detailsTv= useAppSelector(state => state.detailTv.items);
    const trailersTv= useAppSelector(state => state.trailerTv.items);

    const dispatch = useAppDispatch();
    let params = useParams();
    let id = params.id;
  
    useEffect(() => {
      dispatch(setClearTv())
      dispatch(getTrailerTv(id));
      dispatch(getDetailTv(id));
     
    }, [dispatch]);

  return (
    <div className="bg-primary-100 flex flex-col items-center  ">
          <div className="flex justify-around mt-28 w-[70%]">
            <div className="gap-4 flex flex-col justify-center w-72">
            <img
              src={`https://image.tmdb.org/t/p/w500/${detailsTv.poster_path}`}
              alt=""
              className="h-96 w-72 rounded-lg"
            />
            <h1 className="text-2xl font-PT text-secundary text-center break-words">{detailsTv.title}</h1>
            </div>
            
            <div className="w-[60%]">
              <div className="flex items-end gap-2 ">
                <strong className="font-PT text-3xl ">Genres: </strong>
                {detailsTv.genres?.map(el => {
                  return <h3 key={el.id} className='text-secundary font-Nunito text-xl '>{`${el.name} `} </h3>;
                })}
              </div>
              <h3 className="my-2 text-secundary font-Nunito text-xl">
                <strong className="font-PT text-3xl"> Premiere: </strong>
                {detailsTv.first_air_date}
              </h3>
              <h3 className="text-secundary font-Nunito text-xl">
                <strong className="font-PT text-3xl">Seasons: </strong>
                {detailsTv.number_of_seasons}
              </h3>
              <h3 className="break-words text-secundary font-Nunito text-2xl mt-4">{detailsTv.overview}</h3>
            </div>
          </div>
          <div className="w-[70%] flex flex-col gap-10 justify-center my-28">
          {trailersTv?.map(el=> <iframe src={`${video}${el.key}`} allowFullScreen className=" h-[30rem] w-11/12 rounded-lg" />)}
        </div>
        </div>
  )
}
