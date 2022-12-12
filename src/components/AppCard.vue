<template>
    <div class="my_card">
        <div class="h-100" v-if="media.hasOwnProperty('title')">
            <div class="img_box">
                <img :src="computeImgUrl(media.poster_path)" alt="">
            </div>
            <ul class="my_ul">
                <li>titolo: <b>{{ media.title }}</b></li>
                <li>titolo originale:<b>{{ media.original_title }}</b></li>
                <li>lingua: <b>{{ media.original_language }}</b></li>
                <li>voto: <span v-for="n in transformVoteBase(media.vote_average)"><b class="star">&starf;</b></span>
                </li>
            </ul>
        </div>
        <div class="h-100" v-else>
            <div class="img_box">
                <img :src="computeImgUrl(media.poster_path)" alt="">
            </div>
            <ul class="my_ul">
                <li>titolo: <b>{{ media.name }}</b></li>
                <li>titolo originale: <b>{{ media.original_name }}</b></li>
                <li>lingua: <b>{{ media.original_language }}</b></li>
                <li>voto: <span v-for="n in transformVoteBase(media.vote_average)"><b class="star">&starf;</b></span>
                </li>
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
            if (file) {
                return "https://image.tmdb.org/t/p/w154" + file;
            }
            else{
                return "/imgs/black-bg.jpg"
            }
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
.my_card {
    position: relative;
    height: 300px;
    box-shadow: 4px 4px 10px black;
    border-radius: 10px;

}

.my_ul {
    list-style: none;
    padding-left: 0px;
    font-size: .8rem;
    color: white;
    position: absolute;
    top: 10%;
    left: 10%;
    z-index: 5;
}

.star {
    color: rgb(231, 214, 67);
}

.img_box {
    height: 100%;
    width: 100%;
}

img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
}
</style>
