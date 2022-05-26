//对外暴露一个将token存入localstorage的函数
//存储token
export const setToken = (token)=>{
    localStorage.setItem("TOKEN",token)
}
//获取token
export const getToken = ()=>{
    return localStorage.getItem("TOKEN")
} 
//清除token
export const removeToken = ()=>{
    localStorage.removeItem("TOKEN")
}
