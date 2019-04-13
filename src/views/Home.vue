<template>
    <v-layout column justify-center text-xs-center>
        <div class="home-title">
            <h1>Súper Ópera</h1>
        </div>
        <v-layout wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="item in 4" :key="item">
                <v-card class="elevation-5 ma-3">
                    <v-img :src="require('@/assets/el-rey-leon.png')"></v-img>
                </v-card>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<style>
.home-title {
    font-family: "Dancing Script", cursive;
    font-size: 2rem;
    color: #0058be;
    text-shadow: 1px 1px 5px #9b9b9b;
}
</style>
