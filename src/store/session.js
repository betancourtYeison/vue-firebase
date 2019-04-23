import { auth, db } from '@/firebase'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        user: null,
    },
    mutations: {
        updateUser(state, payload){
            state.user = payload;
        },
        updateData(state, payload){
            if(!state.user){
                return
            }else{
                state.user = {...state.user, ...payload}
            }
        },
    },
    actions: {
        async signIn({ commit, getters }, uid){
            try {
               let doc = await db.collection('users')
                                .doc(uid)
                                .get();
                if(doc.exists){
                    let user = doc.data();
                    commit('updateUser', user);
                    switch (router.currentRoute.name) {
                        case 'login':
                            commit('showSuccess', getters.greeting, { root: true });
                            router.push({ name: "home" });
                            break;
                        case 'actions-email':
                            commit('showSuccess', `${
                                getters.greeting
                            }, tu contraseña ha sido cambiada existosamente.`, { root: true });
                            router.push({ name: "home" });
                            break;
                        default:
                            break;
                    }
                }else{
                    router.push({ name: 'register' });
                }
            } catch (error) {
                commit('showError', 'Ocurrió un error consultando tu información', { root: true });
            }
        },
        signOut({ commit }){
            auth.signOut();
            commit("updateUser", null);
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
