//对于axios进行二次封装
import axios from "axios"
//引入进度条
import nprogress from "nprogress"
//引入进度条样式
import "nprogress/nprogress.css"
//start方法代表进度条开始，done方法代表进度条结束

//1：利用axios对象方法create，去创建一个axios实例
//2.request就是axios
const requests = axios.create({
    //配置对象
    //基础路径
    baseURL:"/mock",
    //代表请求超时时间
    timeout:5000,
})
//请求拦截器：在发请求之前，请求拦截器可以拦截到
requests.interceptors.request.use((config)=>{
    //config是一个配置对象，对象里面有个属性很重要，header请求头
    //进度条开始
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //服务器成功的回调函数，服务器响应数据都回来以后，响应拦截器可以检测到
    //进度条结束
    nprogress.done()
    return res.data
},(err)=>{    
    //响应失败的回调函数
    return Promise.reject(new Error('failed'))
})


//对外暴露
export default requests
