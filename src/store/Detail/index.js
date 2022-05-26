import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api"
//生成一个随机字符串，不能再变，这是识别游客的
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state,goodInfo){
      state.goodInfo = goodInfo
    }
}
const actions = {
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    },
    //将产品添加到购物车中
    //这里只是写入服务器，并没有返回其他的数据，只是返回200操作成功
    //所以这里不用三连环存储数据，只是存储成功
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        //这里函数执行会返回一个promise
        if(result.code == 200){
            //成功时返回一个非空字符串就行
            return "Ok"
        }else{
            //失败时
            return Promise.reject(new Error('false'))
            //这样就可以返回promise的成功与失败信息
        }
    }
}
//简化数据
const getters = {
  categoryView(state){
      //不能直接这么返回，因为初始是空对象，所以没有这个View，所以会返回undefined出错
      //因此需要加上或者
      return state.goodInfo.categoryView||{}
  },
  skuInfo(state){
      return state.goodInfo.skuInfo||{}
  },
  spuSaleAttrList(state){
      return state.goodInfo.spuSaleAttrList||[]
  }
}
export default{
    state,
    mutations,
    actions,
    getters
}