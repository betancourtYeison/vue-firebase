<template>
    <div id="tickets">
        <div class="section">
            <transition name="scale-y" mode="out-in">
                <div :key="1" v-if="!paid && tickets === 0" class="message information">
                    <span>Selecciona al menos un boleto</span>
                </div>
                <div :key="2" v-else-if="!paid && tickets > 0" class="message advise">
                    <span>Recuerda completar tu compra</span>
                </div>
                <div :key="3" v-else class="message welcome">
                    <span>¡Bienvendido!</span>
                </div>
            </transition>
            <div class="attribute">
                <span>Asientos</span>
            </div>
            <div class="attribute">
                <transition-group name="top-seats">
                    <button
                        @click="selectSeat(seat, index)"
                        v-for="(seat, index) in seats"
                        :key="seat"
                    >{{ seat }}</button>
                </transition-group>
            </div>
        </div>
        <div class="section">
            <div class="attribute">
                <span>Boletos</span>
            </div>
            <div class="attribute">
                <span class="tickets">{{tickets}}</span>
            </div>
            <div v-show="tickets > 0 " class="attribute">
                <span>Total: $ {{total}}</span>
            </div>
            <div class="attribute">
                <transition-group name="bottom-seats">
                    <button
                        class="selectedSeats"
                        @click="removeSeat(selectedSeat, index)"
                        v-for="(selectedSeat, index) in selectedSeats"
                        :key="selectedSeat"
                    >{{ selectedSeat }}</button>
                </transition-group>
            </div>
            <div v-if="!paid && tickets > 0" class="attribute">
                <button @click="paid = true">Pagar</button>
            </div>
            <div v-if="paid" class="attribute">
                <button @click="reset">Reiniciar</button>
            </div>
            <div class="attribute">
                <span class="commission" :class="commissionClass">$ {{commission}}</span>
            </div>
        </div>
        <transition name="fade">
            <receipt v-if="paid">
                <div slot="show">
                    <span>El Rey León</span>
                </div>
                <div slot="schedules">
                    <span>2019-05-24 22:10</span>
                </div>
                <div slot="seats">
                    <span
                        class="selectedSeat"
                        v-for="(selectedSeat, index) in selectedSeats"
                        :key="index"
                    >{{selectedSeat}}</span>
                </div>
                <div slot="total">
                    <span>$ {{total}}</span>
                </div>
            </receipt>
        </transition>
    </div>
</template>

<script>
import Receipt from "./Receipt";
export default {
    components: { Receipt },
    data() {
        return {
            commission: 0,
            commissionClass: "neutral",
            paid: false,
            seats: ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5"],
            selectedSeats: []
        };
    },
    computed: {
        tickets() {
            return this.selectedSeats.length;
        },
        total() {
            return this.tickets * 100;
        }
    },
    methods: {
        reset() {
            this.commission = 0;
            this.paid = false;
            this.seats.push(...this.selectedSeats);
            this.seats.sort();
            this.selectedSeats = [];
        },
        selectSeat(seat, index) {
            if (this.paid) return;
            this.seats.splice(index, 1);
            this.selectedSeats.push(seat);
            this.selectedSeats.sort();
        },
        removeSeat(selectedSeat, index) {
            if (this.paid) return;
            this.selectedSeats.splice(index, 1);
            this.seats.push(selectedSeat);
            this.seats.sort();
        }
    },
    watch: {
        tickets(newValue, oldValue) {
            if (newValue > oldValue) {
                this.commission += 10;
            } else {
                this.commission -= 15;
            }

            if (this.commission < 0) {
                this.commission = 0;
            }
        },
        commission(newValue, oldValue) {
            if (newValue > oldValue) {
                this.commissionClass = "increment";
            } else {
                this.commissionClass = "decrement";
            }

            if (this.commission === 0) {
                this.commissionClass = "neutral";
            }
        }
    }
};
</script>

<style>
.tickets {
    font-size: 4rem;
    font-weight: bold;
}
.commission {
    font-size: 3.2rem;
}
.neutral {
    color: #2a2a2a;
}
.increment {
    color: #356409;
}
.decrement {
    color: #a81717;
}
.message {
    border-radius: 5px;
    border-width: 4px;
    border-style: dashed;
    padding: 10px;
    font-size: 2.1rem;
    font-weight: bold;
}
.information {
    border-color: blue;
}
.advise {
    border-color: orange;
}
.welcome {
    border-color: green;
}
.selectedSeats {
    background-color: #80d80e;
}
.scale-y-enter {
    opacity: 0;
}
.scale-y-enter-active {
    transition: opacity 0.3s ease-out;
    animation: message-in 0.3s ease-out forwards;
}
.scale-y-leave-active {
    transition: opacity 0.2s ease-out;
    animation: message-out 0.2s ease-out forwards;
    opacity: 0;
}
@keyframes message-in {
    0% {
        transform: scaleY(0);
    }
    70% {
        transform: scaleY(1.2);
    }
    90% {
        transform: scaleY(0.9);
    }
    100% {
        transform: scaleY(1);
    }
}
@keyframes message-out {
    from {
        transform: scaleY(1);
    }
    to {
        transform: scaleY(0);
    }
}

.top-seats-enter {
    opacity: 0;
}
.top-seats-enter-active {
    transition: opacity 0.3s ease-out;
    animation: top-seats-in 0.3s ease-out forwards;
}
.top-seats-leave-active {
    transition: opacity 0.2s ease-out;
    animation: top-seats-out 0.2s ease-out forwards;
    opacity: 0;
}
@keyframes top-seats-in {
    0% {
        transform: translateY(30px);
    }
    70% {
        transform: translateY(-10px);
    }
    90% {
        transform: translateY(5px);
    }
    100% {
        transform: translateY(0);
    }
}
@keyframes top-seats-out {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(30px);
    }
}

.bottom-seats-enter {
    opacity: 0;
}
.bottom-seats-enter-active {
    transition: opacity 0.3s ease-out;
    animation: bottom-seats-in 0.3s ease-out forwards;
}
.bottom-seats-leave-active {
    transition: opacity 0.2s ease-out;
    animation: bottom-seats-out 0.2s ease-out forwards;
    opacity: 0;
}
@keyframes bottom-seats-in {
    0% {
        transform: translateY(-30px);
    }
    70% {
        transform: translateY(10px);
    }
    90% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0);
    }
}
@keyframes bottom-seats-out {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-30px);
    }
}
.selectedSeat {
    font-size: 1.8rem;
    padding: 3px;
    margin: 3px;
    border-style: solid;
    border-color: black;
    border-width: 1px;
}
</style>
