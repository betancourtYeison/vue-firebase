<template>
    <v-layout v-resize="onResize" justify-center align-start>
        <v-layout v-if="production && seats" column>
            <v-layout column justify-center text-xs-center my-3 class="secondary--text">
                <h3 class="display-2">{{show.title}}</h3>
                <h4 class="display-1">{{theather.name}}</h4>
                <h5 class="headline">{{productionDate}}</h5>
            </v-layout>
            <v-divider></v-divider>
            <v-layout justify-center my-3>
                <v-flex :shrink="true" class="mr-3">
                    <v-layout>
                        <v-icon color="grey darken-3" :size="22">add</v-icon>
                        <span class="ml-2">Asiento Disponible</span>
                    </v-layout>
                    <v-layout>
                        <v-icon color="grey darken-3" :size="22">person</v-icon>
                        <span class="ml-2">Asiento Ocupado</span>
                    </v-layout>
                    <v-layout>
                        <v-icon color="grey darken-3" :size="22">check_circle</v-icon>
                        <span class="ml-2">Asiento Seleccionado</span>
                    </v-layout>
                    <v-layout>
                        <v-icon color="grey darken-3" :size="22">monetization_on</v-icon>
                        <span class="ml-2">Asiento Pagado</span>
                    </v-layout>
                </v-flex>
                <v-flex :shrink="true" class="ml-3">
                    <div v-for="category in categories" :key="category.price">
                        <v-icon :color="category.color" :size="22">lens</v-icon>
                        <span class="ml-3">$ {{category.price}}</span>
                    </div>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-slide-y-transition mode="out-in">
                <v-layout
                    v-if="selectedSeats && selectedSeats.length > 0"
                    column
                    justify-center
                    text-xs-center
                    my-3
                >
                    <span class="subheading font-weight-bold">Tu Reserva</span>
                    <v-flex mt-3>
                        <v-slide-y-transition group hide-on-leave>
                            <v-chip
                                @input="selectSeat(seat)"
                                :close="!seat.changingState"
                                :color="seat.changingState ? '#D32F2F' : '#C0CA33'"
                                text-color="white"
                                v-for="seat in selectedSeats"
                                :key="seat.sid"
                            >
                                <v-avatar>
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                {{seat.description}} : $ {{seat.price}}
                            </v-chip>
                        </v-slide-y-transition>
                    </v-flex>
                    <v-layout justify-center mt-3>
                        <v-btn
                            color="secondary"
                            class="subheading"
                            @click="pay"
                        >Pagar Total: $ {{totalSelectedSeats.toLocaleString()}}</v-btn>
                    </v-layout>
                </v-layout>
            </v-slide-y-transition>
            <v-divider v-if="selectedSeats && selectedSeats.length > 0"></v-divider>
            <v-slide-y-transition mode="out-in">
                <v-layout
                    v-if="paidSeats && paidSeats.length > 0"
                    column
                    justify-center
                    text-xs-center
                    my-3
                >
                    <span class="subheading font-weight-bold">Compras Realizadas</span>
                    <v-flex mt-3>
                        <v-slide-y-transition group hide-on-leave>
                            <v-chip
                                text-color="grey darken-1"
                                v-for="seat in paidSeats"
                                :key="seat.sid"
                            >
                                <v-avatar>
                                    <v-icon color="grey darken-1">monetization_on</v-icon>
                                </v-avatar>
                                {{seat.description}} : $ {{seat.price}}
                            </v-chip>
                        </v-slide-y-transition>
                    </v-flex>
                    <span class="subheading mt-2">Total $ {{totalPaidSeats.toLocaleString()}}</span>
                </v-layout>
            </v-slide-y-transition>
            <v-divider v-if="paidSeats && paidSeats.length > 0"></v-divider>
            <v-layout justify-center my-3>
                <v-card color="transparent" class="elevation-0">
                    <v-layout justify-center class="stage">
                        <span class="headline">Escenario</span>
                    </v-layout>
                    <div class="seats">
                        <v-card
                            class="seat"
                            :class="applyCssSeat(seat.state)"
                            v-for="seat in seats"
                            :key="seat.sid"
                            :style="'grid-column: ' + seat.x + '; grid-row: ' + seat.y"
                            :color="getColorSeat(seat.state, seat.color)"
                            @click.native="selectSeat(seat)"
                        >
                            <v-icon
                                v-if="!seat.changingState"
                                color="white"
                                :size="size"
                            >{{getIconSeat(seat.state)}}</v-icon>
                            <v-progress-circular
                                v-else
                                :indeterminate="true"
                                :size="size"
                                color="white"
                            ></v-progress-circular>
                        </v-card>
                    </div>
                </v-card>
            </v-layout>
        </v-layout>
    </v-layout>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { db } from "@/firebase";
