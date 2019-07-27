import Vue from 'vue';
import Router from 'vue-router';
import * as firebase from 'firebase/app';

import Main from './views/Main.vue';
import Login from './views/Login.vue';

import store from '@/store';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Main,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const user = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    firebase.auth().onAuthStateChanged((fuser) => {
        if (fuser) {
            console.log(fuser)
            store.dispatch('SET_USER', {
                id: fuser.uid,
                name: fuser.displayName,
                imageURL: fuser.photoURL,
            });
        }

        if (!fuser && requiresAuth) {
            next('/login');
        } else {
            next();
        }
    });
});

export default router;
