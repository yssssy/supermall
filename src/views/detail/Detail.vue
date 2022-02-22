<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar"  @titleclick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="wrapper" ref="scroll" :probeType="3" @scroll="contentScroll" >
    <detail-swiper :topImgs="topImgs"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo" @imgLoad="goodsImgLoad"></detail-goods-info>
    <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
    <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommendInfo" ref="recommend"></goods-list>
    </scroll>
    <detail-bot-bar @addCart="addCart"></detail-bot-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import {getDetail,Goods,Shop,Param,getRecommend} from '../../network/details'

import Scroll from 'components/common/scroll/Scroll.vue'
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import DetailBotBar from './childComps/DetailBotBar.vue'
import BackTop from 'components/content/backTop/BackTop.vue'
export default {
  name: 'Detail',
  data(){
    return {
      iid:null,
      topImgs:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo: {},
      recommendInfo: [],
      commentInfo: [],
      themeTopY: [],
      isShowBackTop:false,
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBotBar,
    BackTop
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详情页面数据
    getDetail(this.iid).then(res => {
      this.topImgs = res.result.itemInfo.topImages
      //2.获取商品详情
			this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo)
      //3.获取商家详情
			this.shop = new Shop(res.result.shopInfo)
      //4.获取商家详情图片
			this.detailInfo = res.result.detailInfo
      //5.获取参数信息
			this.paramInfo = new Param(res.result.itemParams.info, res.result.itemParams.rule)
     	//6.获取评论信息
			if(res.result.rate.cRate !== 0){
				this.commentInfo = res.result.rate.list
			} 
      this.themeTopY = [];
			this.themeTopY.push(0);
			this.themeTopY.push(this.$refs.param.$el.offsetTop);
			this.themeTopY.push(this.$refs.comment.$el.offsetTop);
			this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopY)
      this.$nextTick(() => {
        this.themeTopY = [];
			  this.themeTopY.push(0);
			  this.themeTopY.push(this.$refs.param.$el.offsetTop);
			  this.themeTopY.push(this.$refs.comment.$el.offsetTop);
			  this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopY)
      })
    })
    //3.请求详情数据
    getRecommend().then(res => {
      this.recommendInfo = res.data.list
    })

  },
  methods: {
    
    goodsImgLoad() {
			this.$refs.scroll.refresh();
      this.themeTopY = [];
			this.themeTopY.push(0);
			this.themeTopY.push(this.$refs.param.$el.offsetTop);
			this.themeTopY.push(this.$refs.comment.$el.offsetTop);
			this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
    },
    titleClick(index){
			this.$refs.scroll.scrollTo(0,-this.themeTopY[index],200)
		},
    contentScroll(position){
				//返回顶部是否显示
				this.isShowBackTop = (-position.y) > 500;
				const positionY = -(position.y);
				let _lenth = this.themeTopY.length;
				for(let i=0; i<_lenth-1; i++){
					if(this.currentindex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
						this.currentindex = i;
						this.$refs.nav.currentindex = this.currentindex;
					}
				}
        this.isShowBackTop = -(position.y) > 1000
			},
      //返回顶部
    backTop(){
			this.$refs.scroll.scrollTo(0,0);
		},
    	//加入购物车
		addCart() {
			// 获取购物车需要展示的信息
		const product = {}
		product.image = this.topImgs[0];
		product.title = this.goods.title;
		product.desc = this.goods.discountDesc;
		product.price = this.goods.lowNowPrice;
		product.iid = this.iid;

			//将商品添加到购物车里
			this.$store.commit('addCart', product);
		}
  },

};
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;

  }
  .nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .wrapper{
    height: calc(100% - 44px);
  }
</style>