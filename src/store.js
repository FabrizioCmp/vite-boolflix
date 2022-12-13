import { reactive } from "vue";
import axios from "axios";

export const store = reactive({

    searchText: "", //aggiornato dal componente AppHeader
    movies: [],
    series: [],

})

export function searchMedia(textInput) {
    // textInput(stringa) rappresenta il contenuto della searchBox in cui l'utente effetua la ricerca

    const basicURL = "https://api.themoviedb.org/3";

    //ricerca film
    axios.get(basicURL + "/search/movie", {
        params: {
            api_key: '21da4ccaba75317ee4b4509bec7eec2b',
            query: textInput,
            language: "it"
        }
    })
        .then((resp) => {
            store.movies = resp.data.results
            console.log(store.movies)
        })

    //ricerca serie
    axios.get(basicURL + "/search/tv", {
        params: {
            api_key: '21da4ccaba75317ee4b4509bec7eec2b',
            query: textInput,
            language: "it"
        }
    })
        .then((resp) => {
            store.series = resp.data.results
            console.log(store.series)
        })
}

