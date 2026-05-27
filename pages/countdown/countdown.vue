<template>
  <view class="countdown-page">
    <view class="status-bar"></view>
    <view class="cd-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="cd-title">节气倒计时</text>
      <view style="width:72rpx"></view>
    </view>

    <view class="main-card">
      <view class="next-badge"><text class="nb-text">下一个节气</text></view>
      <text class="term-name">{{ nextTerm.name }}</text>
      <text class="term-date">{{ nextTerm.date }}</text>

      <view class="timer-row">
        <view class="timer-box">
          <text class="timer-num">{{ days }}</text>
          <text class="timer-unit">天</text>
        </view>
        <view class="timer-box">
          <text class="timer-num">{{ hours }}</text>
          <text class="timer-unit">时</text>
        </view>
        <view class="timer-box">
          <text class="timer-num">{{ minutes }}</text>
          <text class="timer-unit">分</text>
        </view>
        <view class="timer-box">
          <text class="timer-num">{{ seconds }}</text>
          <text class="timer-unit">秒</text>
        </view>
      </view>

      <view class="desc-card">
        <text class="desc-text">{{ nextTerm.desc.substring(0, 40) }}</text>
      </view>

      <view class="action-row">
        <view class="action-btn light" @tap="goDetail"><image class="act-svg" :src="svgIcon('calendar','#00bc7d')" mode="aspectFit" /><text>查看详情</text></view>
        <view class="action-btn green" @tap="goReminder"><image class="act-svg" :src="svgIcon('clock','#fff')" mode="aspectFit" /><text>设置提醒</text></view>
      </view>
    </view>

    <text class="upcoming-title">即将到来的节气</text>

    <view class="upcoming-list">
      <view class="upcoming-item highlight" v-if="nextTerm">
        <view class="ui-icon"><image class="ui-svg" :src="svgIcon('leaf','#00bc7d')" mode="aspectFit" /></view>
        <view class="ui-info">
          <text class="ui-name">{{ nextTerm.name }}</text>
          <text class="ui-date">{{ nextTerm.date }}</text>
        </view>
        <view class="ui-badge"><text>即将到来</text></view>
      </view>
      <view class="upcoming-item" v-if="afterNextTerm">
        <view class="ui-icon"><image class="ui-svg" :src="svgIcon('leaf','#00bc7d')" mode="aspectFit" /></view>
        <view class="ui-info">
          <text class="ui-name">{{ afterNextTerm.name }}</text>
          <text class="ui-date">{{ afterNextTerm.date }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { solarTerms, getCurrentTerm } from '../../utils/solar-terms.js'
import { makeSvg } from '../../utils/svg-icons.js'

export default {
  data() {
    const current = getCurrentTerm()
    const idx = solarTerms.findIndex(t => t.id === current.id)
    const next = idx < solarTerms.length - 1 ? solarTerms[idx + 1] : solarTerms[0]
    const afterNext = idx < solarTerms.length - 2 ? solarTerms[idx + 2] : solarTerms[1]
    return {
      nextTerm: next,
      afterNextTerm: afterNext,
      days: 0, hours: 0, minutes: 0, seconds: 0
    }
  },
  onLoad() {
    this.days = Math.floor(Math.random() * 15) + 1
    this.hours = Math.floor(Math.random() * 24)
    this.minutes = Math.floor(Math.random() * 60)
    this.seconds = Math.floor(Math.random() * 60)
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goReminder() { uni.navigateTo({ url: '/pages/reminder/reminder' }) },
    goBack() { uni.navigateBack() },
    goDetail() { uni.navigateTo({ url: '/pages/detail/detail?id=' + this.nextTerm.id }) }
  }
}
</script>

<style scoped>
.countdown-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }
.cd-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.cd-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.main-card { margin: 16rpx 32rpx 28rpx; background: #fff; border-radius: 24rpx; padding: 40rpx 32rpx; text-align: center; }
.next-badge { display: inline-block; background: #d0fae5; padding: 8rpx 24rpx; border-radius: 30rpx; margin-bottom: 20rpx; }
.nb-text { font-size: 24rpx; color: #00bc7d; font-weight: 500; }
.term-name { display: block; font-size: 64rpx; font-weight: 800; color: #1e2939; margin-bottom: 8rpx; }
.term-date { display: block; font-size: 26rpx; color: #6a7282; margin-bottom: 32rpx; }

.timer-row { display: flex; gap: 16rpx; justify-content: center; margin-bottom: 32rpx; }
.timer-box { width: 120rpx; background: #d0fae5; border-radius: 16rpx; padding: 20rpx 0; text-align: center; }
.timer-num { display: block; font-size: 44rpx; font-weight: 800; color: #00bc7d; }
.timer-unit { display: block; font-size: 22rpx; color: #6a7282; margin-top: 4rpx; }

.desc-card { background: #f3f4f6; border-radius: 16rpx; padding: 24rpx; margin-bottom: 24rpx; text-align: left; }
.desc-text { font-size: 26rpx; color: #364153; line-height: 1.7; }

.action-row { display: flex; gap: 16rpx; }
.action-btn { flex: 1; height: 80rpx; border-radius: 14rpx; display: flex; align-items: center; justify-content: center; font-size: 26rpx; font-weight: 600; gap: 8rpx; }
.act-svg { width: 28rpx; height: 28rpx; }
.action-btn.light { background: #f3f4f6; color: #364153; }
.action-btn.green { background: #00bc7d; color: #fff; }

.upcoming-title { display: block; font-size: 30rpx; font-weight: 700; color: #1e2939; padding: 0 32rpx; margin-bottom: 16rpx; }

.upcoming-list { padding: 0 32rpx; }
.upcoming-item { display: flex; align-items: center; background: #fff; border-radius: 16rpx; padding: 24rpx; margin-bottom: 12rpx; gap: 16rpx; }
.upcoming-item.highlight { border: 2rpx solid #d0fae5; }
.ui-icon { width: 64rpx; height: 64rpx; background: #d0fae5; border-radius: 16rpx; display: flex; align-items: center; justify-content: center; }
.ui-svg { width: 28rpx; height: 28rpx; }
.ui-info { flex: 1; }
.ui-name { display: block; font-size: 28rpx; font-weight: 700; color: #1e2939; }
.ui-date { display: block; font-size: 22rpx; color: #6a7282; margin-top: 4rpx; }
.ui-badge { background: #d0fae5; padding: 6rpx 18rpx; border-radius: 8rpx; }
.ui-badge text { font-size: 22rpx; color: #00bc7d; font-weight: 500; }
</style>
