<template>
<div class="check-button" :class="{check:isChecked}">
  <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>

  export default {
    name:'',
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style scoped>
.check-button{

  border-radius: 50%;
  border: 2px solid #aaa;
}
.check{
  border-color:red ;
   background-color: red;
}
</style>
