import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入ElementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Message} from "element-ui";

// 导入全局样式
import './assets/global.css'

import axios from 'axios'
import message from "element-ui/packages/message";
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
Vue.prototype.$message = Message

Vue.config.productionTip = false

Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
