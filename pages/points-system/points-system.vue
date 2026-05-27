<template>
  <view class="ps-page">
    <view class="status-bar"></view>

    <view class="ps-nav">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="nav-title">积分体系</text>
      <view style="width:72rpx"></view>
    </view>

    <view class="ps-header">
      <text class="psh-title">积分体系</text>
      <text class="psh-desc">了解如何获取和使用积分</text>
    </view>

    <!-- 获取积分 -->
    <view class="ps-card">
      <view class="psc-title-row">
        <image class="psc-svg" :src="svgIcon('trend','#00bc7d')" mode="aspectFit" />
        <text class="psc-title">获取积分</text>
      </view>
      <view class="rule-list">
        <view class="rule-item" v-for="(r, i) in earnRules" :key="i">
          <view class="ri-icon-wrap" :style="{ background: r.bg }">
            <image class="ri-svg" :src="svgIcon(r.iconType, r.color)" mode="aspectFit" />
          </view>
          <text class="ri-text">{{ r.text }}</text>
          <text class="ri-points">+{{ r.points }}</text>
        </view>
      </view>
    </view>

    <!-- 使用积分 -->
    <view class="ps-card">
      <view class="psc-title-row">
        <image class="psc-svg" :src="svgIcon('gift','#e17100')" mode="aspectFit" />
        <text class="psc-title">使用积分</text>
      </view>
      <view class="rule-list">
        <view class="rule-item" v-for="(r, i) in useRules" :key="i">
          <view class="ri-icon-wrap" :style="{ background: r.bg }">
            <image class="ri-svg" :src="svgIcon(r.iconType, r.color)" mode="aspectFit" />
          </view>
          <text class="ri-text">{{ r.text }}</text>
        </view>
      </view>
    </view>

    <!-- 等级说明 -->
    <view class="ps-card">
      <view class="psc-title-row">
        <image class="psc-svg" :src="svgIcon('star','#f59e0b')" mode="aspectFit" />
        <text class="psc-title">等级说明</text>
      </view>
      <view class="level-list">
        <view class="level-item" v-for="(l, i) in levels" :key="i">
          <view class="li-badge" :style="{ background: l.color }"><text>{{ l.name }}</text></view>
          <text class="li-range">{{ l.range }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'

export default {
  data() {
    return {
      earnRules: [
        { iconType: 'check', color: '#00bc7d', bg: '#d0fae5', text: '每日打卡', points: 5 },
        { iconType: 'target', color: '#fb2c36', bg: '#fee2e2', text: '知识答题（每题）', points: 10 },
        { iconType: 'share', color: '#0ea5e9', bg: '#cefafe', text: '分享节气', points: 3 },
        { iconType: 'heart', color: '#e5007a', bg: '#fce7f3', text: '社区互动', points: 2 },
        { iconType: 'trophy', color: '#f59e0b', bg: '#fef3c6', text: '连续打卡7天奖励', points: 30 }
      ],
      useRules: [
        { iconType: 'cart', color: '#ff6900', bg: '#ffedd4', text: '积分兑换商城商品' },
        { iconType: 'image', color: '#9810fa', bg: '#f3e8ff', text: '解锁专属节气壁纸' },
        { iconType: 'star', color: '#f59e0b', bg: '#fef3c6', text: '参与积分排行榜' }
      ],
      levels: [
        { name: '节气新手', range: '0-99分', color: '#9ca3af' },
        { name: '节气学徒', range: '100-299分', color: '#34d399' },
        { name: '节气达人', range: '300-599分', color: '#00bc7d' },
        { name: '节气大师', range: '600分以上', color: '#f59e0b' }
      ]
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.navigateTo({ url: '/pages/points/points' })
    }
  }
}
</script>

<style scoped>
.ps-page { padding-bottom: 60rpx; background: #f5f5f5; min-height: 100vh; }
.status-bar { height: 44px; }

.ps-nav { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; background: #fff; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.nav-title { font-size: 32rpx; font-weight: 700; color: #1e2939; }

.ps-header { padding: 24rpx 32rpx; }
.psh-title { display: block; font-size: 36rpx; font-weight: 800; color: #1e2939; }
.psh-desc { display: block; font-size: 24rpx; color: #6a7282; margin-top: 6rpx; }

.ps-card { background: #fff; border-radius: 20rpx; padding: 24rpx; margin: 0 24rpx 16rpx; }
.psc-title-row { display: flex; align-items: center; gap: 10rpx; margin-bottom: 18rpx; padding-bottom: 14rpx; border-bottom: 1rpx solid #f3f4f6; }
.psc-svg { width: 28rpx; height: 28rpx; }
.psc-title { font-size: 28rpx; font-weight: 700; color: #1e2939; }
.rule-list { display: flex; flex-direction: column; gap: 6rpx; }
.rule-item { display: flex; align-items: center; padding: 14rpx 0; gap: 14rpx; }
.ri-icon-wrap { width: 56rpx; height: 56rpx; border-radius: 14rpx; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ri-svg { width: 28rpx; height: 28rpx; }
.ri-text { flex: 1; font-size: 26rpx; color: #374151; }
.ri-points { font-size: 28rpx; font-weight: 700; color: #00bc7d; }

.level-list { display: flex; flex-direction: column; gap: 14rpx; }
.level-item { display: flex; align-items: center; gap: 16rpx; }
.li-badge { padding: 8rpx 24rpx; border-radius: 30rpx; }
.li-badge text { color: #fff; font-size: 24rpx; font-weight: 600; }
.li-range { font-size: 26rpx; color: #4a5565; }
</style>
