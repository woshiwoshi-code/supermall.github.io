<template>
<div class="toast" v-show="isShow">
  <div >{{message}}</div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:{
      // message:{
      //   type:String,
      //   default:""
      // },
      // show:{
      //   type:Boolean,
      //   default:false
      // }
    },
    data () {
      return {
        message:'',
        isShow:false
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
      show(message,duration=2000){
         this.isShow=true
            this.message=message

             setTimeout(()=>{
              this.isShow=false
              this.message=''
            },duration)
      }
    },

    watch: {}

  }

</script>
<style scoped>
.toast{
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, .5);
  color: #fff;
  z-index: 999;
}
</style>
