import { createSlice } from "@reduxjs/toolkit";
import { urlDetail } from "../../api/getMovies";
import { AppThunk } from "../store";
import {  typeDetail } from "../types";

const initialState:typeDetail={
    items:{
    poster_path: null,
    overview: null,
    release_date: null,
    genres: null,
    id: null,
    title: null,
    runtime: null,
    number_of_seasons: null,
    first_air_date: null
    }
    ,
    loading: true,
    error: null,
};


const detail= createSlice({
    name: 'detail',
    initialState,
    reducers:{
        setDetail:(state,action)=>{
            state.items= action.payload
            state.loading=false
        },
        setClear: ()=> initialState
        
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
    setDetail, setClear
} = detail.actions

export default detail.reducer