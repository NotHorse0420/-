import Vue from 'vue'
import App from './App.vue'

//引入三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
//引入轮播图---全局组件
import Carousel from '@/components/Carousel'
//引入分页器
import Pagination from '@/components/Pagination'
import {Button,MessageBox} from 'element-ui'
//第一个参数是名字，第二个参数是哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//注册全局组件
Vue.component(Button.name,Button)
//挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
//引入mockServe.js ---mock数据
import "@/mock/mockServe"
//引入swiper样式
import "swiper/css/swiper.css"
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'

Vue.config.productionTip = false
/*
//测试
import {reqGoodsInfo} from '@/api'
console.log(reqGoodsInfo())
*/

//统一接收api文件的全部请求函数
import * as API from '@/api'
import lazyload from '@/assets/lazyload.gif'

//引入插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading: lazyload
})

//引入自定义插件
import myPlugins from '@/plugins/myPlugins'

Vue.use(myPlugins,{
  name:'upper'
})

new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API =API
  },
  //kv一致。省略v
  //注册路由信息，当这里书写router的时候，组件身上都有$route,$router属性
  router,
  //注册仓库，组件实例身上会多出$store属性
  store
}).$mount('#app')
