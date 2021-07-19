<template>
<div>
    <swiper>
       <swiper-item v-for="item in banners" :key="item.id">
         <a :href="item.link">
           <img :src="item.image" alt="" @load="imageLoad">
         </a>
       </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name:'',
    props:{
         banners:{
           type:Array,
           default(){
             return[]
           }
         },
    },
    data () {
      return {
        isLOad:false
      };
    },

    components: {
        Swiper,
      SwiperItem
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
      imageLoad(){
        // console.log("---");
        if(!this.isLoad){
        this.$emit("swiperImageLoad")
          this.isLoad=true
        }

      }
    },

    watch: {}

  }

</script>
<style>

</style>
