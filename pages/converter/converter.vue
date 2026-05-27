<template>
  <view class="converter-page">
    <view class="status-bar"></view>
    <view class="cv-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="cv-title">节气换算</text>
      <view style="width:72rpx"></view>
    </view>

    <!-- 公历选择卡片 -->
    <view class="date-card">
      <view class="dc-title-row">
        <image class="dc-svg" :src="svgIcon('calendar','#0092b8')" mode="aspectFit" />
        <text class="dc-label">选择公历日期</text>
      </view>
      <view class="date-pickers">
        <view class="dp-col">
          <text class="dp-label">年</text>
          <view class="dp-box"><text>2026</text></view>
        </view>
        <view class="dp-col">
          <text class="dp-label">月</text>
          <view class="dp-box"><text>03</text></view>
        </view>
        <view class="dp-col">
          <text class="dp-label">日</text>
          <view class="dp-box"><text>21</text></view>
        </view>
      </view>
      <view class="today-btn"><text class="today-text">今天</text></view>
    </view>

    <!-- 转换箭头 -->
    <view class="convert-arrow">
      <view class="arrow-circle">
        <image class="ar-svg" :src="convertSvg" mode="aspectFit" />
      </view>
    </view>

    <!-- 农历结果卡片 -->
    <view class="lunar-card">
      <view class="lunar-badge"><text>农历</text></view>
      <text class="lunar-date">2026年 三月 初六</text>
      <text class="lunar-hint">(示例数据，仅供参考)</text>
    </view>

    <!-- 本年节气一览 -->
    <text class="year-title">本年节气一览</text>
    <view class="term-grid">
      <view class="term-item" v-for="item in displayTerms" :key="item.id" :style="{ background: item.id === currentTermId ? '#d0fae5' : '#f9fafb' }">
        <text class="ti-name" :style="{ color: item.id === currentTermId ? '#00bc7d' : '#1e2939' }">{{ item.name }}</text>
        <text class="ti-date">{{ item.date }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'
import { solarTerms, getCurrentTerm } from '../../utils/solar-terms.js'
export default {
  data() {
    return {
      currentTermId: getCurrentTerm().id,
      displayTerms: solarTerms.slice(0, 12)
    }
  },
  computed: {
    convertSvg() {
      const path = `<path d='M7 10h10M7 10l4-4m-4 4 4 4M17 14H7m10 0-4-4m4 4-4 4'/>`
      return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>${path}</svg>`)}`
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.navigateTo({ url: '/pages/tools/tools' })
    }
  }
}
</script>

<style scoped>
.converter-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }
.cv-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 30rpx; color: #1e2939; font-weight: 700; }
.cv-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.date-card { margin: 16rpx 32rpx 0; background: #fff; border-radius: 24rpx; padding: 32rpx; }
.dc-title-row { display: flex; justify-content: center; align-items: center; gap: 8rpx; margin-bottom: 24rpx; }
.dc-svg { width: 28rpx; height: 28rpx; }
.dc-label { font-size: 28rpx; font-weight: 600; color: #1e2939; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.ar-svg { width: 36rpx; height: 36rpx; }
.date-pickers { display: flex; gap: 16rpx; margin-bottom: 20rpx; }
.dp-col { flex: 1; text-align: center; }
.dp-label { display: block; font-size: 24rpx; color: #6a7282; margin-bottom: 10rpx; }
.dp-box { background: #ecfeff; border-radius: 14rpx; padding: 18rpx 0; }
.dp-box text { font-size: 28rpx; color: #0092b8; font-weight: 600; }
.today-btn { background: #cefafe; border-radius: 14rpx; padding: 18rpx 0; text-align: center; }
.today-text { font-size: 28rpx; color: #0092b8; font-weight: 600; }

.convert-arrow { display: flex; justify-content: center; padding: 20rpx 0; }
.arrow-circle { width: 72rpx; height: 72rpx; border-radius: 50%; background: #0092b8; display: flex; align-items: center; justify-content: center; }
.arrow-circle text { font-size: 32rpx; color: #fff; }

.lunar-card { margin: 0 32rpx 28rpx; background: #fff7ed; border-radius: 24rpx; padding: 32rpx; text-align: center; }
.lunar-badge { display: inline-block; background: #f54900; padding: 6rpx 20rpx; border-radius: 8rpx; margin-bottom: 16rpx; }
.lunar-badge text { font-size: 22rpx; color: #fff; font-weight: 600; }
.lunar-date { display: block; font-size: 40rpx; font-weight: 800; color: #1e2939; margin-bottom: 8rpx; }
.lunar-hint { display: block; font-size: 22rpx; color: #99a1af; }

.year-title { display: block; font-size: 30rpx; font-weight: 700; color: #1e2939; padding: 0 32rpx; margin-bottom: 16rpx; }
.term-grid { display: grid; grid-template-columns: 1fr 1fr; padding: 0 32rpx; gap: 12rpx; }
.term-item { border-radius: 16rpx; padding: 20rpx 24rpx; }
.ti-name { display: block; font-size: 28rpx; font-weight: 700; }
.ti-date { display: block; font-size: 22rpx; color: #6a7282; margin-top: 4rpx; }
</style>
