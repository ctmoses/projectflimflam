import Vue from 'vue';
import * as firebase from 'firebase/app';
import {
    MdButton, MdCard, MdField, MdRipple, MdSteppers,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import firebaseConfig from '@/firebase';
import Modal from '@/plugins/Modal/vueModal';


Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdRipple);
Vue.use(MdSteppers);


Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig);
Vue.use(Modal);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
