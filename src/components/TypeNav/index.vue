<template>
  <div class="type-nav">
  <div class="container">
      <!--事件委派|事件代理-->
    <div  @mouseleave="leaveShow" @mouseenter="enterShow"><!--这样鼠标移到h2也是好使的-->
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
        <!--三级联动-->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch"><!--事件的委派和编程式导航-->
              <div class="item" v-for="(c1,index) in categoryList.slice(0,16)" :key="c1.categoryId" :class="{cur:currentIndex===index}">
                <h3 @mouseenter="changeIndex(index)">
                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <!--二级三级分类-->
                <div class="item-list clearfix" :style="{display:currentIndex === index?'block':'none'}">
                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                        <dl class="fore">
                            <dt>
                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                            </dt>
                            <dd>
                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                </em>
                            </dd>
                        </dl>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
    </div>
    <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
    </nav>
    
  </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
//引入方式：是把lodash全部功能 函数引入
//import _ from 'lodash'
import throttle from 'lodash/throttle'//部分引入＋默认暴露
export default {
  name:'TypeNav',
  data(){
      return{
          //存储用户鼠标在那个一级分类上
          currentIndex:-1,
          show:true
      }
  },
  //组件挂在完毕：可以向服务器发请求
  mounted(){
      //通过Vuex发请求，获取数据，存储于仓库中
      //放在app中了，可以优化
      //this.$store.dispatch('getcategoryList')
      //从主页进入搜索页面时又会重新挂载一次
      if(this.$route.path != '/home'){
          this.show = false
      }
  },
  computed:{
      /*categoryList(){
          return this.$store.state.home.categoryList
      }*/
      ...mapState({
          //右侧是一个函数，当使用这个计算属性时右侧函数会立即执行一次
          //注入一个参数state，其实即为大仓库中的数据
          categoryList:(state)=>{
              return state.home.categoryList
          }
      })
  },
  methods:{
      //鼠标进入，修改currentIndex属性
      changeIndex://index是一级分类的索引值
      //非正常情况，用户操作过快，只有部分触发事件
      //throttle函数不要用箭头函数，可能会出现上下文this问题
        throttle(function(index){
          this.currentIndex = index
        },50),
      leaveIndex(){
          this.currentIndex = -1
      },
      goSearch(event){
        //怎么确定点击的是a标签？
        //加上自定义属性data-categgoryName，其余子节点是没有的
        let element = event.target
        //获取当前触发这个事件的节点
        //节点有一个属性dataset属性，可以获取节点的自定义属性和属性值
        let {categoryname , category1id, category2id, category3id} = element.dataset
        if(categoryname){
            //整理路由跳转的参数
            let location ={name:'Search'}
            let query = {categoryName:categoryname}
            if(category1id){
                query.category1Id=category1id
            }else if(category2id){
                query.category2Id=category2id
            }else{
                query.category3Id=category3id
            }
            //添加判断当路由器跳转时如果在输入框中输入了，即传递了params参数，也得传入
            if(this.$route.params){
                location.params = this.$route.params
            }
            //整理完参数，放入location中
            location.query = query
            //路由跳转
            this.$router.push(location)
        }
      },
      enterShow(){
          this.show = true
      },
      leaveShow(){
          //得加判断，要不然主页也没了
          if(this.$route.path != "/home"){
            this.show = false
          }
          this.currentIndex = -1
      }
  }
}
</script>

<style scoped lang="less">
  .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        /*&:hover {
                            .item-list {
                                display: block;
                            }
                        }*/
                    }

                    .cur{
                        background-color: skyblue;
                    }
                }
            }
            //进入的开始状态
            .sort-enter{
                opacity: 0;
            }
            .sort-enter-to{
                opacity: 1;
            }
            .sort-enter-active{
                transition: all .5s linear;
            }
        }
  }
</style>