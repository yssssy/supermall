import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

// console.log('aaa')
// setTimeout(() => {
//   console.log('bbb')
// },);    //没有设定时间也是最后执行
// console.log('ccc')

// //执行顺序   aaa>ccc>bbb