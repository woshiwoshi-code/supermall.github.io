<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control class="tab-control"
               :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isTabFixed"></tab-control>
<scroll class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="CountentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-views :recommends="recommends"></recommend-views>
    <feature-views></feature-views>
   <tab-control :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl2"></tab-control>
   <goods-list :goods="showGoods" ></goods-list>

</scroll>
  <back-top  @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
  import  HomeSwiper  from './childComps/HomeSwiper'
  import RecommendViews from './childComps/RecommendViews.vue'
  import FeatureViews from './childComps/FeatureViews.vue'


 import NavBar from 'components/common/navbar/NavBar';
import TabControl from '../../components/content/tabControl/TabControl.vue';
import GoodsList from '../../components/content/goods/GoodsList.vue';
import Scroll from '../../components/common/scroll/scroll.vue';
import BackTop from 'components/content/backTop/backTop.vue';



  import {getHomeMultidata,getHomeGoods} from 'network/home';
  import {debounce} from '../../common/ubils'


  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendViews,
      FeatureViews,
      GoodsList,
      Scroll,
      BackTop,
    },
    data() {
       return {
         id:'',
         name:'',
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:"pop",
        isShow:false,
        tabOffsetTop:0,
        isTabFixed:false,
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log("home");
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,100)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY=this.$refs.scroll.getScroll()

      //取消全局的监听事件
      this.$bus.$off('itemIm')
    },
    created() {
    this.getHomeMultidata()
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
    },
    mounted() {
      //监听图片item加载完成
    const refresh=debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on("itemImageLoad",()=>{
        // console.log("-------");
        refresh()
      })
    },
    methods: {
      //事件监听
      tabClick(index){
        switch(index){
          case 0:
            this.currentType="pop"
            break
          case 1:
            this.currentType="new"
            break
          case 2:
            this.currentType="sell"
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
        // console.log("1");
      },
      CountentScroll(position){
        // console.log(position);
        //backtop显示隐藏
        this.isShow=(-position.y)>1000

        //决定tabControl是否吸顶
        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },
      loadMore(){
        // console.log("上拉加载更多");
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad(){
   //获取tabOffsetTop的OffsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      },
      //网络请求
      getHomeMultidata(){
          getHomeMultidata().then(res=>{
        // console.log(res);
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      });
      },
       getHomeGoods(type){
         const page=this.goods[type].page+1
          getHomeGoods(type,page).then(res=>{
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          //完成下拉加载更多
          this.$refs.scroll.finishPullUp()
      })
       }
    },
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color: aliceblue;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content{
  overflow: hidden;
  position: absolute;
  top: 43px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
  margin-top: -2px;
}
</style>
