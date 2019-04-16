<template>
    <v-app>
        <v-navigation-drawer v-model="menu" app temporary>
            <v-list>
                <v-list-tile @click="selectComponent('home')">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Inicio'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="selectComponent('profile')">
                    <v-list-tile-action>
                        <v-icon>account_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Perfil'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="selectComponent('register')">
                    <v-list-tile-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Registro'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="selectComponent('login')">
                    <v-list-tile-action>
                        <v-icon>arrow_forward</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Ingresar'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="primary" dark app>
            <v-toolbar-side-icon @click="menu = !menu"></v-toolbar-side-icon>
            <v-toolbar-title @click="selectComponent('home')" class="headline logo">
                <span>{{title}}</span>
            </v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-slide-y-transition mode="out-in">
                    <component :is="currentComponent"></component>
                </v-slide-y-transition>
            </v-container>
        </v-content>
        <v-footer color="primary" dark>
            <v-layout justify-center>
                <span>Vue.js & Firebase - @betancourtYeison</span>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>
import Home from "@/views/Home.vue";
import Profile from "@/views/user/Profile.vue";
import Register from "@/views/user/Register.vue";
import Login from "@/views/user/Login.vue";
export default {
    name: "App",
    components: { Home, Profile, Register, Login },
    data() {
        return {
            title: "Súper Ópera",
            currentComponent: "register",
            menu: false
        };
    },
    methods: {
        selectComponent(component) {
            this.currentComponent = component;
            this.menu = false;
        }
    }
};
</script>

<style >
@import url("https://fonts.googleapis.com/css?family=Dancing+Script");
.logo {
    font-family: "Dancing Script", cursive !important;
    cursor: pointer;
}
</style>