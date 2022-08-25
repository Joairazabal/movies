import axios from "axios";

const api_key='61801c4cf07fbdd51b37c4290fd4b299'
export const getMovies = () => axios('https://api.themoviedb.org/3/movie/popular?api_key=61801c4cf07fbdd51b37c4290fd4b299&language=en-US&page=1');
export const nextMovies = ()=>axios('https://api.themoviedb.org/3/movie/popular?api_key=61801c4cf07fbdd51b37c4290fd4b299&language=en-US&page=2')
export const genres = () => axios('https://api.themoviedb.org/3/genre/movie/list?api_key=61801c4cf07fbdd51b37c4290fd4b299&language=en-US')