<template>
    <div class="my_navbar">

        <h1>BOOLFLIX</h1>
        <!-- al submit emette l'evento ascoltato da App.vue per far effettuare la ricerca -->
        <div class="menu">
            <h3 @click="displayOnlyFilm">Film</h3>
            <h3 @click="displayOnlySerie">Serie</h3>
            <h3 @click="displayAll">Tutti</h3>
            <form @submit.prevent="$emit('performSearch')">
                <input class="my_input" type="text" v-model="store.searchText" placeholder="inserisci titolo">
                <button type="submit">Search</button>
            </form>
        </div>
    </div>
</template>

<script>

import { store, fetchgeneri } from "../store";

export default {
    data() {
        return {
            store,
            datoTest: 0,

        }
    },
    methods: {
        displayOnlyFilm(){
            store.showSerieBox = false
            store.showFilmBox = true
            store.showGeneriFilm = false 
            store.activeFilterMovies = null
            store.filteredMovies = store.movies
    
        },
        displayOnlySerie(){
            store.showFilmBox = false
            store.showSerieBox = true
            store.showGeneriSerie = false
            store.activeFilterSeries = null
            store.filteredSeries = store.series
        },
        displayAll(){
            store.showFilmBox = true
            store.showGeneriSerie = true
            store.showGeneriFilm = false 
            store.activeFilterMovies = null
            store.showGeneriSerie = false
            store.activeFilterSeries = null
            store.filteredMovies = store.movies
            store.filteredSeries = store.series

        }

    },
    created() {
        fetchgeneri()
    },
}
</script>


<style scoped lang="scss">
.my_navbar {
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
    border-bottom: 1px solid red;
    max-width: 100vw;
    position: fixed;
    z-index: 500;
    top: 0;
    width: 100%;

    .menu {
        display: flex;
        align-items: center;
        column-gap: 5%;
        
        h3 {
            color: white;
            cursor: pointer;
            margin-bottom: 0;
        }
    }

    h1 {
        margin-bottom: 0%;
        color: red;
        font-weight: 700;
        text-shadow: 2px 1px white;
    }

    form {
        display: flex;
        button {
            border: none;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 3px 6px;
            background-color: red;
            color: white;
        }

        .my_input {
            width: 300px;
        }
    }
}
</style>
