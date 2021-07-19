<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
 <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">

  <detail-swiper :topImages="topImages"></detail-swiper>
  <detail-base-info :goods="goods"></detail-base-info>
  <detail-shop-info :shop="shop"></detail-shop-info>
  <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
  <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
  <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
  <goods-list :goods="recommends" ref="recommends"></goods-list>
 </scroll>
 <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
  <back-top @click.native="backClick" v-show="isShow"></back-top>
  <!-- <toast :message="message" :show="show"></toast> -->
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/scroll.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
import BackTop from '../../components/content/backTop/backTop.vue'



import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import { debounce } from '../../common/ubils'

import {mapActions} from 'vuex'
// import Toast from '../../components/common/toast/Toast.vue'



  export default {
    name:'Detail',
    props:{},
    components: {
      DetailNavBar,
      DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        // Toast,


    },
    data () {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTOPYs:[],
        getThemeTopY:null,
        currtentIndex:0,
        isShow:false,
        // message:'',
        // show:false

      };
    },
    created() {
      //保存传入的ID
      this.iid=this.$route.params.iid
      //根据id请求详情数据
      getDetail(this.iid).then((res)=>{
        // console.log(res);
        const data=res.result
        //获取顶部数据
        this.topImages=data.itemInfo.topImages
        //获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //创建店铺信息
        this.shop=new Shop(data.shopInfo)
        //保存商品的详情数据
        this.detailInfo=data.detailInfo
        //获取参数信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

      })
      getRecommend().then(res=>{
        // console.log(res);
        const data=res.data
        this.recommends=data.list
      })
      this.getThemeTopY=debounce(()=>{
      this.themeTOPYs=[]

      this.themeTOPYs.push(0)
      this.themeTOPYs.push(this.$refs.params.$el.offsetTop-40)
      this.themeTOPYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTOPYs.push(this.$refs.recommends.$el.offsetTop-30)
      this.themeTOPYs.push(Number.MAX_VALUE)

      console.log(this.themeTOPYs);
      },100)
    },

    computed: {},

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions(["addToCart"]),
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTOPYs[index],100)
      },
      contentScroll(postion){
        // console.log(postion);
        //获取y值
        const postionY=-postion.y
        //和主题的值进行对比
        let length=this.themeTOPYs.length
        for (let i=0;i<length-1;i++) {
        //  console.log(i);

        // if (postionY>this.themeTOPYs[i]&&postion<this.themeTOPYs[i+1]){
        //   console.log(i);
        // }

        // if(this.currtentIndex!==i&&((i<length-1 && postionY >= this.themeTOPYs[i]&&postionY<this.themeTOPYs[i+1])||(i===length-1&&postionY>=this.themeTOPYs[i]))){
        //   // console.log(i);
        //   this.currtentIndex=i
        // console.log(this.currtentIndex);
        // this.$refs.nav.currentIndex=this.currtentIndex
        // }

        if(this.currtentIndex!==i&&(postionY > this.themeTOPYs[i]&&postionY<this.themeTOPYs[i+1])){
        this.currtentIndex=i
        // console.log(this.currtentIndex);
        this.$refs.nav.currentIndex=this.currtentIndex
        }
        //显示回到顶部
        this.isShow=(-postion.y)>1000


        }
    },
     backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
        // console.log("1");
      },
      addCart(){
        // console.log("--");
        //1.获取购物车需要展示的信息
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.realPrice
        product.iid=this.iid
        // 2.将商品添加到购物车
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res);
        // })
        this.addToCart(product).then(res=>{
          // console.log(res);
            // this.show=true
            // this.message=res

            // setTimeout(()=>{
            //   this.show=false
            //   this.message=''
            // },1500)
            this.$toast.show(res,2000)
        })
      }
    },
    watch: {}

  }

</script>
<style scoped>
#detail{
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}

</style>
