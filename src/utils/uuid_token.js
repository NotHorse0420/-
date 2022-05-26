import {v4 as uuidv4} from 'uuid'
//生成一个随机字符串，不能变，且持久存储
export const getUUID=()=>{
  //先从本地存储获取
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if(!uuid_token){
      //如果没有就生成一次
      uuid_token = uuidv4()
      //存储一次
      localStorage.setItem('UUIDTOKEN',uuid_token)
      console.log("ok")
  }
  return uuid_token
}