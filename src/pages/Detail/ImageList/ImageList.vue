<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="index">
        <img :src="slide.imgUrl" :class="{active:currentIndex==index}" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      changeCurrentIndex(index){
        this.currentIndex = index
        //通知兄弟组件
        this.$bus.$emit('getIndex',this.currentIndex)
      }
    },
    props:["skuImageList"],
    watch:{
      skuImageList(newValue,oldValue){
        this.$nextTick(()=>{
          new Swiper(this.$refs.cur,{
            //默认方向是水平
            //不需要循环
            //不需要分页器
            navigation:{
              nextEl:".swiper-button-next",
              prevEl:".swiper-button-prev"
            },
            //滚动条也不要
            //同时显示个数
            slidesPerView : 3,
            slidePerGroup : 1
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

//这个是通过css操作的
/*        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
*/
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>