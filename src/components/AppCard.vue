<template>
    <div class="my_card" @mouseover="displayDescription = true" @mouseleave="displayDescription=false">
        <!-- tramite le proprietà di media scelgo se stampare
        una card film o una card  serie -->
        
        <!-- card FILM -->
        <div class="h-100" v-if="media.hasOwnProperty('title')">
            <div class="img_box">
                <img :src="computeImgUrl(media.poster_path)" alt="">
            </div>
            <div v-show="displayDescription" class="description_box">
                <ul class="my_ul">
                    <li>titolo: <b>{{ media.title }}</b></li>
                    <li>titolo originale: <b>{{ media.original_title }}</b></li>
                    <li>lingua:
                        <img v-if="getFlagURL(media.original_language)" class="flag_img" :src="getFlagURL(media.original_language)" alt="">
                        <span v-else>{{media.original_language}}</span>
                    </li>
                    <li>voto: 
                        <span v-for="i in 5" class="star" :class="{star_dark : changeStarColor(i, transformVoteBase(media.vote_average))}">
                            &starf;    
                        </span>     
                    </li>
                    <li>overview: <b>{{media.overview}}</b></li>
                </ul>
            </div>
        </div>

        <!-- card SERIE -->
        <div class="h-100" v-else>
            <div class="img_box">
                <img :src="computeImgUrl(media.poster_path)" alt="">
            </div>
            <div v-show="displayDescription" class="description_box">
                <ul class="my_ul">
                    <li>titolo: <b>{{ media.name }}</b></li>
                    <li>titolo originale: <b>{{ media.original_name }}</b></li>
                    <li>lingua:
                        <img v-if="getFlagURL(media.original_language)" class="flag_img" :src="getFlagURL(media.original_language)" alt="">
                        <span v-else>{{media.original_language}}</span>
                    </li>
                    <li>voto: 
                        <span v-for="i in 5" class="star" :class="{star_dark : changeStarColor(i, transformVoteBase(media.vote_average))}">
                            &starf;    
                        </span>            
                    </li>
                </ul>
            </div>
        </div>
        
    </div>

</template>

<script>

import { getImage, getCountryCode } from "language-flag-colors";

export default {
    props: {
        media: {
            type: Object,
        }
    },
    data() {
       return{
        displayDescription :false
       }
    },
    methods: {

        // ritorna il percoso completo dell'immagine del media se presente
        // altrimetni ritorna un'immagine generica 
        computeImgUrl(file) {
            if (file) {
                return "https://image.tmdb.org/t/p/w300" + file;
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
        },

        changeStarColor(index,target){
            if(index > target){
                return true
            }
        }

    },
    computed: {
    }
}
</script>


<style scoped lang="scss">
.my_card {
    position: relative;
    height: 300px;
    box-shadow: 4px 4px 10px black;
    border-radius: 20px;
    border: 3px solid red;

    .description_box {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        background-color: rgba(0, 0, 0, 0.823);
        overflow-y: scroll;

        &::-webkit-scrollbar{
            width: 0px;
        }
    }
}

.my_ul {
    list-style: none;
    margin: 8%;
    padding-left: 0px;
    font-size: .8rem;
    color: white;
}

.star {
    color: rgb(231, 214, 67);
    width: 20px;
}
.star_dark{
    color: rgb(32, 32, 32);
}


.img_box {
    height: 100%;
    width: 100%;
   
}

img {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    z-index: -1;
}

.flag_img {
    width: 20px;
}
</style>
