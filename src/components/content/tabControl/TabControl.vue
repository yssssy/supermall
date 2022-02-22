<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active:currentindex === index}" @click="tabclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabcontrol',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentindex:0
    }
  },
  methods: {
    tabclick(index){
      this.currentindex = index
      this.$emit('btnclick',index)
    }
  },

};
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fefefe;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: #ff5777;
  }
  .active span{
    border-bottom: 3px solid #ff5777;
  }
</style>