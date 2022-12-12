<template>
    <div class="container">
        <div v-if="checkIfFilm" class="movie_box">
            <h2>Film</h2>
            <div class="row">
                <div v-for="movie in store.movies" class="col-3">
                    <AppCard :media="movie"></AppCard>
                </div>
            </div>
        </div>
        <div v-if="checkIfSeries" class="series_box">
            <h2>Serie</h2>
            <div class="row">
                <div v-for="serie in store.series" class="col-3">
                    <AppCard :media="serie"></AppCard>
                </div>
            </div>
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
    margin: 1rem 0;
}

.series_box {
    margin: 1rem 0;
}

h2 {
    text-align: center;
    color: white;
}

</style>
