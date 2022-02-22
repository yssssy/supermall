<template>
  <div class="tab-bar-item" @click="btnclick">
    <div v-if="!isactive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activestyle"><slot  name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'Tabbaritem',
  data(){
    return {
      // isactive:true
    }
  },
  props:{
    path:String,
    activecolor:{
      type:String,
      default:'red'
    }
  },
  methods:{
    btnclick(){
      this.$router.push(this.path)
    }
  },
  computed:{
    isactive(){
      return this.$route.path.indexOf(this.path)  !== -1
    },
     activestyle(){
      return this.isactive?{color:this.activecolor}:{}
    },
  }

};
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 14px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;        /*vertical-align 属性设置元素的垂直对齐方式。*/
  }
</style>