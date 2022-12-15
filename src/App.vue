<template>

    <!-- aspetta l'evento dal componente AppHeader per effetuare  
        la ricerca tramite la funzoine importata dallo store  -->
    <AppHeader @performSearch="search"></AppHeader>
    <AppMain></AppMain>

</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue"
import { store, searchMedia } from "./store";

export default {
    components: { AppHeader, AppMain },
    data() {
        return {
            store,
        }
    },
    methods: {
        search() {
            store.searchPerformed = false
            store.movies = []
            store.series = []
            store.activeFilterMovies = null
            store.activeFilterSeries = null
            if (store.searchText) {
                searchMedia(store.searchText);
                console.log("ricerca effettuata")
            }
            
            //evita che si veda il banner NoResult nell'istante tra l'invio della richiesta API
            // e la ricezione dei dati richiesti
            setTimeout(function () { return store.searchPerformed = true }, 700)
        }
    }
}

</script>


<style lang="scss">
@use "./style/general.scss";

body {
    background-color: black;
}

</style>
