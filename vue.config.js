const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{//服务器之间没有跨域问题，浏览器有。路径当中有api这样的请求时
        target:'http://gmall-h5-api.atguigu.cn',
        //pathRewrite:{'^/api':''},
      }
    }
  }
})
