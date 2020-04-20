import Vue from 'vue'
import App from './App.vue'
import * as io from 'socket.io-client'
import vuetify from './plugins/veutify';

// icons
import './global';

Vue.config.productionTip = false;

// initiate socket
export const SocketMirror = io('http://localhost:5000/mirror'); // must export and use this if not serving up static assets

Vue.use(SocketMirror);

new Vue({
  vuetify,
  // store,
  render: h => h(App)
}).$mount('#app');
