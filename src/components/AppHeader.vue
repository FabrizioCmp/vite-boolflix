<template>
    <form @submit.prevent="" action="">
        <input type="text" name="" id="">
        <button  type="submit">Search</button>
    </form>

</template>

<script>

import {store} from "../store";

export default{
    data(){
        return{
            store,
            datoTest: 0
        }
    },
    methods:{   
    },
    computed:{

    } 
}
</script>


<style lang="scss">
</style>
