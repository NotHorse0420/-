<template>
  <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <span>请</span>
                            <!--声明式导航，先务必要有to属性-->
                            <router-link to="/login">登录</router-link>
                            <router-link class="register" to="/register">免费注册</router-link>
                        </p>
                        <!--登陆成功-->
                        <p v-else>
                            <a>{{userName}}</a>
                            <a class="register" @click="logout">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center/myorder">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" title="尚品汇" to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
  name:'Header',
  data(){
      return{
          keyword:''
      }
  },
  methods:{
      //搜索按钮的回调函数
      goSearch(){
          //判断如果传递了query参数，也给他合并到一起
          if(this.$route.query){
              let location = {name:'Search',params:{keyword:this.keyword || undefined}}
              location.query = this.$route.query
              this.$router.push(location)
          }
          
          //后面传递的两次函数，是成功和失败的回调
          /*this.$router.push({
            name:'Search',
            params:{k:this.keyword}
          })*/
          //this.$router.push({name:'Search',params:{keyword:this.keyword.toUpperCase},query:{k:this.keyword}})
      },
      async logout(){
          //退出登录
          //发请求，所有都要清除
          //后台的需要接口发请求删除，前台的localstorage什么的也要清除
          try {
              //如果成功
              await this.$store.dispatch("userLogout")
              this.$router.push('/home')
          } catch (error) {

          }
      }
  },
  mounted(){
      //通过全局事件总线清除关键字
      this.$bus.$on("clear",()=>{
          this.keyword = ''
      })
  },
  computed:{
      userName(){
          if(this.$store.state.user.userInfo != null){
            return this.$store.state.user.userInfo.name
          }else{
              return ''
          }
      }
  }
}
</script>

<style scoped lang="less">
  .header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
  }
</style>