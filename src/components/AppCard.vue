<template>
    <div class="my_card">

        <!-- tramite le proprietà di media scelgo se stampare
        una card per film o una card per le serie -->
        <div class="h-100" v-if="media.hasOwnProperty('title')">
            <div class="img_box">
                <img :src="computeImgUrl(media.poster_path)" alt="">
            </div>
            <ul class="my_ul">
                <li>titolo: <b>{{ media.title }}</b></li>
                <li>titolo originale:<b>{{ media.original_title }}</b></li>
                <li>lingua:
                    <img class="flag_img" :src="getFlagURL(media.original_language)" alt="">
                </li>
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
                <li>lingua:
                    <img class="flag_img" :src="getFlagURL(media.original_language)" alt="">
                </li>
                <li>voto: <span v-for="n in transformVoteBase(media.vote_average)"><b class="star">&starf;</b></span>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
import { getEmoji, getImage, getCountryCode } from "language-flag-colors";

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

        // ritorna il percoso completo dell'immagine del media se presente
        // altrimetni ritorna un'immagine generica 
        computeImgUrl(file) {
            if (file) {
                return "https://image.tmdb.org/t/p/w154" + file;
            }
            else {
                return "/imgs/black-bg.jpg"
            }
        },

        //ritorna il voto in base 5
        transformVoteBase(votobase10) {
            return Math.round(votobase10 / 2)
        },
        
        
        // dal codice lingua trova il codice Paese e ne ritorna l'url della bandiera
        getFlagURL(lang) {
            return getImage(getCountryCode(lang))
        }
        
    },
    computed: {
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

.flag_img {
    width: 20px;
}
</style>
