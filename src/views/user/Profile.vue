<template>
    <v-layout text-xs-center align-start justify-center>
        <v-card class="elevation-6">
            <v-card-text>
                <div class="ma-2">{{user.name + ' ' + user.lastName}}</div>
                <!-- <img class="ma-2 picture" :src="require('@/assets/profile.png')" alt="profile"> -->
                <v-img class="ma-2 picture" :src="user.picture" alt="profile"></v-img>
                <div class="ma-2">{{user.description}}</div>
                <a class="ma-2 link" :href="user.biography" target="_blank">Biografía</a>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("session", ["user"])
    }
};
</script>

<style>
.picture {
    width: 200px;
    height: 100%;
}
.link {
    text-decoration: none;
    font-size: 1rem;
    color: #0058be;
}
</style>
