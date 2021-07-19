<template>
<div class="cart-list">
 <scroll class="content" ref="scroll">
    <!-- <li v-for="item in cartList" :key="item.id">{{item}}</li> -->
  <cart-list-item v-for="(item,index) in cartList"
        :key="index"
        :item-info="item"></cart-list-item>
 </scroll>
  </div>
</template>

<script>
  import  {mapGetters} from 'vuex'
import Scroll from '../../../components/common/scroll/scroll.vue';
import CartListItem from './CartListItem.vue';

  export default {
    name:'',
    props:{},
    data () {
      return {

      };
    },

    components: {Scroll, CartListItem},

    computed: {
        ...mapGetters(["cartList"])
    },

    beforeMount() {},
    activated() {
    // console.log("---");
    this.$refs.scroll.refresh()
    },
    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style scoped>
.cat-list{
  height: 100%;
}
.content{
  position: absolute;
  left: 0;
  right: 0;
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
