import Vue from 'vue';
import * as firebase from 'firebase/app';
import {
    MdField, MdMenu, MdList, MdLayout, MdRadio,
    MdButton,
} from 'vue-material/dist/components';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import firebaseConfig from '@/firebase';

Vue.use(MdField);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdLayout);
Vue.use(MdRadio);
Vue.use(MdButton);

Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
