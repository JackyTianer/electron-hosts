import Vue from 'vue';
import Vuex from 'vuex';

import { createPersistedState, createSharedMutations } from 'vuex-electron';

import modules from './modules';
import action from './action';
import state from './state';
import mutation from './mutation';

Vue.use(Vuex);

export default new Vuex.Store({
    modules,
    action,
    state,
    mutation,
    plugins: [
        createPersistedState(),
        createSharedMutations()
    ],
    strict: process.env.NODE_ENV !== 'production'
});
