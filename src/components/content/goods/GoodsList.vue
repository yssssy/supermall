<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: 'Goodslist',
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;      /*换行*/        /*nowrap是不换行*/
    justify-content: space-evenly;      /*进行均等分*/
  }

</style>