import { generateFormatDate, generateFormatHour } from "@/utils/formats";
export default {
    data() {
        return {
            theather: null,
            show: null,
            production: null,
            categories: null,
            seats: null,
            selectedSeats: [],
            totalSelectedSeats: 0,
            paidSeats: [],
            totalPaidSeats: 0,
            size: 27
        };
    },
    computed: {
        ...mapState("session", ["user"]),
        productionDate() {
            if (!this.production) return "";
            let date = this.production.date.toDate();
            return (
                generateFormatDate(date, "/") + " " + generateFormatHour(date)
            );
        }
    },
    created() {
        this.getInformation();
    },
    methods: {
        ...mapMutations(["showBusy", "showError", "showSuccess", "hideBusy"]),
        async getInformation() {
            let { sid, tid, date } = this.$route.params;
            let pid = `${sid}-${tid}-${date}`;
            this.showBusy({
                title: "Consultando Información",
                message: "Consultando la información de la presentación..."
            });

            try {
                let theatherDoc = await db
                    .collection("theathers")
                    .doc(tid)
                    .get();
                if (theatherDoc.exists) {
                    this.theather = theatherDoc.data();
                } else {
                    this.$router.push({ name: 404 });
                    return;
                }

                let showDoc = await db
                    .collection("shows")
                    .doc(sid)
                    .get();
                if (showDoc.exists) {
                    this.show = showDoc.data();
                } else {
                    this.$router.push({ name: 404 });
                    return;
                }

                let productionDoc = await db
                    .collection("shows")
                    .doc(sid)
                    .collection("productions")
                    .doc(pid)
                    .get();
                if (productionDoc.exists) {
                    this.production = productionDoc.data();
                } else {
                    this.$router.push({ name: 404 });
                    return;
                }
                this.categories = this.theather.categories.map(c => {
                    return {
                        color: c.color,
                        price: this.show.categories.find(item => {
                            return item.category === c.category;
                        }).price
                    };
                });
                this.seats = this.theather.seats.map(seat => {
                    let price = this.show.categories.find(item => {
                        return item.category === seat.category;
                    }).price;
                    let color = this.theather.categories.find(
                        item => item.category === seat.category
                    ).color;
                    return {
                        sid: seat.x + "-" + seat.y,
                        category: seat.category,
                        description: seat.description,
                        x: seat.x,
                        y: seat.y,
                        price,
                        color,
                        state: "available",
                        changingState: false
                    };
                });
                this.getReservations();
            } catch (error) {
                this.showError(
                    "Ocurrió un error consultando la información de la presentación. Inténtalo más tarde."
                );
                this.$router.push({ name: 404 });
            } finally {
                this.hideBusy();
            }
        },
        getReservations() {
            db.collection("shows")
                .doc(this.show.sid)
                .collection("productions")
                .doc(this.production.pid)
                .collection("reservations")
                .onSnapshot(
                    snapshot => {
                        snapshot.docChanges().forEach(change => {
                            //added, modified, removed
                            let reservation = change.doc.data();
                            let seat = this.seats.find(
                                seat => seat.sid === reservation.rid
                            );
                            if (
                                change.type === "added" ||
                                change.type === "modified"
                            ) {
                                if (reservation.user.uid === this.user.uid) {
                                    seat.state = reservation.state;
                                    if (seat.state === "selected") {
                                        this.selectedSeats.push(seat);
                                        this.totalSelectedSeats += seat.price;
                                    } else {
                                        this.paidSeats.push(seat);
                                        this.totalPaidSeats += seat.price;
                                    }
                                } else {
                                    seat.state = "busy";
                                }
                            } else {
                                seat.state = "available";
                                if (reservation.user.uid === this.user.uid) {
                                    this.selectedSeats.splice(
                                        this.selectedSeats.indexOf(seat),
                                        1
                                    );
                                    this.totalSelectedSeats -= seat.price;
                                }
                            }
                        });
                    },
                    () => {
                        this.showError(
                            "Ocurrió un error actualizando el estado de algunos asientos."
                        );
                    }
                );
        },
        async selectSeat(seat) {
            if (
                seat.state === "busy" ||
                seat.state === "paid" ||
                seat.changingState
            ) {
                return;
            }
            seat.changingState = true;
            let batch = db.batch();
            if (seat.state === "available") {
                let reservation = {
                    rid: seat.sid,
                    x: seat.x,
                    y: seat.y,
                    date: new Date(),
                    user: {
                        uid: this.user.uid,
                        name: this.user.name,
                        lastName: this.user.lastName
                    },
                    state: "selected"
                };
                let reservationUser = {
                    id: this.production.pid + "-" + seat.sid,
                    rid: seat.sid,
                    x: seat.x,
                    y: seat.y,
                    date: new Date(),
                    state: "selected",
                    production: this.production
                };

                batch.set(
                    db
                        .collection("shows")
                        .doc(this.show.sid)
                        .collection("productions")
                        .doc(this.production.pid)
                        .collection("reservations")
                        .doc(reservation.rid),
                    reservation
                );

                batch.set(
                    db
                        .collection("users")
                        .doc(this.user.uid)
                        .collection("reservations")
                        .doc(reservationUser.id),
                    reservationUser
                );

                try {
                    await batch.commit();
                } catch (error) {
                    this.showError(
                        "Ocurrió un error efectuando la reserva. Inténtalo más tarde."
                    );
                } finally {
                    seat.changingState = false;
                }
            } else {
                batch.delete(
                    db
                        .collection("shows")
                        .doc(this.show.sid)
                        .collection("productions")
                        .doc(this.production.pid)
                        .collection("reservations")
                        .doc(seat.sid)
                );

                batch.delete(
                    db
                        .collection("users")
                        .doc(this.user.uid)
                        .collection("reservations")
                        .doc(this.production.pid + "-" + seat.sid)
                );
                try {
                    await batch.commit();
                } catch (error) {
                    this.showError(
                        "Ocurrió un error eliminando la reserva. Inténtalo más tarde."
                    );
                } finally {
                    seat.changingState = false;
                }
            }
        },
        async pay() {
            this.showBusy({
                title: "Efectuando la Compra",
                message: "Se está procesando tu pago..."
            });

            let batch = db.batch();
            let date = new Date();
            this.selectedSeats.forEach(seat => {
                batch.update(
                    db
                        .collection("shows")
                        .doc(this.show.sid)
                        .collection("productions")
                        .doc(this.production.pid)
                        .collection("reservations")
                        .doc(seat.sid),
                    { state: "paid", date }
                );

                batch.update(
                    db
                        .collection("users")
                        .doc(this.user.uid)
                        .collection("reservations")
                        .doc(this.production.pid + "-" + seat.sid),
                    { state: "paid", date }
                );
            });
            try {
                await batch.commit();
                this.selectedSeats = [];
                this.totalSelectedSeats = 0;
                this.showSuccess(
                    "Tu compra se ha efectuado con éxito. ¡Disfruta de la Obra!"
                );
            } catch (error) {
                this.showError(
                    "Ocurrió un error efectuando el pago. Inténtalo más tarde."
                );
            } finally {
                this.hideBusy();
            }
        },
        onResize() {
            if (window.innerWidth < 400) {
                this.size = 7;
            } else if (window.innerWidth < 500) {
                this.size = 9;
            } else if (window.innerWidth < 600) {
                this.size = 12;
            } else if (window.innerWidth < 900) {
                this.size = 13;
            } else if (window.innerWidth < 1000) {
                this.size = 19;
            } else if (window.innerWidth < 1200) {
                this.size = 24;
            } else {
                this.size = 27;
            }
        },
        applyCssSeat(state) {
            switch (state) {
                case "available":
                case "selected":
                    return "seat-cursor-pointer elevation-2";
                    break;
                case "busy":
                case "paid":
                    return "seat-cursor-not-allowed elevation-0";
                    break;
            }
        },
        getColorSeat(state, color) {
            switch (state) {
                case "available":
                    return color;
                    break;
                case "selected":
                    return "#C0CA33";
                    break;
                case "busy":
                case "paid":
                    return "#E0E0E0";
                    break;
            }
        },
        getIconSeat(state) {
            switch (state) {
                case "available":
                    return "add";
                    break;
                case "selected":
                    return "check_circle";
                    break;
                case "busy":
                    return "person";
                    break;
                case "paid":
                    return "monetization_on";
                    break;
            }
        }
    }
};
</script>

