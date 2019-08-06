import Vue from 'vue';
import Vuex from 'vuex';

import * as Interface from '@/types';

Vue.use(Vuex);

interface IState {
    user: Interface.IUser,
}

export default new Vuex.Store({
    state: {
        user: {
            id: null,
            name: '',
            imageURL: '',
        },
    },
    mutations: {
        SET_USER: (state: IState, payload: any) => {
            const user = {
                id: payload.id,
                name: payload.name,
                imageURL: payload.imageURL,
            };
            state.user = user;
        },
    },
    actions: {
        SET_USER: ({ commit }: any, payload: any) => {
            commit('SET_USER', payload);
        },
    },
    getters: {
        USER: state => state.user,
    },
});
