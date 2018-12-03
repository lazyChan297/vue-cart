<template lang="html">

  <div class="cart-wrapper">
    <div class="cart-content">
      <div class="cart-content-left" :class="cartIconClass" @click="toggle">
        <i class="icon-cart"></i>
      </div>
      <div class="cart-content-middle">
        <div class="">
          <p :class="totalPriceClass">{{totalPriceText}}</p>
        </div>
      </div>
      <div class="cart-content-right">
        {{payButtonText}}
      </div>
    </div>
    <transition name="slide">
        <ul class="select-list" v-show="!isHidden">
          <p class="clear" @click="clearCart">清空购物车</p>
          <li class="select-item" v-for="(item,index) in selectItems">
            <span class="name">{{item.name}}</span>
            <span class="total">{{item.price*item.num}}</span>
            <count :goods="item" class="count"></count>
          </li>
        </ul>
    </transition>
  </div>
</template>

<script>
import Count from '@/components/count/count'
import {mapMutations} from 'vuex'
export default {
  props: {
    selectItems: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      isHidden: true
    }
  },
  computed: {
    payButtonText () {
      if (this.totalPrice === 0) {
        return `还差15元起送`
      } else if (15 - this.totalPrice > 0) {
        return `还差${Number(15 - this.totalPrice)}元起送`
      } else {
        return `去结算`
      }
    },
    totalPrice () {
      let totalPrice = 0
      this.selectItems.forEach((item, index) => {
        totalPrice += item.num * item.price
      })
      return totalPrice
    },
    totalPriceText () {
      if (this.totalPrice > 0) {
        return `￥${this.totalPrice}元`
      } else {
        return `购物车空空如也~`
      }
    },
    cartIconClass () {
      return this.totalPrice > 0 ? `active` : ''
    },
    totalPriceClass () {
      return this.totalPrice > 0 ? `active` : ''
    }
  },
  components: {
    Count
  },
  watch: {
    totalPrice (newVal) {
      if (newVal > 0) {
        return
      }
      this.isHidden = true
      this.$emit('toggleMask', true)
    }
  },
  methods: {
    toggle () {
      if (!this.totalPrice) {
        return
      }
      this.isHidden = !this.isHidden
      this.$emit('toggleMask', this.isHidden)
    },
    clearCart () {
      this.clear()
      this.toggle()
    },
    clearEmpty () {
      this.toggle()
    },
    ...mapMutations({
      clear: 'CLEAR_CART'
    })
  }
}
</script>

<style lang="stylus">
  .slide-enter, .slide-leave-to
    transform: translate3d(0,100%,0)
  .slide-enter-active, .slide-leave-active
    transition: all .5s
  .slide-enter-to, .slide-leave
     transform: translate3d(0,0,0)
  .cart-wrapper
    position: fixed
    bottom: 0
    height: 48px
    line-height: 48px
    width: 100%
    z-index:3
    .cart-content
      position:relative
      display: flex
      background:rgba(61,61,63,.9)
      z-index:1
      .cart-content-left
        background: #666
        border-radius: 50%
        width: 50px
        height: 50px
        text-align: center
        margin: -10px 10px 0
        .icon-cart
          &:before
            content: ''
            display: block
            margin:10px auto
            width: 30px
            height: 30px
            background:url('cart.svg')
            background-size: 100%
        &.active
         background:#2395ff
         .icon-cart
           &:before
             content: ''
             display: block
             margin:10px auto
             width: 30px
             height: 30px
             background:url('lhcart.svg')
             background-size: 100%
      .cart-content-middle
        flex:1
        display: flex
        color: #999
        justify-content: center
        font-size: 12px
        flex-direction: column
        p
          height: 20px
          line-height: 20px
          &.active
            color: #fff
            font-weight: bold
            font-size:14px
      .cart-content-right
        color: #fff
        margin-right: 10px
        font-weight: bold
    .select-list
      position: absolute;
      bottom: 48px;
      background: #fff
      width: 100%
      .clear
        height: 30px
        line-height: 30px
        text-align: right
        font-size: 14px
        background: #f8f8f8
        padding-right: 10px
      .select-item
       display: flex
       align-items: center
       font-size:12px
       color:#222
       padding:0 10px
       .name, .total
        flex:1
       .total
        text-align:center
       .count
        width:80px
</style>
