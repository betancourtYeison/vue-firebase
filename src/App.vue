<template>
    <v-app>
        <v-navigation-drawer v-model="menu" app temporary>
            <v-list>
                <v-list-tile :to="{ path: '/' }">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Inicio'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                    v-if="user"
                    :to="{ name: 'profile', params: {username: user.username} }"
                >
                    <v-list-tile-action>
                        <v-icon>account_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Perfil'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="!user" :to="{ name: 'login' }">
                    <v-list-tile-action>
                        <v-icon>arrow_forward</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Ingresar'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="user" @click="handlesignOut">
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
            <v-toolbar-title @click="$router.push({ name: 'home' })" class="headline logo">
                <span>{{title}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link
                v-if="user"
                class="name"
                :to="{ name: 'profile', params: {username: user.username} }"
            >
                <span>{{user.name}}</span>
            </router-link>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-slide-y-transition mode="out-in">
                    <router-view></router-view>
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
            menu: false
        };
    },
    computed: {
        ...mapState(["notification", "busy"]),
        ...mapState("session", ["user"])
    },
    methods: {
        ...mapMutations(["hideNotification"]),
        ...mapActions("session", ["signOut"]),
        handlesignOut() {
            this.signOut();
            this.menu = false;
            this.$router.push({ name: "login" });
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
.name {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
}
</style>