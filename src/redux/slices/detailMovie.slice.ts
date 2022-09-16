import { createSlice } from "@reduxjs/toolkit";
import { urlDetail } from "../../api/getMovies";
import { AppThunk } from "../store";
import { Params } from "react-router-dom";
import {  typeDetail } from "../types";

const initialState:typeDetail={
    items:{
    poster_path: '',
    adult: false,
    overview: '',
    release_date: '',
    genres: [],
    id: 0,
    original_title: '',
    original_language: '',
    title: '',
    backdrop_path: '' ,
    popularity: 0,
    vote_count:0,
    video: false,
    vote_average:0,
    belongs_to_collection: {},
    budget: 0,
    homepage: '' ,
    imdb_id: '' ,
    runtime: 0,
    production_companies: [],
    production_countries: [],
    spoken_languages: [],
    staus: '',
    tagline: '' },
    loading: false,
    error: null,
};

const detail= createSlice({
    name: 'detail',
    initialState,
    reducers:{
        setDetail:(state,action)=>{
            state.items= action.payload
        }
    }
})

export const getDetail= (numero: string | undefined): AppThunk =>{
return async (dispatch)=>{
    try{
    const response= await urlDetail(numero);
    dispatch(detail.actions.setDetail(response.data))
    }catch (error){
    console.log(error)
    }
}
}

export const{
    setDetail
} = detail.actions

export default detail.reducer