<template>
    <div class="container marginT">

        <!--*** FILM ***-->
        <div v-if="checkIfFilm && store.showFilmBox" class="movie_box">
            <h2>
                <span class="d-none d-md-inline"> Film <span class="d-none d-lg-inline">&#127871;</span></span>
                <svg @click="changeVisiblityGeneriFilm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500 ">
                    <title>Filter</title>
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="32" d="M32 144h448M112 256h288M208 368h96" />
                </svg>
            </h2>
            <GeneriVue v-if="store.showGeneriFilm" :listageneri="store.generiFilm"></GeneriVue>
            <div class="row gy-3 my-3 ">
                <div v-for="movie in store.filteredMovies" class="col-sm-6 col-md-4 col-lg-3">
                    <AppCard :media="movie"></AppCard>
                </div>
            </div>
        </div>

        <!--*** SERIE ***-->
        <div v-if="checkIfSeries && store.showSerieBox" class="series_box">
            <h2>
                <span class="d-none d-md-inline">Serie <span class="d-none d-lg-inline">&#128250;</span></span>
                <svg @click="changeVisiblityGeneriSerie" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500 ">
                    <title>Filter</title>
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="32" d="M32 144h448M112 256h288M208 368h96" />
                </svg>
            </h2>
            <GeneriVue v-if="store.showGeneriSerie" :listageneri="store.generiSerie"></GeneriVue>
            <div class="row gy-3 my-3">
                <div v-for="serie in store.filteredSeries" class="col-sm-6 col-md-4 col-lg-3">
                    <AppCard :media="serie"></AppCard>
                </div>
            </div>
        </div>

        <!--*** NO RESULTS ***-->
        <div v-if="!checkIfSeries && !checkIfFilm && store.searchPerformed" class="no_results">
            No results
        </div>
    </div>
</template>

<script>
import AppCard from "./AppCard.vue";
import GeneriVue from "./Generi.vue";
import { store, } from "../store";


export default {
    components: { AppCard, GeneriVue },
    data() {
        return {
            store,

        }
    },
    methods: {
        changeVisiblityGeneriFilm() {
            store.showGeneriFilm = store.showGeneriFilm ? false : true;
        },
        changeVisiblityGeneriSerie() {
            store.showGeneriSerie = store.showGeneriSerie ? false : true;
        }
    },
    computed: {
        //ritorna true se sono stati trovati film altrimenti false
        checkIfFilm() {
            if (store.movies.length != 0) {
                return true
            } else {
                return false
            }
        },

        //ritorna true se sono state trovate serie altrimenti false
        checkIfSeries() {
            if (store.series.length != 0) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>


<style scoped lang="scss">
.movie_box {
    margin: 3rem 0;

}

.series_box {
    margin: 1rem 0;

}

h2 {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 30px;
    color: white;
    background-color: red;
    width: 20%;
    border-radius: 15px;
    box-shadow: 3px 3px 10px black;

    svg {
        width: 40px;
        border: 2px solid white;
        border-radius: 10px;
        padding: 3px;
        height: 30px;
        cursor: pointer;

        &:active {
            background-color: black;
        }
    }

}

.no_results {
    width: 50%;
    margin: auto;
    font-size: 5vw;
    font-weight: 600;
    text-align: center;
    margin-top: 5rem;
    background-color: red;
    color: white;
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 5px 5px 10px black;
    text-shadow: 5px 5px black;
}

.marginT {
    margin-top: 9rem;
}
</style>
