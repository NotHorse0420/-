//引入mock
import Mock from 'mockjs'
//没有对外暴露去可以引入，把json引入
//图片和json文件默认对外暴露
import banner from './banner.json'
import floor from './floor.json'

//mock数据,第一个参数是请求的地址，第二个参数是请求的数据
Mock.mock("/mock/banner",{code:200,data:banner})//模拟首页轮播图的数据，200表示成功
Mock.mock("/mock/floor",{code:200,data:floor})//模拟首页的数据，200表示成功