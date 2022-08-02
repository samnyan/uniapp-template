<template>
  <view class="content">
    <swiper class="swiper" circular :indicator-dots="swiperConfig.indicatorDots" :autoplay="swiperConfig.autoplay"
      :interval="swiperConfig.interval" :duration="swiperConfig.duration">
      <swiper-item>
        <image v-if="imgUrl" mode="aspectFill" :src="imgUrl">
        </image>
      </swiper-item>
    </swiper>
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="pinia-example">
      <button @click="decreaseNumber">-</button>
      <button @click="increaseNumber">+</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import request from '../../utils/request'

const swiperConfig = reactive({
  indicatorDots: true,
  autoplay: true,
  interval: 3000,
  duration: 500,
})

const title = ref<string>('Hello')
const imgUrl = ref<string>()

onLoad(async () => {
  const res = await request.get<any>('https://api.vvhan.com/api/bing?type=json')
  if (res.success) {
    imgUrl.value = res.imgurl
  }
})

const conter = ref<number>(0)

const increaseNumber = () => {
  conter.value++
}
const decreaseNumber = () => {
  conter.value--
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.swiper {
  width: 100%;
  height: 450rpx;
  background-color: black;
}

.swiper-item {
  display: block;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.pinia-example {
  display: flex;
}
</style>
