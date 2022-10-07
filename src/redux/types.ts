export interface movies {
	poster_path: string | null;
	id: number | null | string;
	title: string | null;
	name: null;
	profile_path: string | null;
	media_type: string;
	backdrop_path: string | null;
	genre_ids: number[] | null;
	clase: string | null;
}

export interface moviesState {
	items: movies[];
	loading: boolean;
	error: Error | null;
}

export interface genre {
	id: number;
	name: string;
}
export interface allGenres {
	genresMovies: Array<genre> | null;
	genresTv: Array<genre> | null;
}

export interface typeGenres {
	items: allGenres;
	loading: boolean;
	error: Error | null;
}

export interface detail {
	poster_path: string | null;
	overview: string | null;
	release_date: string | null;
	genres: genre[] | null;
	id: number | string | undefined | null;
	title: string | null;
	runtime: number | null;
	number_of_seasons: number | null;
	first_air_date: string | null;
	backdrop_path: string | null;
	actors: string[] | null;
	name: string | null;
}

export interface typeDetail {
	items: detail;
	loading: boolean;
	error: Error | null;
}

export interface result {
	key: string;
	id: string;
}

export interface typeTrailer {
	items: result[];
	loading: boolean;
	error: Error | null;
}

export interface typetopMovies {
	items: resultTop;
	loading: boolean;
	error: Error | null;
}
export interface resultTop {
	results: topMovies[];
}

export interface topMovies {
	poster_path: string | null;
	id: number | string | null;
	title: string | null;
	name: null;
}

export interface seriesPopular {
	id: number | null | string;
	name: string;
	poster_path: string | null;
	title: null;
	profile_path: string | null;
	media_type: string;
}

export interface typePopular {
	items: seriesPopular[];
	loading: boolean;
	error: Error | null;
}

export interface person {
	id: number | null;
	profile_path: string | null;
	name: string;
	poster_path: null;
	title: null;
	media_type: string;
}
export interface back_drop {
	backdrop_path: string | null;
}

export interface credits {
	id: string | undefined;
	cast: objectCast[];
}
export interface objectCast {
	known_for_department: string;
	name: string;
}

export interface user {
	displayName: string;
	email: string;
	accessToken: string;
	photoURL: string;
	uid: string;
}
