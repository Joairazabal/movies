import axios from "axios";

const api_key = "61801c4cf07fbdd51b37c4290fd4b299";
export const video = "https://www.youtube.com/embed/";
const language = localStorage.getItem("language");

export const getMovies = (language: string | null) =>
	axios(
		`		https://api.themoviedb.org/3/movie/popular?api_key=61801c4cf07fbdd51b37c4290fd4b299&language=${language}&page=1&include_adult=false
`
	);

export const genres = (clase: string, language: string | null) =>
	axios(
		`https://api.themoviedb.org/3/genre/${clase}/list?api_key=61801c4cf07fbdd51b37c4290fd4b299&language=${language}&include_adult=false`
	);

export const urlAllMovies = (
	page: number,
	genre: string | null,
	language: string | null
) =>
	axios(
		`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}&with_genres=${genre}&include_adult=false&language=${language}`
	);

export const urlSearch = (name: string, language: string | null) =>
	axios(
		`https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false`
	);

export const urlDetail = (
	movie_id: string | undefined,
	language: string | null
) =>
	axios(
		`https://api.themoviedb.org/3/movie/${movie_id}?api_key=61801c4cf07fbdd51b37c4290fd4b299&language=${language}&include_adult=false`
	);

export const urlTrailer = (
	movie_id: string | undefined,
	language: string | null
) =>
	axios(
		`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${api_key}&language=${language}&include_adult=false`
	);

export const urlTop = (language: string | null) =>
	axios(
		`https://api.themoviedb.org/3/movie/top_rated?api_key=61801c4cf07fbdd51b37c4290fd4b299&language=${language}&page=1&include_adult=false`
	);

export const seriesPopular = (language: string | null) => {
	return axios(
		`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=${language}&page=1&include_adult=false`
	);
};

export const urlSearchMovies = (movie: string, language: string | null) => {
	return axios(
		`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=${language}&query=${movie}&page=1&include_adult=false`
	);
};

export const urlTrailerTvs = (
	tv_id: string | undefined,
	language: string | null
) => {
	return axios(
		`https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=${api_key}&language=${language}&include_adult=false`
	);
};

export const urlDetailTvs = (
	tv_id: string | undefined,
	language: string | null
) => {
	return axios(
		`https://api.themoviedb.org/3/tv/${tv_id}?api_key=${api_key}&language=${language}&include_adult=false`
	);
};

export const urlAllSeries = (
	page: number,
	genre: null | string,
	language: string | null
) => {
	return axios(
		`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=${language}&page=${page}&with_genres=${genre}&include_adult=false`
	);
};

export const urlActors = (id: string | undefined, clase: string) => {
	return axios(
		`https://api.themoviedb.org/3/${clase}/${id}/credits?api_key=${api_key}&language=${language}&include_adult=false`
	);
};
export const urlProviders = (id: string | undefined, clase: string) => {
	return axios(
		`https://api.themoviedb.org/3/${clase}/${id}/watch/providers?api_key=${api_key}`
	);
};
