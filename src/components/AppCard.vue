<template>

    <div class="my_card" @mouseover.="displayDescription = true"
        @mouseenter="checkMediatype, searchActors(this.mediaType, this.media.id)"
        @mouseleave="displayDescription = false">
        <div class="h-100">
            <div class="img_box">
                <img :src="computeImgUrl(media.poster_path)" alt="">
            </div>
            <div v-show="displayDescription || !media.poster_path" class="description_box">
                <ul class="my_ul">
                    <li>titolo: <b>{{ functiontitle.title }}</b></li>
                    <li>titolo originale: <b>{{ functiontitle.original_title }}</b></li>
                    <li>lingua:
                        <img v-if="getFlagURL(media.original_language)" class="flag_img"
                            :src="getFlagURL(media.original_language)" alt="">
                        <span v-else>{{ media.original_language }}</span>
                    </li>
                    <li>voto:
                        <span v-for="i in 5" class="star"
                            :class="{ star_dark: changeStarColor(i, transformVoteBase(media.vote_average)) }">
                            &starf;
                        </span>
                    </li>
                    <li>overview: <b>{{ media.overview }}</b></li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import { store } from "../store.js"
import { getImage, getCountryCode } from "language-flag-colors";
import axios from "axios";

export default {
    props: {
        media: {
            type: Object,
        }
    },
    data() {
        return {
            displayDescription: false,
            mediaType: "",
            basicURL: "https://api.themoviedb.org/3"
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


        searchActors(media, mediaId) {
            axios.get(this.basicURL + "/" + media + "/" + mediaId + "/credits", {
                params: {
                    api_key: '21da4ccaba75317ee4b4509bec7eec2b',
                }
            })
                .then((resp) => {
                    console.log(resp)
                    if (resp.data.cast.length > 0) {
                        for (let i = 0; i < 5; i++) {
                            store.filmActors.push(resp.data.cast[i].name)
                            if (i === (resp.data.cast.length -1)){
                                break
                            }
                        }
                        console.log(store.filmActors)
                    }else{
                        store.filmActors.push("No info")
                        console.log("no info")
                    }
                })

        }

    },
    computed: {

        //gestice le proprietà della card in base al tipo di media (film|serie)
        functiontitle() {
            const meidaObj = {
                "title": this.media.title ?? this.media.name,
                "original_title": this.media.original_title ?? this.media.original_name
            }
            return meidaObj;
        },

        //in base alle proprietà del media agiorna la variabile mediaType=(movie|tv)
        checkMediatype() {
            this.mediaType = (this.media.hasOwnProperty("title") ? "movie" : "tv");
        }

    }
}
</script>


<style scoped lang="scss">
.my_card {
    position: relative;
    height: 300px;
    box-shadow: 4px 4px 10px black;
    border-radius: 20px;
    border: 3px solid rgb(255, 0, 0);

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
}

.star {
    color: rgb(231, 214, 67);
    width: 20px;
}

.star_dark {
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
