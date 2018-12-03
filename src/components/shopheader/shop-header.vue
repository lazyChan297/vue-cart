<template lang="html">
  <header class="shop-header">
    <div class="blur-wrapper">
      <img :src="shopInfo.bgImgUrl" alt="" class="blur">
    </div>
    <div class="shop-header-img">
      <img :src="shopInfo.imgUrl" alt="">
    </div>
    <div class="shop-header-info">
      <p class="shop-name">{{shopInfo.name}}</p>
      <p class="info-list">
        <span>评价 4.7</span>
        <span>月售5000</span>
        <span>商家配送约30分钟</span>
      </p>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    shopInfo: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="stylus">
.shop-header
  position:relative
  .blur-wrapper
    padding-top: 70%
    height: 0
    position: relative
    .blur
     position:absolute
     top:0
     left:0
     width:100%
     height:100%
     z-index:-1
  .shop-header-img
    margin:-50px auto 10px
    text-align:center
    font-size:0
    img
     width:100px
     height:100px
  .shop-header-info
   text-align:center
   .shop-name
    font-weight:bold
  .info-list
    display:flex
    margin-top:10px
    margin-bottom:10px
    span
     flex:1
     color:#666
     font-size:12px
</style>
