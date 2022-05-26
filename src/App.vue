<template>
<div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
</div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  components:{Header,Footer},
  mounted(){
    //通过Vuex发请求，获取数据，存储于仓库中
    //放在app.vue中就可以只在进入跟页面时请求拿数据
    //而且这个mounted只执行一次
    this.$store.dispatch('getcategoryList')
  }
}
</script>

<style>

</style>
