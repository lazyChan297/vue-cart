<template lang="html">
  <div class="index" ref="index">
    <!-- tab -->
    <ul class="tab-wrapper">
      <li class="tab-item active"><span>点菜</span></li>
      <li class="tab-item"><span>评价</span></li>
      <li class="tab-item"><span>商家</span></li>
    </ul>
    <!-- list -->
    <div class="scroll-wrapper" ref="wrapper">
      <div class="scroll-content">
        <!-- 商品列表 -->
        <list-view :list="prodList" :menulist="menuList" :top="top">
          <div class="listView">
            <ul class="prod-list" ref="prodLis">
              <li v-for="(item, index) in prodList" ref="prodItem">
                <div class="category-title">
                  {{item.name}}
                </div>
                <ul class="prodList">
                  <li class="prod-item" v-for="(kitem,kindex) in item.foods">
                      <div class="prod-left">
                        <img v-lazy="kitem.imgUrl" alt="">
                      </div>
                      <div class="prod-right">
                        <p class="prod-name">{{kitem.name}}</p>
                        <p class="prod-desc">{{kitem.desc}}</p>
                        <p class="prod-actions"></p>
                        <p class="operator">
                          <span class="prod-price">￥{{kitem.price}}</span>
                          <span class="count-wrapper">
                            <count :goods="kitem"></count>
                          </span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
          </div>
        </list-view>
      </div>
      <!-- 滚动到一定高度时固定top -->
      <div class="fixed-header-info" v-show="!isHiddenFixedTop">
        <p class="shop-name">{{shopInfo.name}}</p>
        <p class="info-list">
          <span>评价 4.7</span>
          <span>月售5000</span>
          <span>商家配送约30分钟</span>
        </p>
      </div>
    </div>
    <!-- menu -->
    <ul class="menu-list" ref="menulist">
      <li class="menu-item"
          v-for="(item, index) in menuList"
          :class="{'active': currentIndex==index}"
          :data-index="index"
          @click="scrollToItem">{{item}}</li>
    </ul>
    <cart :selectItems="selectItems" @toggleMask="toggle"></cart>
    <!-- mask -->
    <transition name="mask">
      <div class="mask" v-show="!isHidden"></div>
    </transition>
  </div>
</template>

<script>
import ShopHeader from 'components/shopheader/shop-header'
import ListView from 'components/listView/listView'
import Count from 'components/count/count'
import shopData from './data'
import BScroll from 'better-scroll'
import Cart from 'components/cart/cart'
import {mapGetters} from 'vuex'
const IMG_BLUR_HEIGHT = window.innerWidth * 0.7
const MENU_INITIAL_TOP = IMG_BLUR_HEIGHT + 108
const MENU_SCROLL_TOP = 58
export default {
  components: {
    ShopHeader,
    ListView,
    Count,
    Cart
  },
  data () {
    return {
      shopInfo: null,
      prodList: [],
      menuList: [],
      scrollY: 0,
      isHiddenFixedTop: true,
      top: IMG_BLUR_HEIGHT + 108,
      itemHeight: [],
      currentIndex: 0,
      isHidden: true
    }
  },
  created () {
    this._format()
  },
  mounted () {
    this.$refs.index.style.height = `${window.innerHeight}px`
    this._initScroll()
    this.calcHeight()
  },
  computed: {
    selectItems () {
      let cart = this.cart
      let ret = []
      for (let k in cart) {
        if (cart[k].num > 0) {
          ret.push(cart[k])
        }
      }
      return ret
    },
    ...mapGetters([
      'cart'
    ])
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        probeType: 3
      })
      this.scroll.on('scroll', pos => {
        this.scrollY = pos.y
      })
    },
    scrollToItem (e) {
      let index = e.target.dataset.index
      let itemList = this.$refs.prodItem
      this.currentIndex = index
      this.scroll.scrollToElement(itemList[index], 300)
    },
    _format () {
      this.shopInfo = shopData.shopInfo
      this.prodList = shopData.prodList
      let menuList = []
      shopData.prodList.forEach((item, index) => {
        menuList.push(item.name)
      })
      this.menuList = menuList
    },
    calcHeight () {
      const prodItem = this.$refs.prodItem
      let itemHeight = [0], height = 0
      prodItem.forEach((item, index) => {
        height += item.clientHeight
        itemHeight.push(height)
      })
      this.itemHeight = itemHeight
    },
    toggle (flag) {
      this.isHidden = flag
    }
  },
  watch: {
    scrollY (newVal) {
      let itemHeight = this.itemHeight
      for (let i = 0; i < itemHeight.length; i++) {
        let height1 = itemHeight[i]
        let height2 = itemHeight[i + 1]
        if (-newVal >= height1 && -newVal < height2) {
          this.currentIndex = i
          return
        }
      }
    }
  }
}
</script>

<style lang="stylus">
  .index
    overflow:hidden
    .tab-wrapper
      position: fixed
      display: flex
      top:0
      width: 100%
      height: 45px
      line-height: 45px
      text-align: center
      background:#fff
      z-index:1
      .tab-item
        flex:1
        &.active
          span
            display:inline-block
            border-bottom:2px solid #ffd161
    .scroll-wrapper
      height:100%
      margin-top: 45px
      .scroll-content
        padding-bottom: 90px
    .fixed-header-info
      position:fixed
      width:100%
      background:#fff
      top:0
      .shop-name
        font-weight: bold
        padding: 10px 0
        text-align: center
      .info-list
        display:flex
        padding-bottom:10px
        span
         flex:1
         text-align:center
         font-size:12px
    .menu-list
      top:45px
      position:absolute
      width:60px
      text-align:center
      .menu-item
        line-height:64px
        background:#f8f8f8
        color: #666
        &.active
          background: #fff
    .mask
      position:fixed
      top:0
      bottom:0
      width:100%
      background:rgba(0,0,0,.5)
      z-index:2
      &.mask-enter, &.mask-leave-to
        opacity: 0
      &.mask-enter-active, .&.mask-leave-active
        transition: all .5s
</style>
