<template>
<div class="goods">
 <goods-list-item v-for="item in goods" :key="item.value" :goods-item="item"></goods-list-item>

  </div>
</template>

<script>
  import GoodsListItem from './GoodsListitem.vue'
  export default {
    name:'',
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data () {
      return {

      };
    },

    components: {
      GoodsListItem
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }

</style>
