<template>
  <div>
    <!--三级联动全局组件：已经是全局组件，所以不需要import-->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
  name:'Home',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    this.$store.dispatch("getFloorList")
    //首页展示用户信息
    //这里放入路由守卫中，可以导致每个路由组件都经过一次派发
    //this.$store.dispatch("getUserInfo")
  },
  computed:{
    ...mapState({
      floorList:state => state.home.floorList
    })
  }
}
</script>

<style>

</style>