<template>
  <view class="weather-page">
    <view class="status-bar"></view>
    <view class="wt-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <view class="wt-center">
        <text class="wt-city">南京市</text>
        <text class="wt-update">15:30 更新</text>
      </view>
      <view style="width:72rpx"></view>
    </view>

    <view class="current-card">
      <view class="cc-row">
        <view class="cc-left">
          <text class="cc-temp">18°</text>
          <text class="cc-desc">多云</text>
          <text class="cc-feel">体感温度 16°</text>
          <text class="cc-range">22° / 12°</text>
        </view>
        <view class="cc-icon"><image class="cc-icon-svg" :src="svgIcon('cloud','#fff')" mode="aspectFit" /></view>
      </view>
      <view class="cc-term">
        <image class="ct-icon-svg" :src="svgIcon('leaf','#00bc7d')" mode="aspectFit" />
        <text class="ct-text">今日{{ currentTerm.name }}，玄鸟至</text>
      </view>
    </view>

    <view class="section">
      <text class="section-title">24小时预报</text>
      <view class="hourly-row">
        <view class="hourly-item" v-for="(h, i) in hourlyForecast" :key="i">
          <text class="hi-time">{{ h.time }}</text>
          <image class="hi-svg" :src="weatherSvg(h.desc || h.icon)" mode="aspectFit" />
          <text class="hi-temp">{{ h.temp }}°</text>
          <text class="hi-rain" style="color:#00bc7d">{{ h.rain }}</text>
        </view>
      </view>
    </view>

    <view class="section">
      <text class="section-title">7天预报</text>
      <view class="daily-list">
        <view class="daily-item" v-for="(d, i) in dailyForecast" :key="i">
          <text class="di-day">{{ d.day }}</text>
          <text class="di-date">{{ d.date }}</text>
          <image class="di-svg" :src="weatherSvg(d.desc)" mode="aspectFit" />
          <text class="di-desc">{{ d.desc }}</text>
          <text class="di-temp">{{ d.high }}° {{ d.low }}°</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getCurrentTerm } from '../../utils/solar-terms.js'
import { makeSvg } from '../../utils/svg-icons.js'

export default {
  data() {
    return {
      currentTerm: getCurrentTerm(),
      hourlyForecast: [
        { time: '16:00', icon: '', temp: 18, rain: '10%' },
        { time: '17:00', icon: '', temp: 17, rain: '15%' },
        { time: '18:00', icon: '', temp: 16, rain: '30%' },
        { time: '19:00', icon: '', temp: 15, rain: '45%' },
        { time: '20:00', icon: '', temp: 14, rain: '20%' }
      ],
      dailyForecast: [
        { day: '今天', date: '03/31', icon: '', desc: '多云', high: 22, low: 12 },
        { day: '明天', date: '04/01', icon: '', desc: '小雨', high: 20, low: 11 },
        { day: '周四', date: '04/02', icon: '', desc: '阴', high: 18, low: 10 },
        { day: '周五', date: '04/03', icon: '', desc: '晴', high: 21, low: 12 },
        { day: '周六', date: '04/04', icon: '', desc: '多云', high: 23, low: 13 }
      ]
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    weatherSvg(desc) {
      if (!desc) return makeSvg('cloud', '#6a7282')
      if (desc.includes('晴')) return makeSvg('thermometer', '#f59e0b')
      if (desc.includes('雨')) return makeSvg('cloud', '#0ea5e9')
      return makeSvg('cloud', '#6a7282')
    },
    goBack() { uni.navigateBack() }
  }
}
</script>

<style scoped>
.weather-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }
.wt-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.wt-center { text-align: center; }
.wt-city { display: block; font-size: 30rpx; font-weight: 700; color: #1e2939; }
.wt-update { display: block; font-size: 22rpx; color: #99a1af; }

.current-card { margin: 16rpx 32rpx 24rpx; background: #fff; border-radius: 20rpx; padding: 28rpx; }
.cc-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20rpx; }
.cc-temp { display: block; font-size: 80rpx; font-weight: 300; color: #0a0a0a; line-height: 1; }
.cc-desc { display: inline; font-size: 30rpx; color: #0a0a0a; margin-left: 8rpx; }
.cc-feel { display: block; font-size: 24rpx; color: #6a7282; margin-top: 8rpx; }
.cc-range { display: block; font-size: 24rpx; color: #6a7282; }
.cc-icon { width: 100rpx; height: 100rpx; background: #d0fae5; border-radius: 24rpx; display: flex; align-items: center; justify-content: center; }
.cc-term { display: flex; align-items: center; gap: 10rpx; background: #d0fae5; border-radius: 12rpx; padding: 16rpx 20rpx; }
.cc-icon-svg { width: 56rpx; height: 56rpx; }
.ct-icon-svg { width: 24rpx; height: 24rpx; }
.ct-text { font-size: 24rpx; color: #007a55; font-weight: 500; }

.section { padding: 0 32rpx; margin-bottom: 28rpx; }
.section-title { display: block; font-size: 30rpx; font-weight: 700; color: #1e2939; margin-bottom: 16rpx; }

.hourly-row { display: flex; gap: 8rpx; background: #fff; border-radius: 16rpx; padding: 20rpx 16rpx; }
.hourly-item { flex: 1; text-align: center; display: flex; flex-direction: column; gap: 10rpx; align-items: center; }
.hi-time { font-size: 22rpx; color: #6a7282; }
.hi-svg { width: 36rpx; height: 36rpx; }
.hi-temp { font-size: 26rpx; font-weight: 600; color: #1e2939; }
.hi-rain { font-size: 20rpx; }

.daily-list { background: #fff; border-radius: 16rpx; overflow: hidden; }
.daily-item { display: flex; align-items: center; padding: 24rpx; border-bottom: 1rpx solid #f3f4f6; }
.daily-item:last-child { border-bottom: none; }
.di-day { width: 80rpx; font-size: 26rpx; font-weight: 600; color: #1e2939; }
.di-date { width: 100rpx; font-size: 22rpx; color: #99a1af; }
.di-svg { width: 36rpx; height: 36rpx; }
.di-desc { flex: 1; font-size: 26rpx; color: #6a7282; }
.di-temp { font-size: 26rpx; color: #1e2939; font-weight: 500; }
</style>
