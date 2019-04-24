import Vue from 'vue';
import Router from 'vue-router';
import { auth } from "@/firebase";


import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';

import Login from './views/user/Login.vue';
import VerificationEmail from './views/user/VerificationEmail.vue';
import ActionsEmail from './views/user/ActionsEmail.vue';
import Register from './views/user/Register.vue';
import Profile from './views/user/Profile.vue';
import ProfilePicture from './views/user/ProfilePicture.vue';

import TheatherData from './views/theather/TheatherData.vue';
import Show from './views/theather/Show.vue';
import Production from './views/theather/Production.vue';

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
            path: '/session/verification-email',
            name: 'verification-email',
            component: VerificationEmail
        },
        {
            path: '/session/actions-email',
            name: 'actions-email',
            component: ActionsEmail
        },
        {
            path: '/session/register',
            name: 'register',
            component: Register
        },
        {
            path: '/user/:username',
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
            path: '/session/profile-picture',
            name: 'profile-picture',
            component: ProfilePicture,
            meta: {
                authenticated: true
            }
        },
        {
            path: '/admin/theather-data',
            name: 'theather-data',
            component: TheatherData
        },
        {
            path: '/shows/:sid',
            name: 'show',
            component: Show
        },
        {
            path: '/:sid/:tid/:date',
            name: 'production',
            component: Production,
            meta: {
                authenticated: true
            }
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
    let { currentUser } = auth
    if(to.matched.some(record => record.meta.authenticated)){
        if (currentUser) {
            if(currentUser.providerData[0].providerId === 'password' && !currentUser.emailVerified){
                next({ name: "verification-email" });
            }else{
                next();        
            }
        } else {
            next({ name: "login" });
        }
    }else{
        next();
    }
})

export default router;