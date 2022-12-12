<template>
    <div>
        <form @submit.prevent="$emit('performSearch')">
            <input type="text" v-model="store.searchText">
            <button type="submit">Search</button>
        </form>
    </div>
</template>

<script>

import { store } from "../store";

export default {
    data() {
        return {
            store,
            datoTest: 0,
            
        }
    },
    methods: {

    },
    computed: {

    }
}
</script>


<style lang="scss">

</style>
