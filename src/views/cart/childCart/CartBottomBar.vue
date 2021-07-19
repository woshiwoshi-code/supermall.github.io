<template>
<div class="bottom-nav">
  <div class="check-content">
    <check-button
    class="check-button"
    :is-checked="isSelectAll"
    @click.native="checkClick()"></check-button>
    <span class="margin">全选</span>
  </div>

  <div>
   <div class="price"> 合计:{{totalPrice}}</div>
  </div>

  <div class="calculate" @click="calcClick">
    去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/checkButton.vue';
import { mapGetters } from 'vuex'
  export default {
    name:'',
    props:{},
    data () {
      return {

      };
    },

    components: {CheckButton },


    computed: {
      ...mapGetters(["cartList"]),
      totalPrice(){
        return "￥" + this.cartList.filter(item=>{
          return item.checked
        }).reduce((proValue,item)=>{
          return proValue+item.price*item.count
        }, 0).toFixed(2)
      },
      //修复一个商品购买多件,去结算的显示bug
      checkLength(){
        return this.cartList.filter(item=>{
          return item.checked
        }).reduce((proValue,item)=>{
          return proValue+item.count
        },0)
      },
      isSelectAll(){
        if(this.cartList.length===0){
          return false
        }else{
        return !this.cartList.find(item=> !item.checked)
        }
      }
    },
    methods: {
      checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item=>item.checked=false)
      }else{
       this.cartList.forEach(item=>item.checked=true)
      }
      },
      calcClick(){
        if (!this.isSelectAll) {
            this.$toast.show('请选择购买的商品',2000)

        }
      }
    },
  }

</script>
<style scoped>
.bottom-nav{
    position: relative;

  height: 40px;
  background-color: #eee;
  bottom:-80%;

  display: flex;
}
.check-content{
  display: flex;
  /* align-items: center; */
  padding: 10px;
}
.check-button{
  width: 20px;
  height: 20px;
}
.margin{
  display: block;
  margin: 2px 0 0 10px;
}
.price{
  margin: 12px 0 0px 30px;
}
.calculate{
  background-color: red;
  width: 90px;
  height: 40px;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 40px;
  color: #fff;
  text-align: center;
}
</style>
