<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name:'Carousel',
  props:['list'],
  data(){
      return{
          name:this.ref
      }
  },
  watch:{
      bannerList:{
          //为了让floor中检测到数据变化
          immediate:true,
          //这还得保证v-for执行结束
          //使用nextTick
          handler(){
              //变成全局组件后，还是用了setTimeout
            setTimeout(() => {
              var mySwiper = new Swiper(
                this.$refs.mySwiper,{
                  loop:true,
                  //如果需要分页器
                  pagination:{
                    el:".swiper-pagination",
                    clickable:true,
                  },
                  navigation:{
                    nextEl:".swiper-button-next",
                    prevEl:".swiper-button-prev"
                  },
                })
            },500)
          }
      }
  }
}
</script>

<style>

</style>