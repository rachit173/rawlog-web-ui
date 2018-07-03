import Vue from 'vue';
import Vuex from 'vuex';
import MRPTLIB from 'mrpt-web-js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ws: new MRPTLIB.WS(),
    rawlogLoaded: false
  },
  getters: {
    getRawlogState: state => {
      return state.rawlogLoaded;
    },
    getWS: state => {
      return state.ws;
    }
  },
  mutations: {
    WRAP: (state, $socket) => {
      state.ws.wrap($socket);
    },
    SET_RAWLOG_LOADED: (state, foo) => {
      state.rawlogLoaded = foo;
    }
  },
  actions: {

  },
});
