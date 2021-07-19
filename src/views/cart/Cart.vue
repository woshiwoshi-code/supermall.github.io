<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
      <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import {mapGetters} from 'vuex'
import CartList from './childCart/CartList.vue'
import CartBottomBar from './childCart/CartBottomBar.vue'
  export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar },
    name: "Cart",
     computed:{
       ...mapGetters({
         length:"cartLength"
       })
  }
  }
</script>

<style scoped>
.cart{
  height: 100vh;
}
.cart-nav{
  background-color: var(--color-tint);
  color: #fff;
  /* font-weight: 700; */
}
</style>
