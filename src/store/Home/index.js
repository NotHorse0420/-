import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"
//home模块的小仓库

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerlist){
        state.bannerList = bannerlist
    },
    GETFLOORLIST(state,floorlist){
        state.floorList = floorlist
    }
}

const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    //async和await必须一起用
    async getcategoryList({commit}){
      let result = await reqCategoryList()
      if(result.code == 200){
          commit('CATEGORYLIST',result.data)
      }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
      let result = await reqGetBannerList()
      if(result.code == 200){
          commit('GETBANNERLIST',result.data)
      }
    },
    async getFloorList({commit}){
      let result = await reqGetFloorList()
      if(result.code == 200){
          commit('GETFLOORLIST',result.data)
      }
    },
}

const getters = {}

export default {  
    state,
    mutations,
    actions,
    getters
}