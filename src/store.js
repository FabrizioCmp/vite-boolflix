import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
    searchText: "",
    movies: [],
    series: [],
})

export function searchMedia(textInput) {

    // textInput(stringa) rappresenta il contenuto della searchBox in cui l'utente effetua la ricerca
    const basicURL = "https://api.themoviedb.org/3";

    axios.get(basicURL + "/search/movie", {
        params: {
            api_key: '21da4ccaba75317ee4b4509bec7eec2b',
            query: textInput,
        }
    })
        .then((resp) => {
            store.movies = resp.data.results

        })
    axios.get(basicURL + "/search/tv", {
        params: {
            api_key: '21da4ccaba75317ee4b4509bec7eec2b',
            query: textInput,
        }
    })
        .then((resp) => {
            store.series = resp.data.results
        })
}