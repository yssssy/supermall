<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'Homeswiper',
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      dafault(){
        return []
      }
    }
  },
  data(){
    return{
      isLoad:false
    }
  },
  methods:{
    imgLoad(){  //图片加载完成发射
    if(!this.isLoad){
       this.$emit('swiperImgLoad')
       this.isLoad = true
    }
     
    }
  }

};
</script>

<style scoped>

</style>