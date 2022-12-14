<template>
    <div class="container">
        <div v-if="checkIfFilm" class="movie_box">
            <h2>Film &#127871;</h2>
            <div class="row gy-3 my-3 ">
                <div v-for="movie in store.movies" class="col-sm-6 col-md-4 col-lg-3">
                    <AppCard :media="movie"></AppCard>
                </div>
            </div>
        </div>
        <div v-if="checkIfSeries" class="series_box">
            <h2>Serie &#128250;</h2>
            <div class="row gy-3 my-3">
                <div v-for="serie in store.series" class="col-3">
                    <AppCard :media="serie"></AppCard>
                </div>
            </div>
        </div>
        <div v-if="!checkIfSeries && !checkIfFilm && store.searchPerformed" class="no_results">
            No results
        </div>
    </div>
</template>

<script>
import AppCard from "./AppCard.vue";
import { store } from "../store";

export default {
    components: { AppCard },
    data() {
        return {
            store,
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


<style lang="scss">
.movie_box {
    margin: 3rem 0;
}

.series_box {
    margin: 1rem 0;
}

h2 {
    text-align: center;
    color: white;
    background-color: red;
    width: 20%;
    margin: auto;
    border-radius: 15px;
    box-shadow: 3px 3px 10px black;

}

.no_results{
    width: 50%;
    margin: auto;
    font-size: 5rem;
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

</style>
