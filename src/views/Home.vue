<template>
    <v-layout column justify-center text-xs-center>
        <div class="home-title">
            <h1>Súper Ópera</h1>
        </div>
        <v-layout wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="show in shows" :key="show.sid">
                <v-card class="elevation-5 ma-3" :to="{ name: 'show', params: {sid: show.sid}}">
                    <v-img :src="show.picture">
                        <v-layout align-end justify-center fill-height>
                            <v-spacer></v-spacer>
                            <v-card-text class="home-show-title">{{show.title}}</v-card-text>
                        </v-layout>
                    </v-img>
                </v-card>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
import { db } from "@/firebase";
export default {
    data() {
        return {
            shows: []
        };
    },
    created() {
        this.loadShows();
    },
    methods: {
        ...mapMutations(["showError", "showWarning"]),
        async loadShows() {
            try {
                let docs = await db
                    .collection("shows")
                    .where("active", "==", true)
                    // .orderBy("sid", "desc")
                    // .limit(2)
                    .get();
                docs.forEach(doc => {
                    this.shows.push(doc.data());
                });
                if (this.shows.length === 0) {
                    this.showWarning("No hay obras disponibles en el momento.");
                }
            } catch (error) {
                this.showError(
                    "Ocurrió un error consultando las obras. Inténtalo más tarde."
                );
            }
        }
    }
};
</script>

<style>
.home-title {
    font-family: "Dancing Script", cursive;
    font-size: 2rem;
    color: #0058be;
    text-shadow: 1px 1px 5px #9b9b9b;
}
.home-show-title {
    font-size: 2.4rem;
    color: white;
    opacity: 0.9;
    vertical-align: end;
}
</style>
