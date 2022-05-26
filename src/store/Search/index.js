import { reqGetSearchInfo } from "@/api"
//search模块的小仓库
const state = {
    searchList:{}
}

const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}

const actions = {
    //获取search模块的数据
    async getSearchList({commit},params={}){
        //默认params是个空对象
      let result = await reqGetSearchInfo(params)
      if(result.code == 200){
        commit('GETSEARCHLIST',result.data)
      }
    }
}

//用于计算属性
//主要作用是简化仓库中的数据
const getters = {
    //这里的形参state是当前仓库中的state
    goodsList(state){
        return state.searchList.goodsList
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}