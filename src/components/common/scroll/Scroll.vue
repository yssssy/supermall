<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll, { ObserveImage, PullUpLoad } from 'better-scroll'
export default {
  name: 'Scroll',
  data(){
    return {
      bscroll:null,
      
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    PullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper,{
      click:true,   //开始点击事件
      observeDOM:true,    //开启滚动
      probeType:this.probeType,      //开启位置滚动监听
      pullUpLoad:this.PullUpLoad,     //开启上拉加载更多
      ObserveImage:true
    })
    if (this.probeType === 2 || this.probeType === 3) {     //如果probetype ===2 或者 ===3时进行监听滚动
      this.bscroll.on('scroll', (position) => {     //监听滚动
      this.$emit('scroll',position)
    })
    }
    if (this.PullUpLoad) {  //如果pullUpLoad为true时监听上拉加载更多
      this.bscroll.on('pullingUp',() => {       //监听上拉加载更多
      this.$emit('pullingUp')     //用$emit自定义事件
      // console.log('上拉加载更多')
    })
    }
    
  },
  methods: {
    scrollTo(x,y,time=500){
      this.bscroll && this.bscroll.scrollTo(x,y,time)        //点击scroll里的内容回到顶部,判断this.scroll里有没有值，有的化执行this.bscroll.scrollTo(x,y,time)
  },
    finishPullUp(){
      this.scroll && this.bscroll.finishPullUp()      //上拉加载完后再次进行上拉加载
    },
    refresh(){  //解决滚动区域的bug
      // console.log('---')
      this.bscroll && this.bscroll.refresh()      //进行刷新,判断this.scroll里有没有值，有的化执行this.bscroll.refresh()
    }

  },
  
};
</script>

<style scoped>

</style>