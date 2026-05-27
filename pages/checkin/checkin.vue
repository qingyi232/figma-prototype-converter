<template>
  <view class="checkin-page">
    <view class="status-bar"></view>

    <view class="ck-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="ck-title">节气打卡</text>
      <view style="width:72rpx"></view>
    </view>

    <!-- 顶部连续打卡卡片 -->
    <view class="streak-banner">
      <view class="sb-trophy">
        <image class="sb-tr-svg" :src="svgIcon('trophy','#fff')" mode="aspectFit" />
      </view>
      <text class="sb-label">连续打卡</text>
      <view class="sb-num-row">
        <text class="sb-num">{{ streakDays }}</text>
        <text class="sb-day">天</text>
      </view>
      <text class="sb-hint">坚持打卡，记录节气与你的故事</text>
    </view>

    <!-- 今日节气卡片 -->
    <view class="today-card">
      <view class="tc-info">
        <view class="tc-tag"><text>今日节气</text></view>
        <text class="tc-name">{{ currentTerm.name }}</text>
        <text class="tc-date">{{ currentTerm.date }}</text>
        <text class="tc-desc">{{ currentTerm.desc.substring(0, 28) }}</text>
      </view>
      <view class="tc-icon">
        <image class="tc-svg" :src="termIconSvg(currentTerm)" mode="aspectFit" />
      </view>
    </view>

    <!-- 打卡按钮 -->
    <view class="checkin-action">
      <view :class="['ck-btn', { done: checkedIn }]" @tap="doCheckin">
        <image v-if="checkedIn" class="ck-btn-svg" :src="svgIcon('check','#fff')" mode="aspectFit" />
        <text class="ck-btn-text">{{ checkedIn ? '已打卡' : '立即打卡' }}</text>
      </view>
    </view>

    <!-- 打卡记录 -->
    <view class="record-section">
      <view class="rs-title-row">
        <text class="rs-title">打卡记录</text>
        <text class="rs-count">{{ records.length }} 次</text>
      </view>
      <view class="record-list">
        <view class="record-item" v-for="(r, i) in records" :key="i">
          <view class="ri-icon" :style="{ background: r.bgColor }">
            <image class="ri-svg" :src="svgIcon('check', r.color)" mode="aspectFit" />
          </view>
          <view class="ri-info">
            <text class="ri-name">{{ r.term }}</text>
            <text class="ri-date">{{ r.date }}</text>
          </view>
          <view class="ri-points">
            <text class="ri-pt-text">+{{ r.points }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg, termIconSvg } from '../../utils/svg-icons.js'
import { getCurrentTerm } from '../../utils/solar-terms.js'

