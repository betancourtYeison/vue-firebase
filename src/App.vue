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
                <v-list-tile v-if="user" @click="selectComponent('profile')">
                    <v-list-tile-action>
                        <v-icon>account_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Perfil'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="!user" @click="selectComponent('login')">
                    <v-list-tile-action>
                        <v-icon>arrow_forward</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Ingresar'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="user" @click="handleSignout">
                    <v-list-tile-action>
                        <v-icon>arrow_back</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Salir'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="primary" dark app>
            <v-toolbar-side-icon @click="menu = !menu"></v-toolbar-side-icon>
            <v-toolbar-title @click="selectComponent('home')" class="headline logo">
                <span>{{title}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span v-if="user">{{user.name}}</span>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-slide-y-transition mode="out-in">
                    <component :is="currentComponent"></component>
                </v-slide-y-transition>
            </v-container>
        </v-content>
        <v-snackbar
            v-model="notification.visible"
            :color="notification.color"
            top
            :timeout="6000"
            dark
        >
            {{notification.message}}
            <v-btn flat color="white" @click.native="hideNotification">Cerrrar</v-btn>
        </v-snackbar>
        <v-dialog v-model="busy.visible" persistent max-width="400px">
            <v-card>
                <v-toolbar color="primary" dark card>
                    <v-toolbar-title>{{busy.title}}</v-toolbar-title>
                </v-toolbar>
                <v-card-text class="subheading">{{busy.message}}</v-card-text>
                <v-card-text>
                    <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
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
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: "App",
    components: { Home, Profile, Register, Login },
    data() {
        return {
            title: "Súper Ópera",
            currentComponent: "home",
            menu: false
        };
    },
    computed: {
        ...mapState(["notification", "busy"]),
        ...mapState("session", ["user"])
    },
    methods: {
        ...mapMutations(["hideNotification"]),
        ...mapActions("session", ["signout"]),
        selectComponent(component) {
            this.currentComponent = component;
            this.menu = false;
        },
        handleSignout() {
            this.currentComponent = "home";
            this.signout();
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