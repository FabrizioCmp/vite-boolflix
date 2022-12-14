<template>
    <div class="navbar">

        <h1>BOOLFLIX</h1>
        <!-- al submit emette l'evento ascoltato da App.vue per far effettuare la ricerca -->
        <form @submit.prevent="$emit('performSearch')">
            <input class="my_input" type="text" v-model="store.searchText" placeholder="inserisci titolo">
            <button type="submit">Search</button>
        </form>

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

    },
    created(){
        fetchgeneri()
    },
    computed: {

    }
}
</script>


<style scoped lang="scss">
.navbar {
    background-color: black;
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid red;

    h1 {
        margin-bottom: 0%;
        color: red;
        font-weight: 700;
        text-shadow: 2px 1px white;
    }

    form {
        button {
            border: none;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 3px 6px;
            background-color: red;
            color: white;
        }
        .my_input{
            width: 300px;   
        }
    }
}
</style>
