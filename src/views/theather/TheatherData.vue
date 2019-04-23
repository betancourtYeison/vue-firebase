<template>
    <v-layout>
        <v-btn @click="loadData" color="secondary">Cargar Datos</v-btn>
    </v-layout>
</template>

<script>
import { db } from "@/firebase";
import { mapMutations } from "vuex";
import { generateFormatDate } from "@/utils/formats";
export default {
    methods: {
        ...mapMutations(["showBusy", "showError", "showSuccess", "hideBusy"]),
        async loadData() {
            let batch = db.batch();

            const theather = {
                tid: "theather-super-opera",
                name: "Teatro de la Súper Ópera",
                direction: "Calle 15 # 53-125",
                phone: "259 97 24 - 353 23 41",
                categories: [
                    { category: "A", color: "#AB55B9" },
                    { category: "B", color: "#F75D9A" },
                    { category: "C", color: "#FF8674" },
                    { category: "D", color: "#FFBF5D" }
                ],
                seats: [
                    {
                        category: "B",
                        description: "Zona Izq B - Silla A-1",
                        x: 1,
                        y: 1
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla A-2",
                        x: 2,
                        y: 1
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla A-7",
                        x: 7,
                        y: 1
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla A-8",
                        x: 8,
                        y: 1
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla A-9",
                        x: 9,
                        y: 1
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla A-10",
                        x: 10,
                        y: 1
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla A-11",
                        x: 11,
                        y: 1
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla A-12",
                        x: 12,
                        y: 1
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla A-13",
                        x: 13,
                        y: 1
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla A-14",
                        x: 14,
                        y: 1
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla A-19",
                        x: 19,
                        y: 1
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla A-20",
                        x: 20,
                        y: 1
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla B-1",
                        x: 1,
                        y: 2
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla B-2",
                        x: 2,
                        y: 2
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla B-3",
                        x: 3,
                        y: 2
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla B-8",
                        x: 8,
                        y: 2
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla B-9",
                        x: 9,
                        y: 2
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla B-10",
                        x: 10,
                        y: 2
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla B-11",
                        x: 11,
                        y: 2
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla B-12",
                        x: 12,
                        y: 2
                    },
                    {
                        category: "A",
                        description: "Zona Cen A - Silla B-13",
                        x: 13,
                        y: 2
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla B-18",
                        x: 18,
                        y: 2
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla B-19",
                        x: 19,
                        y: 2
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla B-20",
                        x: 20,
                        y: 2
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla C-1",
                        x: 1,
                        y: 3
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla C-2",
                        x: 2,
                        y: 3
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla C-3",
                        x: 3,
                        y: 3
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla C-4",
                        x: 4,
                        y: 3
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla C-17",
                        x: 17,
                        y: 3
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla C-18",
                        x: 18,
                        y: 3
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla C-19",
                        x: 19,
                        y: 3
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla C-20",
                        x: 20,
                        y: 3
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla D-1",
                        x: 1,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla D-2",
                        x: 2,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla D-3",
                        x: 3,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla D-4",
                        x: 4,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla D-6",
                        x: 6,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla D-7",
                        x: 7,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla D-14",
                        x: 14,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla D-15",
                        x: 15,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla D-17",
                        x: 17,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla D-18",
                        x: 18,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla D-19",
                        x: 19,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla D-20",
                        x: 20,
                        y: 4
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla E-1",
                        x: 1,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla E-2",
                        x: 2,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla E-3",
                        x: 3,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla E-4",
                        x: 4,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla E-6",
                        x: 6,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla E-7",
                        x: 7,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla E-8",
                        x: 8,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla E-9",
                        x: 9,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla E-10",
                        x: 10,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla E-11",
                        x: 11,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla E-12",
                        x: 12,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla E-13",
                        x: 13,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla E-14",
                        x: 14,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla E-15",
                        x: 15,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla E-17",
                        x: 17,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla E-18",
                        x: 18,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla E-19",
                        x: 19,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla E-20",
                        x: 20,
                        y: 5
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla F-3",
                        x: 3,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Izq B - Silla F-4",
                        x: 4,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla F-6",
                        x: 6,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla F-7",
                        x: 7,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla F-8",
                        x: 8,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla F-9",
                        x: 9,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla F-10",
                        x: 10,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla F-11",
                        x: 11,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla F-12",
                        x: 12,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla F-13",
                        x: 13,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla F-14",
                        x: 14,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla F-15",
                        x: 15,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla F-17",
                        x: 17,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Der B - Silla F-18",
                        x: 18,
                        y: 6
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla G-6",
                        x: 6,
                        y: 7
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla G-7",
                        x: 7,
                        y: 7
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla G-8",
                        x: 8,
                        y: 7
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla G-9",
                        x: 9,
                        y: 7
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla G-10",
                        x: 10,
                        y: 7
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla G-11",
                        x: 11,
                        y: 7
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla G-12",
                        x: 12,
                        y: 7
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla G-13",
                        x: 13,
                        y: 7
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla G-14",
                        x: 14,
                        y: 7
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla G-15",
                        x: 15,
                        y: 7
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla H-1",
                        x: 1,
                        y: 8
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla H-2",
                        x: 2,
                        y: 8
                    },
                    {
                        category: "A",
                        description: "Zona Iz1 A - Silla H-4",
                        x: 4,
                        y: 8
                    },
                    {
                        category: "A",
                        description: "Zona Iz1 A - Silla H-5",
                        x: 5,
                        y: 8
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla H-8",
                        x: 8,
                        y: 8
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla H-9",
                        x: 9,
                        y: 8
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla H-10",
                        x: 10,
                        y: 8
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla H-11",
                        x: 11,
                        y: 8
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla H-12",
                        x: 12,
                        y: 8
                    },
                    {
                        category: "B",
                        description: "Zona Cen B - Silla H-13",
                        x: 13,
                        y: 8
                    },
                    {
                        category: "A",
                        description: "Zona De1 A - Silla H-16",
                        x: 16,
                        y: 8
                    },
                    {
                        category: "A",
                        description: "Zona De1 A - Silla H-17",
                        x: 17,
                        y: 8
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla H-19",
                        x: 19,
                        y: 8
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla H-20",
                        x: 20,
                        y: 8
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla I-1",
                        x: 1,
                        y: 9
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla I-2",
                        x: 2,
                        y: 9
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla I-3",
                        x: 3,
                        y: 9
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla I-4",
                        x: 4,
                        y: 9
                    },
                    {
                        category: "A",
                        description: "Zona Iz1 A - Silla I-5",
                        x: 5,
                        y: 9
                    },
                    {
                        category: "A",
                        description: "Zona De1 A - Silla I-16",
                        x: 16,
                        y: 9
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla I-17",
                        x: 17,
                        y: 9
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla I-18",
                        x: 18,
                        y: 9
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla I-19",
                        x: 19,
                        y: 9
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla I-20",
                        x: 20,
                        y: 9
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla J-1",
                        x: 1,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla J-2",
                        x: 2,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla J-3",
                        x: 3,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla J-4",
                        x: 4,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla J-6",
                        x: 6,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla J-7",
                        x: 7,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla J-14",
                        x: 14,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla J-15",
                        x: 15,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla J-17",
                        x: 17,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla J-18",
                        x: 18,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla J-19",
                        x: 19,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla J-20",
                        x: 20,
                        y: 10
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla K-1",
                        x: 1,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla K-2",
                        x: 2,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla K-3",
                        x: 3,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla K-4",
                        x: 4,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla K-6",
                        x: 6,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla K-7",
                        x: 7,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla K-8",
                        x: 8,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla K-9",
                        x: 9,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla K-10",
                        x: 10,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla K-11",
                        x: 11,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla K-12",
                        x: 12,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla K-13",
                        x: 13,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla K-14",
                        x: 14,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla K-15",
                        x: 15,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla K-17",
                        x: 17,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla K-18",
                        x: 18,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla K-19",
                        x: 19,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla K-20",
                        x: 20,
                        y: 11
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla L-3",
                        x: 3,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Izq C - Silla L-4",
                        x: 4,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla L-6",
                        x: 6,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla L-7",
                        x: 7,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla L-8",
                        x: 8,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla L-9",
                        x: 9,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla L-10",
                        x: 10,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla L-11",
                        x: 11,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla L-12",
                        x: 12,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla L-13",
                        x: 13,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla L-14",
                        x: 14,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla L-15",
                        x: 15,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla L-17",
                        x: 17,
                        y: 12
                    },
                    {
                        category: "C",
                        description: "Zona Der C - Silla L-18",
                        x: 18,
                        y: 12
                    },
                    {
                        category: "A",
                        description: "Zona Iz2 A - Silla M-2",
                        x: 2,
                        y: 13
                    },
                    {
                        category: "A",
                        description: "Zona Iz2 A - Silla M-3",
                        x: 3,
                        y: 13
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla M-6",
                        x: 6,
                        y: 13
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla M-7",
                        x: 7,
                        y: 13
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla M-8",
                        x: 8,
                        y: 13
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla M-9",
                        x: 9,
                        y: 13
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla M-10",
                        x: 10,
                        y: 13
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla M-11",
                        x: 11,
                        y: 13
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla M-12",
                        x: 12,
                        y: 13
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla M-13",
                        x: 13,
                        y: 13
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla M-14",
                        x: 14,
                        y: 13
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla M-15",
                        x: 15,
                        y: 13
                    },
                    {
                        category: "A",
                        description: "Zona De2 A - Silla M-18",
                        x: 18,
                        y: 13
                    },
                    {
                        category: "A",
                        description: "Zona De2 A - Silla M-19",
                        x: 19,
                        y: 13
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla N-1",
                        x: 1,
                        y: 14
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla N-2",
                        x: 2,
                        y: 14
                    },
                    {
                        category: "A",
                        description: "Zona Iz2 A - Silla N-3",
                        x: 3,
                        y: 14
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla N-8",
                        x: 8,
                        y: 14
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla N-9",
                        x: 9,
                        y: 14
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla N-10",
                        x: 10,
                        y: 14
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla N-11",
                        x: 11,
                        y: 14
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla N-12",
                        x: 12,
                        y: 14
                    },
                    {
                        category: "C",
                        description: "Zona Cen C - Silla N-13",
                        x: 13,
                        y: 14
                    },
                    {
                        category: "A",
                        description: "Zona De2 A - Silla N-18",
                        x: 18,
                        y: 14
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla N-19",
                        x: 19,
                        y: 14
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla N-20",
                        x: 20,
                        y: 14
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla O-1",
                        x: 1,
                        y: 15
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla O-2",
                        x: 2,
                        y: 15
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla O-3",
                        x: 3,
                        y: 15
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla O-4",
                        x: 4,
                        y: 15
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla O-17",
                        x: 17,
                        y: 15
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla O-18",
                        x: 18,
                        y: 15
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla O-19",
                        x: 19,
                        y: 15
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla O-20",
                        x: 20,
                        y: 15
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla P-1",
                        x: 1,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla P-2",
                        x: 2,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla P-3",
                        x: 3,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla P-4",
                        x: 4,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla P-6",
                        x: 6,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla P-7",
                        x: 7,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla P-14",
                        x: 14,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla P-15",
                        x: 15,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla P-17",
                        x: 17,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla P-18",
                        x: 18,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla P-19",
                        x: 19,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla P-20",
                        x: 20,
                        y: 16
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla Q-1",
                        x: 1,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla Q-2",
                        x: 2,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla Q-3",
                        x: 3,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla Q-4",
                        x: 4,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla Q-6",
                        x: 6,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla Q-7",
                        x: 7,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla Q-8",
                        x: 8,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla Q-9",
                        x: 9,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla Q-10",
                        x: 10,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla Q-11",
                        x: 11,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla Q-12",
                        x: 12,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla Q-13",
                        x: 13,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla Q-14",
                        x: 14,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla Q-15",
                        x: 15,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla Q-17",
                        x: 17,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla Q-18",
                        x: 18,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla Q-19",
                        x: 19,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla Q-20",
                        x: 20,
                        y: 17
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla R-2",
                        x: 2,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla R-3",
                        x: 3,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Izq D - Silla R-4",
                        x: 4,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla R-6",
                        x: 6,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla R-7",
                        x: 7,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla R-8",
                        x: 8,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla R-9",
                        x: 9,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla R-10",
                        x: 10,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla R-11",
                        x: 11,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla R-12",
                        x: 12,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla R-13",
                        x: 13,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla R-14",
                        x: 14,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla R-15",
                        x: 15,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla R-17",
                        x: 17,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla R-18",
                        x: 18,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Der D - Silla R-19",
                        x: 19,
                        y: 18
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla S-6",
                        x: 6,
                        y: 19
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla S-7",
                        x: 7,
                        y: 19
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla S-8",
                        x: 8,
                        y: 19
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla S-9",
                        x: 9,
                        y: 19
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla S-10",
                        x: 10,
                        y: 19
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla S-11",
                        x: 11,
                        y: 19
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla S-12",
                        x: 12,
                        y: 19
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla S-13",
                        x: 13,
                        y: 19
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla S-14",
                        x: 14,
                        y: 19
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla S-15",
                        x: 15,
                        y: 19
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla T-8",
                        x: 8,
                        y: 20
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla T-9",
                        x: 9,
                        y: 20
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla T-10",
                        x: 10,
                        y: 20
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla T-11",
                        x: 11,
                        y: 20
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla T-12",
                        x: 12,
                        y: 20
                    },
                    {
                        category: "D",
                        description: "Zona Cen D - Silla T-13",
                        x: 13,
                        y: 20
                    }
                ]
            };

            const showHamilton = {
                sid: "hamilton",
                title: "Hamilton",
                picture: "hamilton.png",
                description:
                    'Hamilton: An American Musical es un musical sobre la vida de Alexander Hamilton, uno de los padres fundadores de los Estados Unidos; con letras, música y guion de Lin-Manuel Miranda.1​ El espectáculo, inspirado en la biografía de 2004 "Alexander Hamilton" del historiador Ron Chernow, ha logrado un gran éxito en crítica y taquilla.\n\nEl musical debutó en febrero del 2015 en el Teatro Público de Nueva York, hasta agosto del mismo año; cuando fue trasladado al teatro Richard Rodgers del circuito de Broadway, donde logró gran éxito en críticas y taquilla.\n\nEntre sus principales reconocimientos están haber ganado once premios Tony, un Grammy a mejor musical, un Pulitzer a mejor drama y siete premios Drama Desk.',
                categories: [
                    { category: "A", price: 850 },
                    { category: "B", price: 600 },
                    { category: "C", price: 500 },
                    { category: "D", price: 350 }
                ],
                dates: [],
                active: true
            };

            const showElReyLeon = {
                sid: "el-rey-leon",
                title: "El Rey León",
                picture: "el-rey-leon.png",
                description:
                    "El rey león es un musical basado en la película homónima de Disney de 1994, con libreto de Roger Allers e Irene Mecchi, canciones de Elton John y Tim Rice, y música adicional de Lebo M, Mark Mancina, Jay Rifkin, Julie Taymor y Hans Zimmer. Dirigido por Julie Taymor, el espectáculo está producido por Disney Theatrical y se caracteriza por el empleo de máscaras de animales y marionetas de gran tamaño para representar a los diferentes personajes.",
                categories: [
                    { category: "A", price: 400 },
                    { category: "B", price: 250 },
                    { category: "C", price: 200 },
                    { category: "D", price: 150 }
                ],
                dates: [],
                active: true
            };

            const showFrozen = {
                sid: "frozen",
                title: "Frozen",
                picture: "frozen.png",
                description:
                    "Frozen is a musical with music and lyrics by Kristen Anderson-Lopez and Robert Lopez and book by Jennifer Lee based on the 2013 film of the same name. Produced by Disney Theatrical Productions, it had a tryout at the Buell Theatre in Denver, Colorado in August 2017 and premiered on Broadway in March 2018 at the St. James Theatre.",
                categories: [
                    { category: "A", price: 350 },
                    { category: "B", price: 280 },
                    { category: "C", price: 190 },
                    { category: "D", price: 110 }
                ],
                dates: [],
                active: true
            };

            const showAnastasia = {
                sid: "anastasia",
                title: "Anastasia",
                picture: "anastasia.png",
                description:
                    "Anastasia es un musical basado en la película de animación homónima de 1997, con libreto de Terrence McNally, música de Stephen Flaherty y letras de Lynn Ahrens. Su trama central gira en torno a la leyenda de la gran duquesa Anastasia Nikoláyevna de Rusia, quien supuestamente escapó de la ejecución de su familia a manos del ejército bolchevique.",
                categories: [
                    { category: "A", price: 350 },
                    { category: "B", price: 240 },
                    { category: "C", price: 130 },
                    { category: "D", price: 90 }
                ],
                dates: [],
                active: true
            };

            let showDate = new Date();

            showDate.setHours(0, 0, 0, 0);

            showDate.setDate(showDate.getDate() - 3);

            for (let i = 1; i <= 10; i++) {
                let showDate01 = new Date(
                    showDate.getFullYear(),
                    showDate.getMonth(),
                    showDate.getDate(),
                    15,
                    15
                );
                let showDate02 = new Date(
                    showDate.getFullYear(),
                    showDate.getMonth(),
                    showDate.getDate(),
                    10,
                    0
                );
                let showDate03 = new Date(
                    showDate.getFullYear(),
                    showDate.getMonth(),
                    showDate.getDate(),
                    21,
                    30
                );
                let showDate04 = new Date(
                    showDate.getFullYear(),
                    showDate.getMonth(),
                    showDate.getDate(),
                    17,
                    0
                );
                let showDate05 = new Date(
                    showDate.getFullYear(),
                    showDate.getMonth(),
                    showDate.getDate(),
                    18,
                    0
                );

                showHamilton.dates.push(showDate01);
                showElReyLeon.dates.push(showDate02);
                showElReyLeon.dates.push(showDate03);
                showFrozen.dates.push(showDate04);
                showAnastasia.dates.push(showDate05);

                let production01 = {
                    pid: `${showHamilton.sid}-${
                        theather.tid
                    }-${generateFormatDate(showDate01, "-", true)}`,
                    date: showDate01,
                    theather: { tid: theather.tid, name: theather.name },
                    show: { sid: showHamilton.sid, title: showHamilton.title }
                };

                let production02 = {
                    pid: `${showElReyLeon.sid}-${
                        theather.tid
                    }-${generateFormatDate(showDate02, "-", true)}`,
                    date: showDate02,
                    theather: { tid: theather.tid, name: theather.name },
                    show: {
                        sid: showElReyLeon.sid,
                        title: showElReyLeon.title
                    }
                };

                let production03 = {
                    pid: `${showElReyLeon.sid}-${
                        theather.tid
                    }-${generateFormatDate(showDate03, "-", true)}`,
                    date: showDate03,
                    theather: { tid: theather.tid, name: theather.name },
                    show: {
                        sid: showElReyLeon.sid,
                        title: showElReyLeon.title
                    }
                };

                let production04 = {
                    pid: `${showFrozen.sid}-${
                        theather.tid
                    }-${generateFormatDate(showDate04, "-", true)}`,
                    date: showDate04,
                    theather: { tid: theather.tid, name: theather.name },
                    show: { sid: showFrozen.sid, title: showFrozen.title }
                };

                let production05 = {
                    pid: `${showAnastasia.sid}-${
                        theather.tid
                    }-${generateFormatDate(showDate05, "-", true)}`,
                    date: showDate05,
                    theather: { tid: theather.tid, name: theather.name },
                    show: {
                        sid: showAnastasia.sid,
                        title: showAnastasia.title
                    }
                };

                batch.set(
                    db
                        .collection("shows")
                        .doc(showHamilton.sid)
                        .collection("productions")
                        .doc(production01.pid),
                    production01
                );
                batch.set(
                    db
                        .collection("shows")
                        .doc(showElReyLeon.sid)
                        .collection("productions")
                        .doc(production02.pid),
                    production02
                );
                batch.set(
                    db
                        .collection("shows")
                        .doc(showElReyLeon.sid)
                        .collection("productions")
                        .doc(production03.pid),
                    production03
                );
                batch.set(
                    db
                        .collection("shows")
                        .doc(showFrozen.sid)
                        .collection("productions")
                        .doc(production04.pid),
                    production04
                );
                batch.set(
                    db
                        .collection("shows")
                        .doc(showAnastasia.sid)
                        .collection("productions")
                        .doc(production05.pid),
                    production05
                );

                showDate.setDate(showDate.getDate() + 1);
            }

            batch.set(db.collection("theathers").doc(theather.tid), theather);

            batch.set(
                db.collection("shows").doc(showHamilton.sid),
                showHamilton
            );
            batch.set(
                db.collection("shows").doc(showElReyLeon.sid),
                showElReyLeon
            );
            batch.set(db.collection("shows").doc(showFrozen.sid), showFrozen);
            batch.set(
                db.collection("shows").doc(showAnastasia.sid),
                showAnastasia
            );

            this.showBusy({
                title: "Cargando Datos",
                mensaje: "Cargando datos..."
            });

            try {
                batch.commit();
                this.showSuccess("Se cargó la información exitosamente");
            } catch (error) {
                this.showError("Ocurrió un error cargando la información");
            } finally {
                this.hideBusy();
            }
        }
    }
};
</script>