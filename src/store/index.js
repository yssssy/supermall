import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    cartList: []
  },
  mutations:{
    addCart(state,payload){
			// let oldProduct = null;
			// for(let item of state.cartList){
			// 	if(item.iid === payload.iid){
			// 		oldProduct = item
			// 	}
			// }
			//数组find()方法
			let oldProduct = state.cartList.find(function(item){
				return item.iid === payload.iid
			})
			if(oldProduct){
				oldProduct.count += 1;
			}else {
				payload.count = 1;
				// payload.checked = true;
				state.cartList.push(payload)
			}
			// state.cartList.push(payload)
			// console.log(payload);
		}
  },
  filters:{},
  actions:{},
  modules:{},
})

export default store