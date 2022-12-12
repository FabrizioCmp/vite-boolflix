<template>
    <div class="my_card">
        <div v-if="mediaObj.hasOwnProperty('title')">
            <ul>
                <li>titolo: <b>{{ mediaObj.title }}</b></li>
                <li>titolo originale:<b>{{ mediaObj.original_title }}</b></li>
                <li>lingua: <b>{{ media.original_language }}</b></li>
                <li>voto: <b>{{ mediaObj.vote_average }}</b></li>
            </ul>
        </div>
        <div v-else>
            <ul>
                <li>titolo: <b>{{ mediaObj.name }}</b></li>
                <li>titolo originale: <b>{{ mediaObj.original_name }}</b></li>
                <li>lingua: <b>{{ media.original_language }}</b></li>
                <li>voto <b>{{ mediaObj.vote_average }}</b></li>
            </ul>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        media: {
            type: Object,
        }
    },
    data() {
        return {
            mediaObj: this.media
        }
    },
    computed: {
        filterTypeOfMedia() {
            if (this.media.hasOwnProperty("title")) {

            }
        }
    }
}
</script>


<style lang="scss">
ul{
    list-style: none;
    padding-left: 0;
    font-size: .8rem;
}
</style>
