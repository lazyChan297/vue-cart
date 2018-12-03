import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  cart: {}
}

const CREATE_GOODS_TO_CART = 'CREATE_GOODS_TO_CART'
const ADD_GOODS_TO_CART = 'ADD_GOODS_TO_CART'
const DECREASE_GOODS = 'DECREASE_GOODS'
const CLEAR_CART = 'CLEAR_CART'

const mutations = {
  [CREATE_GOODS_TO_CART] (state, goods) {
    let newGoods = Object.assign({}, goods, {num: 1})
    Vue.set(state.cart, `${goods.id}`, newGoods)
  },
  [ADD_GOODS_TO_CART] (state, id) {
    let item = state.cart[id]
    let num = item.num
    state.cart[id] = Object.assign({}, item, {num: num + 1})
  },
  [DECREASE_GOODS] (state, id) {
    let item = state.cart[id]
    let num = state.cart[id].num
    num = num - 1
    state.cart[id] = Object.assign({}, item, {num: num})
  },
  [CLEAR_CART] (state) {
    state.cart = {}
  }
}

const getters = {
  cart: state => state.cart
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
