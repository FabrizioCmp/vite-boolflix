<template>
    
    <div class="my_card" @mouseover.="displayDescription = true"
        @mouseenter="checkMediatype, searchActors(this.mediaType, this.media.id)"
        @mouseleave="displayDescription = false">
        <div class="h-100">

            <div class="img_box">
                <img :src="computeImgUrl(media.poster_path)" alt="">
                <!-- se non ho l'immagine e non è in hover allora mostra il titolo  -->
                <div v-if="!media.poster_path && !displayDescription" class="noImg_title"> 
                    {{defineTitle.title}}
                </div>
            </div>

            <!-- 'displayDescription' messa a True con l'hover sulla card -->
            <div v-show="displayDescription" class="description_box">
                <ul class="my_ul">
                    <!-- nasconde il  titolo se guale a titoloOriginale  -->
                    <li v-if="!hideTitle"><b>titolo: </b> {{ defineTitle.title }}</li>
                    <li><b>titolo originale: </b>{{ defineTitle.original_title }}</li>
                    <li><b> lingua: </b>
                        <!-- mostra la bandiera della lingua se presente altrimenti
                        mostra la lingua in formato ISO 639 -->
                        <img v-if="getFlagURL(media.original_language)" class="flag_img"
                            :src="getFlagURL(media.original_language)" alt="">
                        <span v-else>{{ media.original_language }}</span>
                    </li>
                    <li> <b>voto: </b>
                        <!-- se i è maggiore del voto, sovrascrivo la classe star con star_dark -->
                        <span v-for="i in 5" class="star"
                            :class="{ star_dark: changeStarColor(i, transformVoteBase(media.vote_average)) }">
                            &starf;
                        </span>
                    </li>
                    <li>
                        <b>attori: </b>
                        <span v-for="actor in store.actors">{{ ` ${actor}` }}</span>
                    </li>
                    <li><b>overview: </b>{{ (media.overview) ? media.overview : "no info" }}</li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import { store } from "../store.js"
import { getImage, getCountryCode } from "language-flag-colors";
import axios from "axios";
import { def } from "@vue/shared";

export default {
    props: {
        media: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            store,
            displayDescription: false,
            mediaType: "",
            basicURL: "https://api.themoviedb.org/3",
            noImg : false,
            hideTitle: false
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

                return "/imgs/B.png"
            }
        },

        //ritorna il voto in base 5
        transformVoteBase(votobase10) {
            return Math.round(votobase10 / 2);
        },


        // dal codice lingua trova il codice Paese e ne ritorna l'url della bandiera
        getFlagURL(lang) {
            return getImage(getCountryCode(lang));
        },

        //se l'indice è maggiore del voto(target) allora stampo una stella nera
        changeStarColor(index, target) {
            if (index > target) {
                return true;
            }
        },

        // Richiesta Api per gli attori e memorizzazione dei primi 5
        searchActors(media, mediaId) {
            axios.get(this.basicURL + "/" + media + "/" + mediaId + "/credits", {
                params: {
                    api_key: '21da4ccaba75317ee4b4509bec7eec2b',
                }
            })
                .then((resp) => {
                    // svuota gli array e poi li riempe con i dati dalla nuova chiamata API
                    store.actors = [];
                    if (resp.data.cast.length > 0) {
                        for (let i = 0; i < 5; i++) {
                            store.actors.push(resp.data.cast[i].name + ",")
                            if (i === (resp.data.cast.length - 1)) {
                                break
                            }
                        }
                    } else {
                        store.actors.push("No info")
                    }
                })

        }

    },
    computed: {

        //gestice le proprietà della card in base al tipo di media (film|serie)
        // e nasconde il titolo se uguale al titolo originale
        defineTitle() {
            const mediaObj = {
                "title": this.media.title ?? this.media.name,
                "original_title": this.media.original_title ?? this.media.original_name
            }
            if(mediaObj.title === mediaObj.original_title){
                this.hideTitle = true
            }
            return mediaObj;
        },

        //in base alle proprietà del media agiorna la variabile mediaType=(movie|tv)
        checkMediatype() {
            this.mediaType = (this.media.hasOwnProperty("title") ? "movie" : "tv");
        }

    },
}
</script>


<style scoped lang="scss">
.my_card {
    position: relative;
    height: 300px;
    box-shadow: 4px 4px 10px black;
    border-radius: 20px;
    border: 3px solid rgb(255, 0, 0);
    max-width: 300px;
    margin: 0 auto;

    .description_box {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        background-color: rgba(0, 0, 0, 0.813);
        overflow-y: scroll;

        &::-webkit-scrollbar {
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

    li {
        margin-top: 4px;

        b {
            font-size: 1rem;
            text-shadow: 1px 1px red;
        }
    }
}

.star {
    color: rgb(231, 214, 67);
    width: 20px;
}

.star_dark {
    color: rgb(60, 59, 59);
}


.img_box {
    height: 100%;
    width: 100%;
    .noImg_title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
        text-align: center;
        padding: 10px;
        color: white;
        border-radius: 10px;
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.798);
    }
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
