<template lang="html">
  <div class="count">
    <div class="decrease" @click="minus" v-show="num>0">-</div>
    <div class="increase" @click="add">+</div>
    <div class="number" v-show="num>0">{{num}}</div>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  props: {
    goods: {
      type: Object,
      default: null
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  computed: {
    num () {
      let cart = this.$store.state.cart
      if (!cart[this.goods.id]) {
        return
      }
      let currentNum = cart[this.goods.id].num ? cart[this.goods.id].num : 0
      return currentNum
    },
    ...mapGetters([
      'cart'
    ])
  },
  methods: {
    add () {
      let hasGoods = this.hasGoods(this.goods.id)
      if (!hasGoods) {
        this.createGoods(this.goods)
      } else {
        this.addGoods(this.goods.id)
      }
    },
    minus () {
      const cart = this.cart
      if (this.num === 0) {
        return
      }
      this.decreaseGoods(this.goods.id)
    },
    hasGoods (id) {
      if (this.$store.state.cart[id] === undefined) {
        return false
      } else {
        return true
      }
    },
    ...mapMutations({
      createGoods: 'CREATE_GOODS_TO_CART',
      addGoods: 'ADD_GOODS_TO_CART',
      decreaseGoods: 'DECREASE_GOODS'
    })
  }
}
</script>

<style lang="stylus" scoped>
  .count
    overflow:hidden
    .decrease,.increase
      width:20px
      height:20px
      display:inline-block
      border-radius:50%
      text-align:center
      line-height:20px
      font-size:16px
      font-weight:bold
    .decrease
      float:left
      border:1px solid rgb(35, 149, 255)
      background:#fff
      color:rgb(35, 149, 255)
      box-sizing: border-box
    .increase
      float:right
      background:rgb(35, 149, 255)
      color:#fff
    .number
      width:100%
      line-height:22px
      font-size:14px
      text-align:center
</style>
