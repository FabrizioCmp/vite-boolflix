<template>
    <ul class="ul_generi">
        <li v-for="(genere, i) in listageneri" @click="activateGenere(genere), filterMovieforGenere()"
            :key="i + genere.id">{{ genere.name }}</li>
        <li @click="resetfilter()" class="clear_button">Clear</li>
    </ul>

</template>

<script>
import { escapeHtml } from '@vue/shared';
import { store, } from '../store';

export default {
    props: {
        listageneri: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {

        }

    },
    methods: {

        activateGenere(genere) {
            //SE siamo nel box film aggiorna l'activefilter per i FILM
            if (this.listageneri === store.generiFilm) {
                store.activeFilterMovies = genere.id
            }else{
                // ALTRIMENTI aggiorna l'aticvefilter per le SERIE
                store.activeFilterSeries = genere.id
            }
        },


        filterMovieforGenere() {
            const lenghtMovies = store.movies.length
            const lengthSeries = store.series.length
            
            //SE listageneri corrisponde a quella dei film, allora cicla tra i film
            // e crea un nuovo array di film filtrati per genere
            if (this.listageneri === store.generiFilm) {
                store.filteredMovies = []
                for (let i = 0; i < lenghtMovies; i++) {
                    if (store.movies[i].genre_ids.includes(store.activeFilterMovies)) {
                        store.filteredMovies.push(store.movies[i])
                    }
                }
            } else { //ALTRIMENTI cicla tra le serie e crea un nuovo array di serie filtrate per genere
                store.filteredSeries = []
                for (let i = 0; i < lengthSeries; i++) {
                    if (store.series[i].genre_ids.includes(store.activeFilterSeries)) {
                        store.filteredSeries.push(store.series[i])
                        console.log("match")
                    }
                }
                console.log("filtered ", store.filteredSeries)
            }
        },


        resetfilter() {
            // SE siamo nel box film allora resetta il filtro dei film
            if (this.listageneri === store.generiFilm) {
                store.filteredMovies = store.movies
                store.activeFilterMovies = null
            } else {
                //ALTRIMENTI resetta il filtro delle seire
                store.filteredSeries = store.series
                store.activeFilterSeries = null
            }
        }
    }
}

</script>

<style scoped lang="scss">
.ul_generi {
    list-style: none;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 20px;
    row-gap: 10px;
    color: white;
    padding: 1rem 0;
    border-radius: 20px;

    li {
        cursor: pointer;
        background-color: gray;
        padding: 1px 10px;
        border-radius: 5px;
        border: 1px solid white;

        &:active {
            background-color: white;
        }
    }

    .clear_button {
        background-color: red;
    }
}
</style>