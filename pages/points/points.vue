<template>
  <view class="points-page">
    <view class="status-bar"></view>
    <view class="pts-header">
      <view class="back-btn" @tap="goBack">
        <image style="width:32rpx;height:32rpx" :src="svgArrow" mode="aspectFit" />
      </view>
      <text class="pts-title">我的积分</text>
      <view style="width:72rpx"></view>
    </view>

    <!-- 橙色积分卡片 -->
    <view class="points-card">
      <view class="trophy-icon">
        <image class="trophy-svg" :src="svgTrophy" mode="aspectFit" />
      </view>
      <text class="pts-label">当前积分</text>
      <text class="pts-num">1280</text>
      <text class="pts-total">累计获得 3560 积分</text>

      <view class="level-area">
        <view class="level-row">
          <text class="level-label">当前等级</text>
          <view class="level-badge"><text>Lv.3</text></view>
          <text class="level-name">节气达人</text>
        </view>
        <view class="level-bar">
          <view class="level-fill" style="width:64%"></view>
        </view>
        <text class="level-hint">还需 720 积分升级到 节气专家</text>
      </view>
    </view>

    <!-- 两个入口 -->
    <view class="action-cards">
      <view class="ac-item" @tap="goGame">
        <view class="ac-icon" style="background:#f3e8ff">
          <image class="ac-svg" :src="svgTrend" mode="aspectFit" />
        </view>
        <text class="ac-text">答题赚积分</text>
      </view>
      <view class="ac-item" @tap="goMall">
        <view class="ac-icon" style="background:#fef3c6">
          <image class="ac-svg" :src="svgGift" mode="aspectFit" />
        </view>
        <text class="ac-text">积分兑换</text>
      </view>
    </view>

    <!-- Tab切换 -->
    <view class="record-tabs">
      <view :class="['rt-tab', { active: activeTab === 'record' }]" @tap="activeTab = 'record'">
        <text>积分记录</text>
      </view>
      <view :class="['rt-tab', { active: activeTab === 'tasks' }]" @tap="activeTab = 'tasks'">
        <text>赚取任务</text>
      </view>
    </view>

    <!-- 积分记录列表 -->
    <view class="record-list" v-if="activeTab === 'record'">
      <view class="record-item" v-for="(r, i) in records" :key="i">
        <view class="ri-icon">
          <image class="ri-svg" :src="svgNote" mode="aspectFit" />
        </view>
        <view class="ri-info">
          <text class="ri-desc">{{ r.desc }}</text>
          <text class="ri-date"><image class="ri-cal-svg" :src="svgCal" mode="aspectFit" /> {{ r.date }}</text>
        </view>
        <text :class="['ri-points', r.points > 0 ? 'plus' : 'minus']">
          {{ r.points > 0 ? '+' : '' }}{{ r.points }}
        </text>
      </view>
    </view>

    <view class="record-list" v-else>
      <view class="record-item" v-for="(t, i) in tasks" :key="i">
        <view class="ri-icon">
          <image class="ri-svg" :src="svgNote" mode="aspectFit" />
        </view>
        <view class="ri-info">
          <text class="ri-desc">{{ t.name }}</text>
          <text class="ri-date">{{ t.hint }}</text>
        </view>
        <text class="ri-points plus">+{{ t.points }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'

export default {
  computed: {
    svgTrophy() { return makeSvg('trophy', '#fff') },
    svgTrend() { return makeSvg('trend', '#9810fa') },
    svgGift() { return makeSvg('gift', '#e17100') },
    svgNote() { return makeSvg('note', '#9810fa') },
    svgCal() { return makeSvg('calendar', '#99a1af') },
    svgArrow() { return makeSvg('arrowLeft', '#1e2939') }
  },
  data() {
    return {
      activeTab: 'record',
      records: [
        { desc: '完成答题闯关：立春篇', date: '2026-04-03', points: 100 },
        { desc: '每日签到', date: '2026-04-03', points: 50 },
        { desc: '兑换：节气手账本', date: '2026-04-02', points: -280 },
        { desc: '完成答题闯关：雨水篇', date: '2026-04-01', points: 100 },
        { desc: '分享节气给好友', date: '2026-03-31', points: 80 }
      ],
      tasks: [
        { name: '每日签到', hint: '每天签到获取积分', points: 50, icon: '' },
        { name: '答题闯关', hint: '完成节气知识答题', points: 100, icon: '' },
        { name: '分享节气', hint: '分享给好友', points: 30, icon: '' },
        { name: '连续签到7天', hint: '连续打卡奖励', points: 200, icon: '' }
      ]
    }
  },
  methods: {
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) {
        uni.navigateBack()
      } else {
        uni.switchTab({ url: '/pages/mine/mine' })
      }
    },
    goGame() { uni.navigateTo({ url: '/pages/game/game' }) },
    goMall() { uni.switchTab({ url: '/pages/mall/mall' }) }
  }
}
</script>

