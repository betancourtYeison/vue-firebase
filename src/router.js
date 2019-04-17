import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import Login from './views/user/Login.vue'
import Register from './views/user/Register.vue'
import Profile from './views/user/Profile.vue'
import Show from './views/theather/Show.vue'
import Production from './views/theather/Production.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/session/login',
            name: 'login',
            component: Login
        },
        {
            path: '/session/register',
            name: 'register',
            component: Register
        },
        {
            path: '/user/profile',
            name: 'profile',
            component: Profile,
            meta: {
                authenticated: true
            }
            // beforeEnter: (to, from, next) => {
            //     if (store.state.session.user) {
            //         next();
            //     } else {
            //         next({ name: "login" });
            //     }
            // }
        },
        {
            path: '/shows/:sid',
            name: 'show',
            component: Show
        },
        {
            path: '/:sid/:tid/:date',
            name: 'production',
            component: Production
        },
        {
            path: '/404',
            name: '404',
            component: NotFound
        },
        {
            path: '*',
            component: NotFound
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.authenticated)){
        if (store.state.session.user) {
            next();
        } else {
            next({ name: "login" });
        }
    }else{
        next();
    }
})

export default router;