<template>
<div class="detail-swiper">
<swiper class="swiper-item">
  <swiper-item v-for="item in topImages" :key="item.id" >
    <img :src="item" alt="" class="images">
  </swiper-item>
</swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name:'',
    props:{
      topImages:{
        type:Array,
        default(){
          return[]
        }
      }
    },
    data () {
      return {

      };
    },

    components: {Swiper,SwiperItem},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style scoped>
.swiper-item{
  height: 300px;
  overflow: hidden;
}
</style>
