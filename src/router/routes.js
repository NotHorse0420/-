//引入路由组件
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
//二级路由
import MyOrder from '../pages/Center/myOrder'
import GroupOrder from '../pages/Center/groupOrder' 

//配置路由信息
export default [
    {
      name:'center',
      path:'/center',
      component:Center,
      meta:{show:true},
      //二级路由
      children:[
        {
          //二级路由路径要不写全要不不写/
          path:'myorder',
          component:MyOrder
        },
        {
          path:'grouporder',
          component:GroupOrder
        }
      ]
    },
    {
      path:'/center',
      redirect:'/center/myorder'
    },
    {
      name:'paysuccess',
      path:'/paysuccess',
      component:PaySuccess,
      meta:{show:true}
    },
    {
      name:'pay',
      path:'/pay',
      component:Pay,
      meta:{show:true}
    },
    {
      name:'trade',
      path:'/trade',
      component:Trade,
      meta:{show:true},
      //路由独享守卫
      beforeEnter:(to,from,next)=>{
        if(from.path === '/shopcart'){
          next()
        }else{
          next('/shopcart')
        }
      }
    },
    {
      name:'shopCart',
      path:'/shopcart',
      component:ShopCart,
      meta:{show:true}
    },
    {
      name:'addCartSuccess',
      path:'/addcartsuccess',
      component:AddCartSuccess,
      meta:{show:true}
    },
    {
      path:'/detail/:skuId',
      component:Detail,
      meta:{show:true}
    },
    {
        path:'/home',
        component:Home,
        meta:{show:true}
    },
    {
      path:'/login',
      component:Login,
      meta:{show:true}
    },
    {
      path:'/register',
      component:Register,
      meta:{show:false}
    },
    {
      path:'/search/:keyword?',
      name:'Search',
      component:Search,
      meta:{show:true},
      //函数写法，可以将params参数和query参数，通过props传递给路由组件
      props($route){
        return {k:$route.params.k,keyword:$route.query.keyword}
      }
    },
    //需要在项目运行时，让初始页面在home上
    {
      path:'*',
      redirect:'/home'
    },
  ]