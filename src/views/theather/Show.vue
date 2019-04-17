<template>
    <v-layout v-if="show" justify-center text-xs-center>
        <v-flex xs12 sm6 md4 lg3>
            <div class="show-title">
                <h1>{{show.title}}</h1>
            </div>
            <v-card class="elevation-2 ma-3">
                <v-img :src="show.picture"></v-img>
            </v-card>
            <v-btn
                :to="{ name: 'production', params: { sid: p.show.sid, tid: p.theather.tid, date: p.date }}"
                v-for="p in show.productions"
                :key="p.pid"
            >{{`${p.theather.name} - ${p.date}`}}</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            show: null
        };
    },
    computed: {
        ...mapState("theather", ["shows"])
    },
    created() {
        let sid = this.$route.params.sid;
        this.show = this.shows.find(s => s.sid === sid);
        if (!this.show) {
            this.$router.push({ name: "404" });
        }
    }
};
</script>

<style>
.show-title {
    font-size: 1.5rem;
    color: #0058be;
}
</style>
