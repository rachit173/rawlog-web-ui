import Vue from 'vue';
import Vuex from 'vuex';
import MRPTLIB from 'mrpt-web-js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ws: new MRPTLIB.WS(),
    rawlogLoaded: false,
    /**
     * Store the tree structure of rawlog
     * data
     */
    tree: [],
    /** store variables to maintain state
     * of the TextInfo and VizInfo
     * components
     */
    currentLogIndex: Number,
    currentLogText: "",
    currentLogVizData: {},
    currentLogVizTab: 0
  },
  getters: {
    getRawlogState: state => {
      return state.rawlogLoaded;
    },
    getWS: state => {
      return state.ws;
    },
    getTree: state => {
      return state.tree;
    }
  },
  mutations: {
    WRAP: (state, $socket) => {
      state.ws.wrap($socket);
    },
    SET_RAWLOG_LOADED: (state, foo) => {
      state.rawlogLoaded = foo;
    },
    SET_TREE_DATA: (state, tree) => {
      state.tree = tree;
    },
    SET_LOG_INDEX: (state, index) =>{
      state.currentLogIndex = index;
    },
    SET_LOG_TEXT : (state, text) => {
      state.currentLogText = text;
    },
    SET_LOG_VIZ_DATA : (state, data) => {
      state.currentLogVizData = data;
    },
    SET_LOG_VIZ_TAB : (state, tab) => {
      state.currentLogVizTab = tab;
    }
  },
  actions: {
    LOAD_MAIN_DATA: (context, index) => {
      const rawlogState = context.getters.getRawlogState;
      if (!rawlogState) {
        console.error("The rawlog has not been loaded.");
        console.error("Yet a log is being requested. Load a rawlog.");
      }
      const ws = context.getters.getWS;
      const logLoadClient = new MRPTLIB.Service({
        ws: ws,
        name: 'GetRawlogDataFromIndex'
      });
      const request = new MRPTLIB.ServiceRequest({
        index: index
      });
      logLoadClient.callService(request, (result) => {
        if (result.err)
        {
          console.error(result.err);
        }
        console.log(result);
        context.commit('SET_LOG_INDEX', Number.parseInt(index));
        context.commit('SET_LOG_TEXT', result.text);
        context.commit('SET_LOG_VIZ_DATA', result.vizdata || {});
        context.commit('SET_LOG_VIZ_TAB', Number.parseInt(result.cs.tab) || 0)
      });
    },
    UPLOAD_MOTION_MODEL: (context, sendData) => {
      const rawlogState = context.getters.getRawlogState;
      if (!rawlogState) {
        console.error("The rawlog has not been loaded yet");
        console.error("Yet a log is being requested. Load a rawlog.");
      }
      const ws = context.getters.getWS;
      const modelUploadClient = new MRPTLIB.Service({
        ws: ws,
        name: 'LoadMotionModel'
      });
      const request = new MRPTLIB.ServiceRequest({
        sendData
      });
      modelUploadClient.callService(request, (result) => {
        if (result.err)
        {
          console.error(result.err);
        }
        console.log(result);
      });
    }
  },
});
