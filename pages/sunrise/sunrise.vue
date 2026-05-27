<template>
  <view class="sunrise-page">
    <view class="status-bar"></view>

    <view class="sr-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="sr-title">日出日落</text>
      <view style="width:72rpx"></view>
    </view>

    <!-- 位置 -->
    <view class="location-bar">
      <view class="loc-left">
        <image class="loc-svg" :src="svgIcon('target','#00bc7d')" mode="aspectFit" />
        <text class="loc-text">北京市</text>
      </view>
      <text class="loc-change" style="color:#ff6900">更改位置</text>
    </view>

    <!-- 日落照片卡片 -->
    <view class="sunset-card">
      <image class="sunset-img" src="/static/sunrise/sunset.png" mode="aspectFill" />
      <view class="sunset-overlay">
        <text class="sunset-label">今日 · {{ currentTerm.name }}</text>
        <text class="sunset-desc">白昼渐长，春意盎然</text>
      </view>
    </view>

    <!-- 日出日落时间 -->
    <view class="time-card">
      <view class="time-row">
        <view class="time-item">
          <view class="time-icon-row">
            <image class="time-svg" :src="svgIcon('sunrise','#f97316')" mode="aspectFit" />
            <text class="time-label">日出</text>
          </view>
          <text class="time-value" style="color:#f97316">06:15</text>
        </view>
        <view class="time-item">
          <view class="time-icon-row">
            <image class="time-svg" :src="svgIcon('sunrise','#e5007a')" mode="aspectFit" />
            <text class="time-label">日落</text>
          </view>
          <text class="time-value" style="color:#e5007a">18:32</text>
        </view>
      </view>

      <view class="info-row">
        <view class="info-item">
          <text class="info-label">日照时长</text>
          <text class="info-val">12小时17分</text>
        </view>
        <view class="info-item">
          <text class="info-label">晨曦</text>
          <text class="info-val">05:48</text>
        </view>
        <view class="info-item">
          <text class="info-label">暮光</text>
          <text class="info-val">18:59</text>
        </view>
      </view>
    </view>

    <!-- 即刻推荐 -->
    <view class="recommend-card" @tap="goDetail">
      <image class="rec-svg" :src="svgIcon('leaf','#00bc7d')" mode="aspectFit" />
      <text class="rec-text">即刻推荐</text>
    </view>

    <!-- 未来7天 -->
    <text class="week-title">未来7天</text>
    <view class="week-list">
      <view class="week-item" :class="{ highlight: i === 0 }" v-for="(d, i) in weekData" :key="i">
        <view class="wi-left">
          <text class="wi-day">{{ d.day }}</text>
          <text class="wi-date">{{ d.date }}</text>
        </view>
        <view class="wi-right">
          <image class="wi-svg" :src="svgIcon('sunrise','#f97316')" mode="aspectFit" />
          <text class="wi-time" style="color:#f97316">{{ d.sunrise }}</text>
          <image class="wi-svg" :src="svgIcon('sunrise','#e5007a')" mode="aspectFit" />
          <text class="wi-time" style="color:#e5007a">{{ d.sunset }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'
import { getCurrentTerm } from '../../utils/solar-terms.js'

export default {
  data() {
    return {
      currentTerm: getCurrentTerm(),
      weekData: [
        { day: '周一', date: '04/01', sunrise: '06:14', sunset: '18:33' },
        { day: '周二', date: '04/02', sunrise: '06:13', sunset: '18:34' },
        { day: '周三', date: '04/03', sunrise: '06:11', sunset: '18:35' },
        { day: '周四', date: '04/04', sunrise: '06:10', sunset: '18:36' },
        { day: '周五', date: '04/05', sunrise: '06:08', sunset: '18:37' },
        { day: '周六', date: '04/06', sunrise: '06:07', sunset: '18:38' },
        { day: '周日', date: '04/07', sunrise: '06:05', sunset: '18:39' }
      ]
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() { uni.navigateBack() },
    goDetail() { uni.navigateTo({ url: '/pages/detail/detail?id=' + this.currentTerm.id }) }
  }
}
</script>

<style scoped>
.sunrise-page { min-height: 100vh; background: linear-gradient(180deg, #fff5f0 0%, #fff 20%); padding-bottom: 120rpx; }
.status-bar { height: 44px; }

.sr-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.sr-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.location-bar { display: flex; align-items: center; justify-content: space-between; margin: 8rpx 32rpx 20rpx; padding: 16rpx 24rpx; background: #fff; border-radius: 30rpx; border: 2rpx solid #f3f4f6; }
.loc-left { display: flex; align-items: center; gap: 8rpx; }
.loc-svg { width: 24rpx; height: 24rpx; }
.loc-text { font-size: 26rpx; color: #1e2939; font-weight: 500; }
.loc-change { font-size: 24rpx; font-weight: 600; }

.sunset-card { margin: 0 32rpx 20rpx; border-radius: 24rpx; overflow: hidden; position: relative; height: 280rpx; }
.sunset-img { width: 100%; height: 100%; }
.sunset-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 28rpx; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%); }
.sunset-label { display: block; font-size: 28rpx; font-weight: 700; color: #fff; }
.sunset-desc { display: block; font-size: 22rpx; color: rgba(255,255,255,0.85); margin-top: 4rpx; }

.time-card { margin: 0 32rpx 20rpx; background: #fff; border-radius: 24rpx; padding: 32rpx; }
.time-row { display: flex; gap: 32rpx; margin-bottom: 28rpx; }
.time-item { flex: 1; }
.time-icon-row { display: flex; align-items: center; gap: 8rpx; margin-bottom: 8rpx; }
.time-svg { width: 28rpx; height: 28rpx; }
.time-label { font-size: 24rpx; color: #6a7282; }
.time-value { font-size: 52rpx; font-weight: 800; }

.info-row { display: flex; justify-content: space-between; padding-top: 20rpx; border-top: 2rpx solid #f3f4f6; }
.info-item { text-align: center; }
.info-label { display: block; font-size: 22rpx; color: #6a7282; margin-bottom: 4rpx; }
.info-val { display: block; font-size: 24rpx; font-weight: 600; color: #1e2939; }

.recommend-card { margin: 0 32rpx 24rpx; background: #d0fae5; border-radius: 16rpx; padding: 20rpx 24rpx; display: flex; align-items: center; gap: 12rpx; }
.rec-svg { width: 28rpx; height: 28rpx; }
.rec-text { font-size: 26rpx; font-weight: 600; color: #059669; }

.week-title { display: block; font-size: 30rpx; font-weight: 700; color: #1e2939; padding: 0 32rpx; margin-bottom: 16rpx; }
.week-list { padding: 0 32rpx; }
.week-item { display: flex; align-items: center; justify-content: space-between; background: #fff; border-radius: 16rpx; padding: 24rpx; margin-bottom: 12rpx; }
.week-item.highlight { background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%); }
.wi-left { display: flex; flex-direction: column; }
.wi-day { font-size: 28rpx; font-weight: 600; color: #1e2939; }
.wi-date { font-size: 22rpx; color: #6a7282; }
.wi-right { display: flex; align-items: center; gap: 12rpx; }
.wi-svg { width: 24rpx; height: 24rpx; }
.wi-time { font-size: 26rpx; font-weight: 600; }
</style>
