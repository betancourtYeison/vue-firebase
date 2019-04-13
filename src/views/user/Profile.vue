<template>
    <v-layout text-xs-center align-start justify-center>
        <v-card class="elevation-6">
            <v-card-text>
                <div class="ma-2">Nombres y Apellidos</div>
                <img class="ma-2 picture" :src="require('@/assets/profile.png')" alt="profile">
                <div class="ma-2">Descripción</div>
                <a class="ma-2 link" href>Biografía</a>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

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
