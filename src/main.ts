import Vue from 'vue';
import * as firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import firebaseConfig from '@/firebase';


Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
