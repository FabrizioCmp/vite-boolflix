<template>
    <div class="my_card">
        <div v-if="media.hasOwnProperty('title')">
            <div class="img_box">
                <img :src="computeImgUrl(media.poster_path)" alt="">
            </div>
            <ul>
                <li>titolo: <b>{{ media.title }}</b></li>
                <li>titolo originale:<b>{{ media.original_title }}</b></li>
                <li>lingua: <b>{{ media.original_language }}</b></li>
                <li>voto: <span v-for="n in transformVoteBase(media.vote_average)"><b class="star">&starf;</b></span></li>
            </ul>
        </div>
        <div v-else>
            <div class="img_box">
                <img :src="computeImgUrl(media.poster_path)" alt="">
            </div>
            <ul>
                <li>titolo: <b>{{ media.name }}</b></li>
                <li>titolo originale: <b>{{ media.original_name }}</b></li>
                <li>lingua: <b>{{ media.original_language }}</b></li>
                <li>voto: <span v-for="n in transformVoteBase(media.vote_average)"><b class="star">&starf;</b></span></li>
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
        }
    },
    methods: {
        computeImgUrl(file) {
            return "https://image.tmdb.org/t/p/w154" + file;
        },
        transformVoteBase(votobase10) {
            return Math.round(votobase10 / 2)
        }

    },
    computed: {
        filterTypeOfMedia() {
            if (this.media.hasOwnProperty("title")) {

            }
        },
    }
}
</script>


<style lang="scss">
.my_card{
    position: relative;
}
ul {
    list-style: none;
    padding-left: 0;
    font-size: .8rem;
    color: white;
    position: absolute;
    top: 10%;
    z-index: 5;
}
.star{
    color: rgb(231, 214, 67);
}

img{
    width: 100%;
    position: relative;
}
</style>
