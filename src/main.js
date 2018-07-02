import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import MRPTLIB from 'mrpt-web-js';
import VueNativeSock from 'vue-native-websocket'

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueNativeSock, 'ws://localhost:5000', {
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
