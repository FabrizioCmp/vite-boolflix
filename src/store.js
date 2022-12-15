import { reactive } from "vue";
import axios from "axios";

export const store = reactive({

    searchText: "", //aggiornato dal componente AppHeader
    movies: [],
    series: [],
    actors: [],
    activeFilterMovies: null,
    activeFilterSeries: null,
    filteredMovies: [],
    filteredSeries: [],
    serieActors: [],
    searchPerformed: false,
    generiFilm: [],
    generiSerie: [],
    showFilmBox: true,
    showSerieBox: true,
    showGeneriFilm: false,
    showGeneriSerie: false,
    basicURL: "https://api.themoviedb.org/3"

})

export function searchMedia(textInput) {
    // textInput(stringa) rappresenta il contenuto della searchBox in cui l'utente effetua la ricerca



    //ricerca film
    axios.get(store.basicURL + "/search/movie", {
        params: {
            api_key: '21da4ccaba75317ee4b4509bec7eec2b',
            query: textInput,
            language: "it"
        }
    }).then((resp) => {
        store.movies = resp.data.results
        store.filteredMovies = resp.data.results
        console.log(store.movies)
    })

    //ricerca serie
    axios.get(store.basicURL + "/search/tv", {
        params: {
            api_key: '21da4ccaba75317ee4b4509bec7eec2b',
            query: textInput,
            language: "it"
        }
    }).then((resp) => {
        store.series = resp.data.results
        store.filteredSeries = resp.data.results
        console.log(store.series)
    })
}

export function fetchgeneri() {
    // Recupera i generi per film e serie ed aggiorna le rispettive variabili
    
    axios.get(store.basicURL + "/genre/movie/list", {
        params: {
            api_key: '21da4ccaba75317ee4b4509bec7eec2b',
            language: "it"
        }
    }).then((resp) => {
        store.generiFilm = resp.data.genres
        console.log(store.generiFilm)
    })
    axios.get(store.basicURL + "/genre/tv/list", {
        params: {
            api_key: '21da4ccaba75317ee4b4509bec7eec2b',
            language: "it"
        }
    }).then((resp) => {
        store.generiSerie = resp.data.genres
        console.log(store.generiSerie)
    })
}


