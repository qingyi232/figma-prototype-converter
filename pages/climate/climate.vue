<template>
  <view class="climate-page">
    <view class="status-bar"></view>

    <view class="cl-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="cl-title">物候查询</text>
      <view style="width:72rpx"></view>
    </view>

    <!-- 选择节气 -->
    <view class="select-section">
      <text class="ss-label">选择节气</text>
      <scroll-view class="term-scroll" scroll-x>
        <view class="term-tabs">
          <view
            v-for="t in solarTerms"
            :key="t.id"
            :class="['term-tab', { active: currentTermId === t.id }]"
            @tap="currentTermId = t.id"
          >
            <text>{{ t.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 当前节气卡片 -->
    <view class="current-card" v-if="currentTerm">
      <view class="cc-icon">
        <image class="cc-svg" :src="svgIcon('eye','#00bc7d')" mode="aspectFit" />
      </view>
      <view class="cc-info">
        <text class="cc-name">{{ currentTerm.name }}</text>
        <text class="cc-date">{{ currentTerm.date }}</text>
        <text class="cc-desc">{{ currentTerm.desc.substring(0, 30) }}</text>
      </view>
    </view>

    <!-- 三候 · 物候变化 -->
    <text class="section-title">三候 · 物候变化</text>
    <view class="phenology-list">
      <view class="ph-item" v-for="(p, i) in phenologyList" :key="i">
        <view class="ph-icon" :style="{ background: p.bgColor }">
          <image class="ph-svg" :src="svgIcon(p.iconType, p.color)" mode="aspectFit" />
        </view>
        <view class="ph-info">
          <view class="ph-tag-row">
            <view class="ph-tag" :style="{ background: p.bgColor, color: p.color }"><text>{{ p.label }}</text></view>
            <text class="ph-name">{{ p.name }}</text>
          </view>
          <text class="ph-desc">{{ p.desc }}</text>
        </view>
      </view>
    </view>

    <!-- 什么是物候 -->
    <text class="section-title" style="margin-top:32rpx">什么是物候</text>
    <view class="explain-card">
      <text class="explain-text">物候，是指自然界中生物（植物、动物）和非生物（如温度、降水、霜冻、风雪等）随气候变化而出现的周期性现象。古人将每个节气分为三候，每候五天，记录这一时间段最具代表性的自然变化。</text>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'
import { solarTerms, getCurrentTerm } from '../../utils/solar-terms.js'

const phenologyMap = {
  1: [
    { label: '初候', name: '东风解冻', desc: '春风吹拂，冰雪融化', iconType: 'leaf', color: '#10b981', bgColor: '#d0fae5' },
    { label: '次候', name: '蛰虫始振', desc: '蛰伏的虫类开始苏醒', iconType: 'sunrise', color: '#f59e0b', bgColor: '#fef3c6' },
    { label: '末候', name: '鱼陟负冰', desc: '鱼游上水面接近冰面', iconType: 'cloud', color: '#0ea5e9', bgColor: '#cefafe' }
  ],
  2: [
    { label: '初候', name: '獭祭鱼', desc: '水獭捕鱼陈列岸边', iconType: 'leaf', color: '#10b981', bgColor: '#d0fae5' },
    { label: '次候', name: '鸿雁来', desc: '大雁开始北飞', iconType: 'cloud', color: '#0ea5e9', bgColor: '#cefafe' },
    { label: '末候', name: '草木萌动', desc: '草木开始萌发新芽', iconType: 'leaf', color: '#7cb342', bgColor: '#f1f8e9' }
  ],
  3: [
    { label: '初候', name: '桃始华', desc: '桃花开始绽放', iconType: 'leaf', color: '#e5007a', bgColor: '#fce7f3' },
    { label: '次候', name: '仓庚鸣', desc: '黄鹂鸟开始鸣叫', iconType: 'leaf', color: '#f59e0b', bgColor: '#fef3c6' },
    { label: '末候', name: '鹰化为鸠', desc: '鹰化身为布谷鸟', iconType: 'cloud', color: '#6a7282', bgColor: '#f3f4f6' }
  ],
  4: [
    { label: '初候', name: '玄鸟至', desc: '燕子从南方飞来', iconType: 'leaf', color: '#10b981', bgColor: '#d0fae5' },
    { label: '次候', name: '雷乃发声', desc: '开始打雷', iconType: 'sunrise', color: '#f59e0b', bgColor: '#fef3c6' },
    { label: '末候', name: '始电', desc: '开始出现闪电', iconType: 'cloud', color: '#6366f1', bgColor: '#e0e7ff' }
  ],
  5: [
    { label: '初候', name: '桐始华', desc: '桐花开始盛开', iconType: 'leaf', color: '#e5007a', bgColor: '#fce7f3' },
    { label: '次候', name: '田鼠化为鴽', desc: '田鼠化身为鹌鹑', iconType: 'leaf', color: '#f59e0b', bgColor: '#fef3c6' },
    { label: '末候', name: '虹始见', desc: '雨后开始出现彩虹', iconType: 'sunrise', color: '#10b981', bgColor: '#d0fae5' }
  ]
}

export default {
  data() {
    return {
      solarTerms,
      currentTermId: getCurrentTerm().id
    }
  },
  computed: {
    currentTerm() {
      return solarTerms.find(t => t.id === this.currentTermId)
    },
    phenologyList() {
      return phenologyMap[this.currentTermId] || [
        { label: '初候', name: '物候一', desc: '该节气的第一候', iconType: 'leaf', color: '#10b981', bgColor: '#d0fae5' },
        { label: '次候', name: '物候二', desc: '该节气的第二候', iconType: 'sunrise', color: '#f59e0b', bgColor: '#fef3c6' },
        { label: '末候', name: '物候三', desc: '该节气的第三候', iconType: 'cloud', color: '#0ea5e9', bgColor: '#cefafe' }
      ]
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() { uni.navigateBack() }
  }
}
</script>

<style scoped>
.climate-page { background: linear-gradient(180deg, #f0fdf4 0%, #fff 25%); min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }

.cl-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.cl-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.select-section { padding: 0 32rpx; margin-bottom: 24rpx; }
.ss-label { display: block; font-size: 24rpx; color: #4a5565; margin-bottom: 12rpx; }
.term-scroll { white-space: nowrap; }
.term-tabs { display: inline-flex; gap: 12rpx; padding-bottom: 8rpx; }
.term-tab { padding: 12rpx 26rpx; border-radius: 30rpx; background: #fff; border: 1rpx solid #e5e7eb; font-size: 26rpx; color: #4a5565; flex-shrink: 0; }
.term-tab.active { background: #d0fae5; border-color: #00bc7d; color: #047857; font-weight: 600; }

.current-card { margin: 0 32rpx 24rpx; background: #d0fae5; border-radius: 20rpx; padding: 28rpx 24rpx; display: flex; gap: 16rpx; align-items: flex-start; border: 2rpx solid #00bc7d; }
.cc-icon { width: 72rpx; height: 72rpx; border-radius: 16rpx; background: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.cc-svg { width: 36rpx; height: 36rpx; }
.cc-info { flex: 1; }
.cc-name { display: block; font-size: 36rpx; font-weight: 800; color: #1e2939; margin-bottom: 4rpx; }
.cc-date { display: block; font-size: 22rpx; color: #4a5565; margin-bottom: 8rpx; }
.cc-desc { display: block; font-size: 24rpx; color: #4a5565; line-height: 1.5; }

.section-title { display: block; font-size: 26rpx; color: #4a5565; margin: 0 32rpx 16rpx; }

.phenology-list { padding: 0 32rpx; display: flex; flex-direction: column; gap: 14rpx; }
.ph-item { display: flex; gap: 16rpx; background: #fff; border-radius: 20rpx; padding: 24rpx; align-items: center; }
.ph-icon { width: 64rpx; height: 64rpx; border-radius: 14rpx; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ph-svg { width: 32rpx; height: 32rpx; }
.ph-info { flex: 1; }
.ph-tag-row { display: flex; align-items: center; gap: 10rpx; margin-bottom: 6rpx; }
.ph-tag { padding: 4rpx 14rpx; border-radius: 6rpx; }
.ph-tag text { font-size: 20rpx; font-weight: 600; }
.ph-name { font-size: 28rpx; font-weight: 700; color: #1e2939; }
.ph-desc { display: block; font-size: 24rpx; color: #6a7282; line-height: 1.5; }

.explain-card { margin: 0 32rpx; background: #f9fafb; border-radius: 16rpx; padding: 24rpx; }
.explain-text { font-size: 26rpx; color: #4a5565; line-height: 1.7; }
</style>
