<template>
    <v-layout v-if="show" justify-center text-xs-center>
        <v-flex xs12 sm10 md12 lg8>
            <h4 class="display-1 secondary--text mt-1">¡Reserva tus entradas para</h4>
            <h2 class="display-3 secondary--text mb-3">{{show.title}}!</h2>
            <v-layout wrap align-center>
                <v-flex xs12 md6>
                    <v-card class="ma-3">
                        <v-img :src="require(`@/assets/shows/${show.picture}`)"></v-img>
                        <v-card-text
                            class="subheading font-italic text-xs-justify"
                        >{{show.description}}</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6>
                    <v-card class="ma-3">
                        <v-date-picker
                            class="elevation-0"
                            v-model="showDate"
                            full-width
                            locale="es-co"
                            :reactive="true"
                            :min="minDate"
                            :max="maxDate"
                            :allowed-dates="validateDate"
                            :events="activeDates"
                            :event-color="d => d < currentDateText ? 'gray lighten-1' : 'green darken-1'"
                            @change="getSchedules"
                        ></v-date-picker>
                        <v-card-text>
                            <v-progress-linear v-if="gettingSchedules" :indeterminate="true"></v-progress-linear>
                            <v-layout v-else justify-center text-xs-center>
                                <v-list two-line>
                                    <v-list-tile
                                        v-for="(production, index) in productions"
                                        :key="index"
                                    >
                                        <v-list-tile-action>
                                            <v-btn
                                                :to="{path: production.url}"
                                                color="secondary"
                                            >Reservar</v-btn>
                                        </v-list-tile-action>
                                        <v-list-tile-content class="ml-3">
                                            <v-list-tile-title>{{production.date}}</v-list-tile-title>
                                            <v-list-tile-sub-title>{{production.place}}</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
import { db } from "@/firebase";
import { generateFormatDate, generateFormatHour } from "@/utils/formats";
export default {
    data() {
        return {
            show: null,
            showDate: null,
            currentDate: new Date(),
            currentDateText: generateFormatDate(new Date(), "-"),
            minDate: null,
            maxDate: null,
            gettingSchedules: false,
            productions: [],
            hourZone: -5,
            activeDates: null
        };
    },
    created() {
        this.getShow();
    },
    methods: {
        ...mapMutations(["showError"]),
        async getShow() {
            let sid = this.$route.params.sid;

            try {
                let doc = await db
                    .collection("shows")
                    .doc(sid)
                    .get();
                if (doc) {
                    this.show = doc.data();
                    if (this.show.dates && this.show.dates.length > 0) {
                        let showDates = this.show.dates.map(timestamp => {
                            let date = timestamp.toDate();
                            date.setHours(
                                date.getHours() +
                                    date.getTimezoneOffset() / 60 +
                                    this.hourZone
                            );
                            return date;
                        });
                        showDates.sort((a, b) => {
                            return a - b;
                        });
                        let minDateAvailable = showDates.find(
                            d => d >= this.currentDate
                        );
                        if (minDateAvailable) {
                            this.minDate = generateFormatDate(
                                minDateAvailable,
                                "-"
                            );
                            this.maxDate = generateFormatDate(
                                showDates[showDates.length - 1],
                                "-"
                            );
                            this.activeDates = showDates.map(date => {
                                return generateFormatDate(date, "-");
                            });
                            this.activeDates = [...new Set(this.activeDates)];
                            this.showDate = this.minDate;
                            this.getSchedules();
                        }
                    }
                } else {
                    this.$router.push({ name: "404" });
                }
            } catch (error) {
                this.showError(
                    "Ocurrió un error consultando la obra. Inténtalo más tarde."
                );
            } finally {
                if (!this.show) {
                    this.$router.push({ name: "404" });
                }
            }
        },
        async getSchedules() {
            let initDate = new Date(this.showDate);
            initDate.setHours(initDate.getHours() - this.hourZone);
            let finalDate = new Date(initDate);
            finalDate.setDate(finalDate.getDate() + 1);
            try {
                this.gettingSchedules = true;
                let data = await db
                    .collection("shows")
                    .doc(this.show.sid)
                    .collection("productions")
                    .where("date", ">=", initDate)
                    .where("date", "<", finalDate)
                    .get();

                this.productions = data.docs.map(doc => {
                    let production = doc.data();
                    let productionDate = production.date.toDate();
                    productionDate.setHours(
                        productionDate.getHours() +
                            productionDate.getTimezoneOffset() / 60 +
                            this.hourZone
                    );
                    return {
                        pid: production.pid,
                        date: `${generateFormatDate(
                            productionDate,
                            "/"
                        )} ${generateFormatHour(productionDate)}`,
                        place: production.theather.name,
                        url: `/${this.show.sid}/${
                            production.theather.tid
                        }/${generateFormatDate(productionDate, "-", true)}`
                    };
                });
            } catch (error) {
                this.showError(
                    "Ocurrió un error consultando los horarios para la fecha seleccionada. Inténtalo más tarde."
                );
            } finally {
                this.gettingSchedules = false;
            }
        },
        validateDate(date) {
            if (!this.activeDates) return false;
            if (date < this.currentDateText) return false;
            return this.activeDates.indexOf(date) !== -1;
        }
    }
};
</script>