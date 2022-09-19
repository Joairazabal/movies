import { createSlice } from "@reduxjs/toolkit";
import { urlDetail, urlDetailTvs } from "../../api/getMovies";
import { AppThunk } from "../store";
import {  typeDetail } from "../types";

const initialState:typeDetail={
    items:{
    poster_path: null,
    overview: null,
    release_date: null,
    genres: [],
    id: null,
    title: null,
    runtime: null,
    number_of_seasons:null,
    first_air_date:null },
    loading: false,
    error: null,
};

const detailTv= createSlice({
    name: 'detailTv',
    initialState,
    reducers:{

        setDetailTv:(state,action)=>{
            state.items= action.payload
        },
        setClearTv: ()=> initialState
       
    }
})

export const getDetailTv= (numero: string | undefined): AppThunk =>{
return async (dispatch)=>{
    try{
    const response= await urlDetailTvs(numero);
    dispatch(detailTv.actions.setDetailTv(response.data))
    console.log(response.data)
    }catch (error){
    console.log(error)
    }}
}

export const{
    setDetailTv,
    setClearTv
} = detailTv.actions

export default detailTv.reducer