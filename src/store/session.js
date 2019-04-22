import { auth } from '@/firebase'

export default {
    namespaced: true,
    state: {
        user: null,
    },
    mutations: {
        updateUser(state, payload){
            state.user = payload;
        },
    },
    actions: {
        signIn({ commit }, uid){
            let user = {
                uid,
                username: "Newton",
                name: "Isaac",
                lastName: "Newton",
                gender: "M",
                description: "Descripción",
                biography: "https://es.wikipedia.org/wiki/Isaac_Newton",
                picture:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg/220px-Sir_Isaac_Newton_%281643-1727%29.jpg"
            };
            commit("updateUser", user)
        },
        signOut({ commit }){
            auth.signOut()
            commit("updateUser", null)
        }
    },
    getters: {
        greeting(state){
            if(!state.user){
                return ''
            }

            let vowel = state.user.gender && state.user.gender === "F" ? "a" : "o";
            return `¡Bienvenid${vowel}! ${state.user.name}`;
        }
    }
}