export default {
  data() {
    const ct = getCurrentTerm()
    return {
      currentTerm: ct,
      today: new Date().toISOString().substring(0, 10),
      checkedIn: false,
      streakDays: 7,
      records: [
        { date: '2026-04-29', term: ct.name, color: '#00bc7d', bgColor: '#d0fae5', points: 10 },
        { date: '2026-04-28', term: ct.name, color: '#00bc7d', bgColor: '#d0fae5', points: 10 },
        { date: '2026-04-27', term: ct.name, color: '#00bc7d', bgColor: '#d0fae5', points: 10 },
        { date: '2026-04-26', term: ct.name, color: '#00bc7d', bgColor: '#d0fae5', points: 10 },
        { date: '2026-04-25', term: ct.name, color: '#00bc7d', bgColor: '#d0fae5', points: 10 }
      ]
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    termIconSvg(t) { return termIconSvg(t) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.switchTab({ url: '/pages/index/index' })
    },
    doCheckin() {
      if (this.checkedIn) return
      this.checkedIn = true
      this.streakDays++
      this.records.unshift({ date: this.today, term: this.currentTerm.name, color: '#00bc7d', bgColor: '#d0fae5', points: 10 })
      uni.showToast({ title: '打卡成功！+10积分', icon: 'success' })
    }
  }
}
</script>

<style scoped>
.checkin-page { background: linear-gradient(180deg, #fff7ed 0%, #fff 25%); min-height: 100vh; padding-bottom: 80rpx; }
.status-bar { height: 44px; }

.ck-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.ck-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.streak-banner { margin: 16rpx 32rpx; background: linear-gradient(135deg, #ff6900 0%, #f54900 100%); border-radius: 24rpx; padding: 36rpx 28rpx; color: #fff; text-align: center; box-shadow: 0 8rpx 32rpx rgba(255,105,0,0.25); }
.sb-trophy { width: 100rpx; height: 100rpx; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 14rpx; }
.sb-tr-svg { width: 48rpx; height: 48rpx; }
.sb-label { display: block; font-size: 24rpx; opacity: 0.9; margin-bottom: 8rpx; }
.sb-num-row { display: flex; justify-content: center; align-items: baseline; gap: 8rpx; margin-bottom: 8rpx; }
.sb-num { font-size: 84rpx; font-weight: 800; line-height: 1; }
.sb-day { font-size: 28rpx; opacity: 0.85; }
.sb-hint { display: block; font-size: 22rpx; opacity: 0.85; }

.today-card { margin: 16rpx 32rpx 24rpx; background: #fff; border-radius: 20rpx; padding: 28rpx; display: flex; align-items: center; gap: 16rpx; }
.tc-info { flex: 1; }
.tc-tag { padding: 4rpx 14rpx; background: #d0fae5; border-radius: 20rpx; display: inline-flex; margin-bottom: 8rpx; }
.tc-tag text { font-size: 20rpx; font-weight: 600; color: #047857; }
.tc-name { display: block; font-size: 36rpx; font-weight: 800; color: #1e2939; margin-bottom: 4rpx; }
.tc-date { display: block; font-size: 22rpx; color: #6a7282; margin-bottom: 8rpx; }
.tc-desc { display: block; font-size: 24rpx; color: #4a5565; line-height: 1.5; }
.tc-icon { width: 90rpx; height: 90rpx; border-radius: 22rpx; background: #d0fae5; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.tc-svg { width: 44rpx; height: 44rpx; }

.checkin-action { padding: 0 32rpx; margin-bottom: 32rpx; }
.ck-btn { display: flex; align-items: center; justify-content: center; gap: 10rpx; height: 96rpx; border-radius: 48rpx; background: linear-gradient(135deg, #ff6900 0%, #f54900 100%); box-shadow: 0 8rpx 24rpx rgba(255,105,0,0.3); }
.ck-btn.done { background: linear-gradient(135deg, #00bc7d 0%, #059669 100%); box-shadow: 0 8rpx 24rpx rgba(0,188,125,0.3); }
.ck-btn-svg { width: 32rpx; height: 32rpx; }
.ck-btn-text { font-size: 30rpx; font-weight: 600; color: #fff; }

.record-section { margin: 0 32rpx; }
.rs-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx; }
.rs-title { font-size: 28rpx; font-weight: 700; color: #1e2939; }
.rs-count { font-size: 24rpx; color: #6a7282; }
.record-list { background: #fff; border-radius: 20rpx; padding: 8rpx 24rpx; }
.record-item { display: flex; align-items: center; gap: 16rpx; padding: 20rpx 0; border-bottom: 1rpx solid #f3f4f6; }
.record-item:last-child { border-bottom: none; }
.ri-icon { width: 56rpx; height: 56rpx; border-radius: 14rpx; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ri-svg { width: 28rpx; height: 28rpx; }
.ri-info { flex: 1; }
.ri-name { display: block; font-size: 28rpx; font-weight: 600; color: #1e2939; }
.ri-date { display: block; font-size: 22rpx; color: #6a7282; margin-top: 4rpx; }
.ri-points { background: #fef3c6; padding: 6rpx 14rpx; border-radius: 8rpx; }
.ri-pt-text { font-size: 22rpx; font-weight: 700; color: #92400e; }
</style>
