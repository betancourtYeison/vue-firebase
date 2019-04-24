import { auth, db, storage } from '@/firebase';
import router from '@/router';

const dimensions = [512, 256, 128, 64, 32];

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

                    let picture = require("@/assets/picture.png");
                    user.picture32 = picture;
                    user.picture64 = picture;
                    user.picture128 = picture;
                    user.picture256 = picture;
                    user.picture512 = picture;
                    
                    if (user.picture) {
                        let ref = storage.ref();
                        let uid = user.uid;
                        let pid = user.picture;
                        let baseURL = `users/${uid}/profile-picture/${pid}-`;
                        dimensions.forEach(dimension => {
                            ref.child(`${baseURL}${dimension}x${dimension}.jpg`)
                            .getDownloadURL()
                            .then(url => {
                                commit("updateData", {
                                    ["picture"+dimension]: url
                                });
                            });
                        });
                    }
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
        },
        updatePicture({ state, commit }, pictureId){
            commit("updateData", {
                picture: pictureId
            });
            let ref = storage.ref();
            let uid = state.user.uid;
            let baseURL = `users/${uid}/profile-picture/${pictureId}-`;
            dimensions.forEach(dimension => {
                ref.child(`${baseURL}${dimension}x${dimension}.jpg`)
                .getDownloadURL()
                .then(url => {
                    commit("updateData", {
                        ["picture"+dimension]: url
                    });
                });
            });
        }
    },
    getters: {
        greeting(state){
            if(!state.user){
                return ''
            }

            let vowel = state.user.gender && state.user.gender === "F" ? "a" : "o";
            return `¡Bienvenid${vowel}! ${state.user.name}`;
        },
    }
}
