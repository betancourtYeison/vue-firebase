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
        signout({ commit }){
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
