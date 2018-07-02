import Vue from 'vue';
import Vuex from 'vuex';
import MRPTLIB from 'mrpt-web-js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    displayOpenRawlogForm: true,
    ws: new MRPTLIB.WS()
  },
  getters: {
    getState: state => {
      return state.displayOpenRawlogForm;
    },
    getWS: state => {
      return state.ws;
    }
  },
  mutations: {
    WRAP: (state, $socket) => {
      state.ws.wrap($socket);
    }
  },
  actions: {

  },
});