<style scoped>
.points-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }
.pts-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 30rpx; color: #1e2939; font-weight: 700; }
.pts-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.points-card { margin: 16rpx 32rpx 24rpx; background: linear-gradient(135deg, #ff6900, #f54900); border-radius: 24rpx; padding: 40rpx 32rpx; color: #fff; text-align: center; }
.trophy-icon { width: 100rpx; height: 100rpx; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 16rpx; }
.trophy-svg { width: 48rpx; height: 48rpx; }
.pts-label { display: block; font-size: 26rpx; opacity: 0.85; margin-bottom: 8rpx; }
.pts-num { display: block; font-size: 80rpx; font-weight: 800; margin-bottom: 8rpx; }
.pts-total { display: block; font-size: 24rpx; opacity: 0.75; margin-bottom: 28rpx; }

.level-area { background: rgba(0,0,0,0.15); border-radius: 16rpx; padding: 20rpx 24rpx; }
.level-row { display: flex; align-items: center; gap: 10rpx; margin-bottom: 12rpx; }
.level-label { font-size: 24rpx; opacity: 0.85; }
.level-badge { background: rgba(255,255,255,0.3); padding: 4rpx 14rpx; border-radius: 8rpx; font-size: 22rpx; }
.level-name { margin-left: auto; font-size: 26rpx; font-weight: 600; }
.level-bar { height: 10rpx; background: rgba(255,255,255,0.3); border-radius: 5rpx; margin-bottom: 10rpx; }
.level-fill { height: 100%; background: #fff; border-radius: 5rpx; }
.level-hint { display: block; font-size: 22rpx; opacity: 0.7; text-align: left; }

.action-cards { display: flex; gap: 16rpx; padding: 0 32rpx; margin-bottom: 24rpx; }
.ac-item { flex: 1; background: #fff; border-radius: 20rpx; padding: 28rpx; display: flex; flex-direction: column; align-items: center; gap: 14rpx; }
.ac-icon { width: 72rpx; height: 72rpx; border-radius: 18rpx; display: flex; align-items: center; justify-content: center; }
.ac-svg { width: 36rpx; height: 36rpx; }
.ac-text { font-size: 26rpx; font-weight: 600; color: #1e2939; }

.record-tabs { display: flex; padding: 0 32rpx; gap: 16rpx; margin-bottom: 20rpx; }
.rt-tab { padding: 12rpx 28rpx; border-radius: 30rpx; font-size: 26rpx; color: #6a7282; background: #fff; }
.rt-tab.active { background: #ff6900; color: #fff; font-weight: 600; }

.record-list { padding: 0 32rpx; }
.record-item { display: flex; align-items: center; background: #fff; border-radius: 16rpx; padding: 24rpx; margin-bottom: 12rpx; gap: 16rpx; }
.ri-icon { width: 56rpx; height: 56rpx; border-radius: 14rpx; background: #f3f4f6; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ri-svg { width: 28rpx; height: 28rpx; }
.ri-cal-svg { width: 22rpx; height: 22rpx; vertical-align: middle; margin-right: 4rpx; }
.ri-info { flex: 1; }
.ri-desc { display: block; font-size: 28rpx; font-weight: 600; color: #1e2939; }
.ri-date { display: block; font-size: 22rpx; color: #99a1af; margin-top: 6rpx; }
.ri-points { font-size: 30rpx; font-weight: 800; }
.ri-points.plus { color: #00bc7d; }
.ri-points.minus { color: #fb2c36; }
</style>
