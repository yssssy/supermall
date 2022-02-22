<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @btnclick="btnclick" ref="tabControl2" v-show="isTabFiexd"></tab-control>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3" @pullingUp="loadMore" :PullUpLoad="true">   <!--给scroll组件绑定ref，可以this.$refs.scroll拿到这个组件进行操作  -->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature></feature>
      <tab-control :titles="['流行','新款','精选']"  @btnclick="btnclick" ref="tabControl1" ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backclick" v-show="isShowBackTop"/>   <!--.native可以监听组件的原生事件-->
    
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
import RecommendView from 'views/home/childComps/RecommendView.vue'
import Feature from 'views/home/childComps/Feature.vue'


import {getHomeMultidata,getHomeGoods} from '../../network/home'
import {debounce} from 'common/utils.js'      //导入防抖函数
export default {
  name: 'Home',
  components:{
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView,
    Feature
    
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      taboffsetTop:0,
      isTabFiexd:false,
      saveY:0
    }
  },
  activated() {     //活跃时调用
    this.$refs.scroll.scrollTo(0,this.saveY,1)    //跳到该位置
    this.$refs.scroll.refresh()     //进行刷新
  },
  deactivated() {   //离开时调用
    this.saveY = this.$refs.scroll.bscroll.y      //记录离开时的位置
  },
  created(){      //创建时执行
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    
  },
  mounted() {   //挂载时执行
    //图片加载完的时间监听
    const refresh = debounce(this.$refs.scroll.refresh,50)    //调用防抖函数
    this.$bus.$on('itemimgload', () => {    //解决滚动区域的bug,因为在创建时执行时，有可能找不到this.$refs这个，所以在挂载时执行 
      // console.log('---')  //创建时监听img加载
      // this.$refs.scroll.refresh()     //调用scroll里的刷新方法
     
      refresh()     //使用refresh方法
    })    
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods: {
    // //防抖函数
    // debounce(func,delay){
    //   let timer = null
    //   return function(...args){
    //     if(timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this,args)
    //     }, delay);
        
    //   }
    // },

    //事件监听方法
    btnclick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break 
      }
      this.$refs.tabControl1.currentindex = index;
      this.$refs.tabControl2.currentindex = index;
    },
    backclick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      //判断backTop是否显示
      this.isShowBackTop = -(position.y) > 1000
      // console.log(position)
      //判断tabControl是否吸顶
      this.isTabFiexd = -(position.y) > this.taboffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)     //上拉加载更多调用此方法
      // this.$refa.scroll.bscroll.refresh()      //进行刷新
    },
    swiperImgLoad(){  //接收HomeSwiper图片加载完成发射的方法
      this.taboffsetTop = this.$refs.tabControl1.$el.offsetTop    //所有的组件都有一个属性：叫$el,用于获取组件的元素
    },


    //网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      // console.log(res)     //因为res会销毁，所以把他保存在data数据中
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1    //当前页数加1   0+1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)      //把res.data.list里的数据一个个push进去this.goods[type].list
        this.goods[type].page +=1         //push进去后在加1   1+1
        this.$refs.scroll.bscroll.finishPullUp()      //上拉加载完后再次进行上拉加载
      })
     
    }
  },
  
};
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: #ff5777;
    color: #fff;
    /*在使用浏览器原生滚动时使用*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;  
        /*z-index属性是css中用于设置元素的堆叠顺序的一种属性，拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面，并且元素可拥有负的z-index属性值*/
  }
  .tab-control{
    position: relative;     /*absolute和fixed来回切换 */         /*当高度达到44px就会切换至fixed*/
    z-index: 9;
  }
  .content{
    /* height:calc(100vh -93px); */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  
</style>