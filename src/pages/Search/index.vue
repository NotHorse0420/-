<template>
  <div>
    <!--商品分类三级列表-->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑，带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--分类的面包屑-->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!--关键字的面包屑-->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!--品牌的面包屑-->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTradeMark">×</i></li>
            <!--售卖属性面包屑-->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo = "trademarkInfo" @attrInfo = "attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!--排序的结构-->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合
                    <span v-show="isOne&&isAsc">⬆</span>
                    <span v-show="isOne&&isDesc">⬇</span>
                  </a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格
                    <span v-show="isTwo&&isAsc">⬆</span>
                    <span v-show="isTwo&&isDesc">⬇</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!--销售商品列表-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg" /></router-link>
                    <!--模板字符串写法``，如果要传入动态数据，就需要${}-->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${good.id}`" title="x">{{good.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页器-->
          <pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapState} from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',
    components: {
      SearchSelector
    },
    data(){
      return{
        searchParams:{
          category1Id:'',//一级分类
          category2Id:'',//二级分类
          category3Id:'',//三级分类
          categoryName:'',//分类名字
          keyword:'',//关键字
          order:'2:asc',//排序
          pageNo: 1,//分页器使用
          pageSize: 3,//一页展示的数量
          props:[],//售卖商品的属性
          trademark:'',
        }
      }
    },
    beforeMount(){
      //Object.assign:es6语法
      //在发请求之前将接口的传递参数，进行整理
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted(){
      //在发送请求之前带给服务器参数
      this.getData()
    },
    computed:{
      //传递的数组
      ...mapGetters(['goodsList']),
      isOne(){
        return this.searchParams.order.indexOf('1')!=-1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2')!=-1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc')!=-1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc')!=-1
      },
      //获取search模块展示产品一共多少
      ...mapState({
        total:state=>state.search.searchList.total
      })
    },
    methods:{
      getData(){
        this.$store.dispatch("getSearchList",this.searchParams)
      },
      removeCategoryName(){
        //不用置空，直接传入undefined
        this.searchParams.categoryName = undefined;
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        this.getData()
        //地址栏也需要修改,自己跳转自己
        //不能连params参数一起删掉
        if(this.$route.params){
          this.$router.push({name:'Search',params:this.$route.params})
        }
      },
      removeKeyword(){
        this.searchParams.keyword = undefined
        //修改完数据需要再次发请求,这里不需要发请求，此时更新的keyword会被watch监听中的整合给整合起来
        //整合完会被发现修改，就会重新发送请求
        //this.getData()
        //通知兄弟组件header清楚关键字
        this.$bus.$emit("clear")
        if(this.$route.query){
          this.$router.push({name:'Search',query:this.$route.query})
        }
      },
      removeTradeMark(){
        this.searchParams.trademark = undefined
        this.getData()
      },
      //删除数组元素，需要传值
      removeAttr(index){
        this.searchParams.props.splice(index,1)
        this.getData()
      },
      trademarkInfo(trademark){
        //整理参数
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`//es6语法
        //再次发请求
        this.getData()
      },
      //收集属性值，自定义事件
      attrInfo(attr,attrValue){
        let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
        //数组去重,如果没有这个元素再加
        if(this.searchParams.props.indexOf(props)==-1){
          this.searchParams.props.push(props)
        }
        //再次发请求
        this.getData()
      },
      //点击排序操作
      changeOrder(flag){
        let originFlag = this.searchParams.order.split(":")[0]
        let originSort = this.searchParams.order.split(":")[1]
        if(originFlag===flag){
            this.searchParams.order=`${originFlag}:${originSort=="desc"?"asc":"desc"}`
        }else{
          this.searchParams.order=`${flag}:${'desc'}`
        }
      },
      getPageNo(pageNo){
        //整理服务器参数
        this.searchParams.pageNo = pageNo
        //再次发服务器请求
        this.getData()
      }
    },
    watch:{
      //监听路由信息，因为输入框传入的参数以及点击typenav的参数都会传入到路由中
      $route(newValue,oldValue){
        //因为参数整理只在mount那整理过一次，因此在这里还需要再整理参数
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        //再次发起ajax请求
                //但是再请求完毕后应该将之前的分类中的一二三级id置空
        this.searchParams.category1Id = ''
        this.searchParams.category2Id = ''
        this.searchParams.category3Id = ''
        this.getData()
      }
    }  
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>