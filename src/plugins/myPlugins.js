//自定义插件
//vue插件一定暴露一个对象
let myPlugins = {}

myPlugins.install = function(Vue){
    console.log('调用')
}

export default myPlugins