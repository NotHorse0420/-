//当前这个模块对所有api进行了统一管理
import requests from './request'
//先引入mock的axios
import mockRequests from './mockRequest'


//三级联动的接口
//api/product/getBaseCategoryList  get 无参数

/*export const reqCategoryList = ()=>{
    //发请求,axios发请求的返回结果是promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}*/
//简写
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})

//获取banner （Home首页轮播图接口）
export const reqGetBannerList = ()=>mockRequests.get('/banner')

//获取floor数据
export const reqGetFloorList = ()=>mockRequests.get('/floor')

//获取search数据 地址：/api/list 请求方式：POST 参数：需要十个
//当前接口给服务器传递的参数(任意)，至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:"post",data:params})

//获取商品详情
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})
//这个数据接口被改得很厉害
//export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车中，获取产品的个数
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车页面的数据
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})

//删除购物产品的接口
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品选中状态
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'}) 

//获取验证码的接口
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册用户，接口没有求传参，但是需要将用户的姓名，密码和验证码传输过去
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data:data,method:'post'})

//登录接口
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})

//拿着token找服务器拿用户信息
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取支付信息
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//查询订单请况
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取订单列表
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})