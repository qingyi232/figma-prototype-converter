<template>
  <view class="calendar-page">
    <view class="status-bar"></view>
    <view class="cal-header">
      <text class="cal-title">节气日历</text>
    </view>

    <view class="cal-intro">
      <text class="intro-year">2026年二十四节气</text>
      <text class="intro-desc">二十四节气是中国古代订立的补充历法</text>
    </view>

    <view class="season-group" v-for="s in seasonGroups" :key="s.season">
      <view class="season-label" :style="{ background: s.bgColor }">
        <image class="sl-svg" :src="s.iconSvg" mode="aspectFit" />
        <view class="sl-info">
          <text class="sl-name">{{ s.label }}</text>
          <text class="sl-count">{{ s.terms.length }}个节气</text>
        </view>
      </view>

      <view class="term-grid">
        <view class="term-card" v-for="item in s.terms" :key="item.id" @tap="goDetail(item.id)">
          <view class="tc-icon-wrap">
            <image class="tc-svg" :src="getTermSvg(item)" mode="aspectFit" />
          </view>
          <text class="tc-name">{{ item.name }}</text>
          <text class="tc-date">{{ item.date }}</text>
          <text class="tc-desc">{{ item.desc.substring(0, 16) }}</text>
          <view class="tc-today" v-if="item.id === currentTermId"><text>今日</text></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { solarTerms, getSeasonTerms, getCurrentTerm } from '../../utils/solar-terms.js'
import { makeSvg, termIconSvg } from '../../utils/svg-icons.js'

export default {
  data() {
    return {
      currentTermId: getCurrentTerm().id,
      seasonGroups: [
        { season: '春', label: '春季', iconSvg: makeSvg('leaf', '#10b981'), bgColor: '#d0fae5', terms: getSeasonTerms('春') },
        { season: '夏', label: '夏季', iconSvg: makeSvg('thermometer', '#f59e0b'), bgColor: '#fef3c6', terms: getSeasonTerms('夏') },
        { season: '秋', label: '秋季', iconSvg: makeSvg('leaf', '#f97316'), bgColor: '#ffedd4', terms: getSeasonTerms('秋') },
        { season: '冬', label: '冬季', iconSvg: makeSvg('cloud', '#6366f1'), bgColor: '#e0e7ff', terms: getSeasonTerms('冬') }
      ]
    }
  },
  methods: {
    goDetail(id) { uni.navigateTo({ url: '/pages/detail/detail?id=' + id }) },
    getTermSvg(item) { return termIconSvg(item) }
  }
}
</script>

<style scoped>
.calendar-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }
.cal-header { text-align: center; padding: 16rpx 32rpx; }
.cal-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.cal-intro { text-align: center; padding: 24rpx 32rpx 28rpx; }
.intro-year { display: block; font-size: 38rpx; font-weight: 800; color: #0a0a0a; margin-bottom: 8rpx; }
.intro-desc { display: block; font-size: 24rpx; color: #6a7282; }

.season-group { padding: 0 24rpx; margin-bottom: 28rpx; }
.season-label { display: flex; align-items: center; gap: 14rpx; padding: 20rpx 24rpx; border-radius: 16rpx; margin-bottom: 16rpx; }
.sl-svg { width: 36rpx; height: 36rpx; }
.sl-name { display: block; font-size: 30rpx; font-weight: 700; color: #1e2939; }
.sl-count { display: block; font-size: 22rpx; color: #6a7282; }

.term-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12rpx; }
.term-card { background: #fff; border-radius: 20rpx; padding: 24rpx; position: relative; }
.tc-icon-wrap { width: 64rpx; height: 64rpx; background: #d0fae5; border-radius: 16rpx; display: flex; align-items: center; justify-content: center; margin-bottom: 14rpx; }
.tc-svg { width: 32rpx; height: 32rpx; }
.tc-name { display: block; font-size: 30rpx; font-weight: 700; color: #1e2939; margin-bottom: 4rpx; }
.tc-date { display: block; font-size: 22rpx; color: #6a7282; margin-bottom: 10rpx; }
.tc-desc { display: block; font-size: 22rpx; color: #99a1af; line-height: 1.5; }
.tc-today { position: absolute; top: 16rpx; right: 16rpx; background: #00bc7d; padding: 4rpx 14rpx; border-radius: 8rpx; }
.tc-today text { font-size: 20rpx; color: #fff; font-weight: 600; }
</style>
