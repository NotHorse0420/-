<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
          <!--勾选框-->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart,$event)">
          </li>
          <!--图片-->
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <!--价格-->
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <!--数量-->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <!--总价格-->
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.skuPrice}}</span>
          </li>
          <!--删除购买-->
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input 
          class="chooseAll" type="checkbox" 
          :checked="isAllChecked && cartInfoList.length>0" 
          @change="checkAllCart($event)"
        >
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllcheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：{{totalPrice}}</em>
          <i class="summoney"></i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import throttle from 'lodash/throttle'
  import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        this.$store.dispatch('getCartList')
      },
      //节流
      handler:throttle(async function(type,disNum,cart){
        switch(type){
          //加号
          case"add":
            //带给服务器变化的量
            disNum = 1
            break
          //减号
          case"minus":
            //得判断产品个数是否大于1
            disNum = cart.skuNum > 1? -1:0
            break
          case"change":
            if(isNaN(disNum) || disNum<1){
              disNum = 0
            }else{
              disNum = parseInt(disNum)-cart.skuNum
            }
            break
          //注意带给服务器的是变化的量
        }
        try{
        //派发action
          await this.$store.dispatch('addOrUpdateShopCart',{
            skuId:cart.skuId,
            skuNum:disNum
          })
          this.getData()
        }catch(error){
          error.message('')
        }
      },1000),
      //删除某一个商品
      deleteCartById(cart){
          try{
              this.$store.dispatch('deleteCartListBySkuId',cart.skuId)
              this.getData()
          }catch(error){
              alert(error.message)
          }
      },
      //更改勾选框属性
      async updateChecked(cart,event){
        try{
            //带给服务器的参数应该是0|1
            let checked = event.target.checked ? "1":"0"
            await this.$store.dispatch('updateCartCheckedById',{skuId:cart.skuId,isChecked:checked})
            this.getData()
        }catch(error){
          alert(error.message)
        }    
      },
      //删除全部选中的商品
      async deleteAllcheckedCart(){
        //这里没办法收集参数
        try {
          await this.$store.dispatch("deleteAllCheckedCart")
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      //全选框
      async checkAllCart(event){
        try{
          let checked = event.target.checked?"1":"0"
          await this.$store.dispatch("checkAllCart",checked)
          this.getData()
        }catch(error){
          alert(error.message)
        }
      }
    },
    computed:{
      ...mapGetters(['cartList']),
      //购物车数据
      cartInfoList(){
        return this.cartList.cartInfoList||[]
      },
      //计算所有的总价
      totalPrice(){
        let sum =0
        this.cartInfoList.forEach(item => {
            sum += item.skuNum*item.skuPrice
        });
        return sum
      },
      //是否全选
      isAllChecked(){
        //every函数，如果有一个不是真就是false如果全是真就是true
        return this.cartInfoList.every(item=>item.isChecked == 1)
      },
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>