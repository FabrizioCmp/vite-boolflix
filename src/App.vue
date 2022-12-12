<template>
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
            if (store.searchText) {
                searchMedia(store.searchText);
                console.log("ricerca effettuata")
            }
        }
    }
}

</script>


<style lang="scss">
@use "./style/general.scss";

body {
    background-color: antiquewhite;
}
</style>
