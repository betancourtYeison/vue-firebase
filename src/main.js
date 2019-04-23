import Vue from 'vue'
import store from './store'
import router from './router'
import Vuelidate from 'vuelidate'
import { auth } from './firebase'
import './plugins/vuetify'
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(Vuelidate)

auth.onAuthStateChanged(user => {
    if(user){
        store.dispatch('session/signIn', user.uid)
        .then(() => {
            initVue();
        })
    }else{
        store.dispatch('session/signOut')
        .then(() => {
            initVue();
        })
    }
})

let vue = null

function initVue(){
    if(!vue){
        vue = new Vue({
            store,
            router,
            render: h => h(App)
        }).$mount('#app')
    }
}
