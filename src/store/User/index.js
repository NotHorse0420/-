import { reqGetCode,reqUserLogin,reqUserRegister,reqUserInfo,reqLogout } from "@/api"

import { setToken,getToken,removeToken } from "@/utils/token"

//登录和注册的模块
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    USERLOGOUT(state){
        state.token = ''
        removeToken()
        state.userInfo={}
    }
}
const actions = {
    //获取验证码
    async getCode({commit},phone){
        //获取验证码这个接口会把验证码返回
        //一般是发到手机上
       let result = await reqGetCode(phone)
       if(result.code==200){
           commit("GETCODE",result.data)
           return "Ok"
       }else{
           return Promise.reject(new Error('faile'))
       }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            console.log(result)
          return "Ok"
        }else{
           return Promise.reject(new Error('faile'))
        }
    },
    //用户登录[token]
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        //服务器下发的token,用户的唯一标识符
        if(result.code == 200){
            commit("USERLOGIN",result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return "Ok"
        }else{
            return Promise.reject(new Error("faile"))
        } 
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result =await reqUserInfo()
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return "Ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
        //这里把如果请求不成功的回调删除了
        //因为如果没有用户信息，这里就会出现报错
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code == 200){
            commit("USERLOGOUT")
            return "Ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    }
}
const getters = {}

export default{
    state,
    mutations,
    actions,
    getters
}