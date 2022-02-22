<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index" class="title-item" @click="titleclick(index)" :class="{active:currentindex === index}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  name: 'Navbar',
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentindex:0
    }
  },
  methods:{
    titleclick(index){
      this.currentindex = index
      this.$emit('titleclick',index)
    },
    backclick(){
      this.$router.back()
    }
  }
};
</script>

<style scoped>
  .back img{
    margin-top: 10px;
  }
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: #ff5777;
  }
</style>