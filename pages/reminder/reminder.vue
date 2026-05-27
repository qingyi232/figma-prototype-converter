<template>
  <view class="reminder-page">
    <view class="status-bar"></view>
    <view class="rm-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="rm-title">节气提醒</text>
      <view style="width:72rpx"></view>
    </view>

    <!-- 开关卡片 -->
    <view class="switch-card">
      <view class="sc-icon" style="background:#ffedd4"><image style="width:28rpx;height:28rpx" :src="svgIcon('bell','#e17100')" mode="aspectFit" /></view>
      <view class="sc-info">
        <text class="sc-name">节气提醒</text>
        <text class="sc-status">{{ enabled ? '已开启' : '已关闭' }}</text>
      </view>
      <switch :checked="enabled" color="#ff6900" @change="enabled = !enabled" />
    </view>

    <!-- 提醒设置 -->
    <text class="section-label">提醒设置</text>
    <view class="settings-card">
      <text class="set-title">提前提醒</text>
      <view class="day-tabs">
        <view v-for="d in dayOptions" :key="d" :class="['day-tab', { active: advanceDays === d }]" @tap="advanceDays = d">
          <text>{{ d }}天</text>
        </view>
      </view>

      <text class="set-title">提醒时间</text>
      <view class="time-picker">
        <picker mode="time" :value="reminderTime" @change="onTimeChange">
          <view class="tp-box"><text>{{ reminderTime }}</text></view>
        </picker>
      </view>

      <view class="remind-hint">
        <text>将在节气前 <text style="font-weight:700">{{ advanceDays }}天</text> 的 <text style="font-weight:700">{{ reminderTime }}</text> 提醒您</text>
      </view>
    </view>

    <!-- 选择节气 -->
    <view class="select-header">
      <text class="select-title">选择节气 ({{ selectedCount }}/24)</text>
      <view class="select-actions">
        <text class="sa-link" style="color:#ff6900" @tap="selectAll">全选</text>
        <text class="sa-sep">|</text>
        <text class="sa-link" @tap="clearAll">清空</text>
      </view>
    </view>

    <view class="term-grid">
      <view v-for="item in allTerms" :key="item.id"
        :class="['term-item', { selected: item.selected }]"
        @tap="toggleTerm(item)"
      >
        <view class="ti-info">
          <text class="ti-name" :style="{ color: item.selected ? '#00bc7d' : '#1e2939' }">{{ item.name }}</text>
          <text class="ti-date">{{ item.date }}</text>
        </view>
        <image v-if="item.selected" class="ti-check-svg" :src="svgIcon('check','#00bc7d')" mode="aspectFit" />
      </view>
    </view>

    <button class="save-btn">保存设置</button>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'
import { solarTerms } from '../../utils/solar-terms.js'

export default {
  data() {
    return {
      enabled: true,
      advanceDays: 3,
      reminderTime: '09:00',
      dayOptions: [1, 2, 3, 5, 7],
      allTerms: solarTerms.map(t => ({ ...t, selected: true }))
    }
  },
  computed: {
    selectedCount() { return this.allTerms.filter(t => t.selected).length }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.switchTab({ url: '/pages/tools/tools' })
    },
    onTimeChange(e) { this.reminderTime = e.detail.value },
    toggleTerm(item) { item.selected = !item.selected },
    selectAll() { this.allTerms.forEach(t => t.selected = true) },
    clearAll() { this.allTerms.forEach(t => t.selected = false) }
  }
}
</script>

<style scoped>
.reminder-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }
.rm-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 30rpx; color: #1e2939; font-weight: 700; }
.rm-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.switch-card { display: flex; align-items: center; margin: 16rpx 32rpx 24rpx; background: #fff; border-radius: 20rpx; padding: 24rpx; gap: 16rpx; }
.sc-icon { width: 72rpx; height: 72rpx; border-radius: 18rpx; display: flex; align-items: center; justify-content: center; }
.sc-info { flex: 1; }
.sc-name { display: block; font-size: 28rpx; font-weight: 700; color: #1e2939; }
.sc-status { display: block; font-size: 22rpx; color: #6a7282; }

.section-label { display: block; font-size: 26rpx; color: #6a7282; padding: 0 32rpx; margin-bottom: 12rpx; }

.settings-card { margin: 0 32rpx 24rpx; background: #fff; border-radius: 20rpx; padding: 28rpx; }
.set-title { display: block; font-size: 28rpx; font-weight: 700; color: #1e2939; margin-bottom: 16rpx; }
.day-tabs { display: flex; gap: 12rpx; margin-bottom: 28rpx; }
.day-tab { padding: 14rpx 28rpx; border-radius: 30rpx; border: 2rpx solid #e5e7eb; font-size: 26rpx; color: #4a5565; }
.day-tab.active { background: #ff6900; border-color: #ff6900; color: #fff; }

.time-picker { margin-bottom: 20rpx; }
.tp-box { background: #f3f4f6; border-radius: 14rpx; padding: 18rpx 24rpx; font-size: 28rpx; color: #1e2939; }

.remind-hint { background: #f9fafb; border-radius: 12rpx; padding: 16rpx 20rpx; font-size: 24rpx; color: #6a7282; }

.select-header { display: flex; justify-content: space-between; align-items: center; padding: 0 32rpx; margin-bottom: 16rpx; }
.select-title { font-size: 28rpx; font-weight: 700; color: #1e2939; }
.select-actions { display: flex; align-items: center; gap: 12rpx; }
.sa-link { font-size: 26rpx; color: #6a7282; }
.sa-sep { color: #d1d5db; }

.term-grid { display: grid; grid-template-columns: 1fr 1fr; padding: 0 32rpx; gap: 12rpx; }
.term-item { background: #f9fafb; border-radius: 16rpx; padding: 20rpx 24rpx; display: flex; align-items: center; justify-content: space-between; }
.term-item.selected { background: #d0fae5; }
.ti-name { display: block; font-size: 28rpx; font-weight: 700; }
.ti-date { display: block; font-size: 22rpx; color: #6a7282; margin-top: 4rpx; }
.ti-check-svg { width: 32rpx; height: 32rpx; }
.hdr-svg { width: 32rpx; height: 32rpx; }

.save-btn { margin: 28rpx 32rpx 0; width: calc(100% - 64rpx); height: 88rpx; line-height: 88rpx; background: #00bc7d; color: #fff; font-size: 28rpx; font-weight: 600; border-radius: 14rpx; border: none; }
.save-btn::after { border: none; }
</style>
