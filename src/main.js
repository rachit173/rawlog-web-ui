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
  connectManually: true,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
