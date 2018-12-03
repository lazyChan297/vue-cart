<template lang="html">
  <div>
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Count from 'components/count/count'
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    menulist: {
      type: Array,
      default: []
    },
    top: {
      type: Number
    }
  },
  mounted () {
  },
  components: {
    Count
  },
  methods: {

  }
}
</script>

<style lang="stylus">
  .scroll-wrapper
    height:100%
    overflow:hidden
   .prod-list
    margin-left:60px
    flex:1
    .category-title
      height: 30px
      line-height: 30px
      font-weight: bold
      font-size: 14px
      color: #999
      padding-left: 10px
    .prod-item
      width:100%
      display:flex
      padding:10px 0
      .prod-left
        padding-lefe:10px
        font-size:0
        img
         height:80px
         width:80px
      .prod-right
        flex:1
        position:relative
        padding:0 6px 0
        overflow:hidden
        font-size:0
        .prod-name
          font-size:16px
          font-weight:bold
        .prod-desc
          font-size:12px
          width:100%
          display:inline-block
          text-overflow: ellipsis
          white-space: nowrap
          overflow:hidden
        .prod-actions
          color: #f07373
          font-size:12px
        .prod-name,.prod-desc,.prod-actions
          margin-bottom:6px
        .operator
          position:absolute
          display:flex
          bottom:0
          left:3px
          right:0
          padding-right:10px
          align-items: center
          .count-wrapper
            width:80px
          .prod-price
            font-size:16px
            flex:1
            color: rgb(255, 83, 57)
</style>
