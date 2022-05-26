import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api";

const actions = {
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return"Ok"
        }else{
            return Promise.reject(new Error("false"))
        }
    },
    async updateCartCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return "Ok"
        }else{
            return Promise.reject(new Error("false"))
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
        //上下文中含有dispatch
        //因为promise.all里面的参数是一个数组
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch("deleteCartListBySkuId",item.skuId):''
            //将每一次的promise放进去
            PromiseAll.push(promise)
        })
        //最红返回的是个成功或者失败的结果
        return Promise.all(PromiseAll)
    },
    checkAllCart({dispatch,getters},checked){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
           let promise = dispatch("updateCartCheckedById",{skuId:item.skuId,isChecked:checked})
           PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const state = {
    cartList:[]
}
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    },
}

export default{
    actions,
    mutations,
    state,
    getters
}