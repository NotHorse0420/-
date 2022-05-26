//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//引入路由信息
import routes from './routes'
//引入store
import store from '@/store'

//先把VueRouter原型对象中的push方法保存
let originPush = VueRouter.prototype.push
//同样的
let originReplace = VueRouter.prototype.replace

//重写
//第一个参数，告诉你push方法，往哪里跳转
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}

let router = new VueRouter({
  routes,

  //滚动行为
  scrollBehavior(to,from,savedPosition){
    //y=0代表置顶
    return {y:0}
  }

})

//全局守卫
router.beforeEach(async(to,from,next)=>{
  //to是要跳转到哪个路由的信息
  //from是从哪个路由而来的信息
  //next是放行函数
  /*
    1.next()所有都放行
    2.next('/login)这就是放行到指定的位置
    3.next(false)
  */
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token){
    //如果已经登陆了就只能停留在主页，不能去login
    if(to.path=='/login'||to.path=='/register'){
      next('/')
    }else{
      //去的不是login
      //如果用户名已有
      if(name){
        next()
      }else{
        try {
          await store.dispatch("getUserInfo")
          //放行
          next()
        } catch (error) {
          //token过期了
          //所以第一步清除token
          await store.dispatch('userLogout')
          //然后前往登录
          next('/login')
        }
      }
    }
  }else{
    //未登录,不能去交易相关页面
    let toPath = to.path;
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect='+toPath);
    }else{
       //去的不是上面这些路由（home|search|shopCart）---放行
      next();
    }
  }
})

export default router