import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './Home'
import search from './Search'
import detail from './Detail'
import shopcart from './ShopCart'
import user from './User'
import trade from './Trade'


/*
//state：是仓库存储数据的地方
const state = {}
//mutations：修改state的唯一手段
const mutations = {}
//actions：处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {}
//getters：相当于计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}
*/


//对外暴露store类的一个实例
export default new Vuex.Store({
    //actions,
    //mutations,
    //state,
    //getters
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    }
})
