import {createContext} from 'react'
const LenguageContext= createContext({
      leng:  {
                navBar: {
                        links: [],
                        login: "",
                        favorites: "",
                        placeholder: "",
                        myFavorites: "",
                        myInfomation: "",
                        logout: ""
                },
                asideBar: {
                        genresMovies: " ",
                        genresTvs: " "
                },
                home: {
                        popular: "",
                        top: " ",
                        movies: "",
                        tvPopular: ""
                },
                details: {
                        genres: "",
                        actors: "",
                        premiere: "",
                        overview: ""
                },
                suggestions: "",
                favorites: ""
        },
        setLeng:()=>{}
        

})

export default LenguageContext