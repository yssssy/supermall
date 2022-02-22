<template>
  <div>
    <swiper class="aa">
      <swiper-item v-for="(item,index) in topImgs" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'Detailswiper',
  props:{
    topImgs:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
  
};
</script>

<style scoped>
  .aa{
    height: 300px;
    overflow: hidden;
  }
</style>