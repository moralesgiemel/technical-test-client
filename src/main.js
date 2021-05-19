import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Swal from "sweetalert2";
import results from "@/helpers/results";

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$http = axios;
Vue.prototype.$swal = Swal;
Vue.prototype.$results = results;


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
