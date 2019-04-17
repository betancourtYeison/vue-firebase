<template>
    <v-layout v-if="production" justify-center align-center>
        <v-card>
            <v-card-text>
                <span>Obra: {{production.show.title}}</span>
            </v-card-text>
            <v-card-text>
                <span>Teatro: {{production.theather.name}}</span>
            </v-card-text>
            <v-card-text>
                <span>Fecha: {{production.date}}</span>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            production: null
        };
    },
    computed: {
        ...mapState("theather", ["shows"])
    },
    created() {
        let { sid, tid, date } = this.$route.params;
        let pid = `${sid}-${tid}-${date}`;
        let show = this.shows.find(s => s.sid === sid);
        if (!show) {
            this.$router.push({ name: "404" });
        }
        this.production = show.productions.find(p => p.pid === pid);
        if (!this.production) {
            this.$router.push({ name: "404" });
        }
    }
};
</script>