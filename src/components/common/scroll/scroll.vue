<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
 import BScroll from '@better-scroll/core'
 import Pullup from '@better-scroll/pull-up'
 import MouseWheel from '@better-scroll/mouse-wheel'
 import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(Pullup)
BScroll.use(MouseWheel)
BScroll.use(ObserveDOM)
  export default {
    name:'',
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:true
      }
    },
    data () {
      return {
        scroll:null
      };
    },

    components: {
    },

    computed: {},

    beforeMount() {},

    mounted() {
      //创建scroll
      this.scroll=new BScroll(this.$refs.wrapper,{
         click: true,
         observeDOM: true,
         probeType: this.probeType,
         pullUpLoad:this.pullUpLoad,
         mouseWheel: true,//开启鼠标滚轮
         disableTouch: false,
         disableMouse:false,
         observeDOM: true,

      })
      //监听滚动的位置
  if (this.probeType===2 || this.probeType===3) {
    this.scroll.on("scroll",(position)=>{
    // console.log(position);
    this.$emit('scroll',position)
  })
  }
  //监听上拉事件
  // this.scroll.on("pullingUp",()=>{
  //   // console.log("上拉加载更多");
  //   this.$emit("pullingUp")
  // })
 //监听scroll滚动到底部
if (this.probeType===2 || this.probeType===3){
  this.scroll.on("pullingUp",()=>{
    // console.log("滚动到了底部");
    this.$emit("pullingUp")
  })
}
  //  this.scroll.scrollTo(0,0)
    },
    methods: {
      scrollTo(x,y,time=300){
       this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        // console.log("----");
        this.scroll && this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      getScroll(){
        return this.scroll ? this.scroll.y : 0
      }
    },

    watch: {}

  }

</script>
<style scoped>

</style>