<style>
.stage {
    color: #444;
    border-color: #9e9e9e;
    border-style: solid;
    border-width: 1px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    margin-bottom: 20px;
}
.seats {
    display: grid;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
    grid-gap: 12px;
}
.seat {
    display: grid;
    padding: 10px;
    border-top-left-radius: 20%;
    border-top-right-radius: 20%;
    border-bottom-left-radius: 40%;
    border-bottom-right-radius: 40%;
}
.seat-cursor-pointer {
    cursor: pointer;
}
.seat-cursor-not-allowed {
    cursor: not-allowed;
}

@media only screen and (max-width: 1200px) {
    .seats {
        grid-gap: 6px;
    }
    .seat {
        padding: 8px;
    }
}

@media only screen and (max-width: 1000px) {
    .seats {
        grid-gap: 8px;
    }
    .seat {
        padding: 6px;
    }
}

@media only screen and (max-width: 900px) {
    .seats {
        grid-gap: 10px;
    }
    .seat {
        padding: 6px;
    }
}

@media only screen and (max-width: 600px) {
    .seats {
        grid-gap: 10px;
    }
    .seat {
        padding: 4px;
    }
}
@media only screen and (max-width: 400px) {
    .seats {
        grid-gap: 4px;
    }
    .seat {
        padding: 3px;
    }
}
</style>
