<template>
    <div id="app" class="main">
        <span>{{title}}</span>
        <div>
            <button
                @click="currentComponent = item.name"
                v-for="(item, index) in menu"
                :key="index"
                class="menu"
            >{{item.description}}</button>
        </div>
        <component :is="currentComponent"></component>
    </div>
</template>

<script>
import Home from "@/views/Home.vue";
import Entrance from "@/views/Entrance.vue";
import Profile from "@/views/user/Profile.vue";
import Login from "@/views/user/Login.vue";
import Register from "@/views/user/Register.vue";

export default {
    components: { Home, Entrance, Profile, Login, Register },
    data() {
        return {
            title: "Entradas",
            currentComponent: "entrance",
            menu: [
                { description: "Inicio", name: "home" },
                { description: "Entradas", name: "entrance" },
                { description: "Perfil", name: "profile" },
                { description: "Inicia sesión", name: "login" },
                { description: "Registro", name: "register" }
            ]
        };
    }
};
</script>

<style>
html {
    font-size: 62.5% !important; /* 10px / 16px = 0.625 */
}
a {
    text-decoration: none;
    color: #0058be;
}
button {
    background-color: #0058be;
    color: white;
    font-size: 2.4rem;
    font-weight: bold;
    border-style: none;
    border-radius: 5px;
    padding: 3px 10px;
    margin: 3px 5px;
    min-width: 35px;
    cursor: pointer;
}
button:focus {
    outline: 0;
}
input[type="text"] {
    border-radius: 5px;
    font-size: 2.4rem;
    width: 100%;
    line-height: 4rem;
    padding: 3px;
}
.main {
    background-color: #0045cb;
    padding: 10px;
    color: white;
    border-radius: 5px;
    width: 400px;
    font-size: 3rem;
    text-align: center;
}
.menu {
    color: white;
    background-color: transparent;
    font-weight: normal;
    font-size: 1.8rem;
    margin: 3px 2px;
}
.section {
    font-size: 2.4rem;
    color: #202020;
    background-color: #e9e9e9;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
}
.attribute {
    margin: 10px;
}
</style>
