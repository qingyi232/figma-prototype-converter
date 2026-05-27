<template>
  <view class="wallpaper-page">
    <view class="status-bar"></view>

    <view class="wp-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="wp-title">节气壁纸</text>
      <view style="width:72rpx"></view>
    </view>

    <!-- 选择节气 -->
    <view class="select-section">
      <text class="ss-label">选择节气</text>
      <view class="term-grid">
        <view
          v-for="t in solarTerms.slice(0, 12)"
          :key="t.id"
          :class="['term-btn', { active: selectedTermId === t.id }]"
          @tap="selectedTermId = t.id"
        >
          <text>{{ t.name }}</text>
        </view>
      </view>
    </view>

    <!-- 选择风格 -->
    <view class="select-section">
      <text class="ss-label">选择风格</text>
      <view class="style-grid">
        <view
          v-for="s in styles"
          :key="s.id"
          :class="['style-card', { active: selectedStyleId === s.id }]"
          @tap="selectedStyleId = s.id"
        >
          <view class="sc-preview">
            <image class="sc-img" :src="s.preview" mode="aspectFill" />
            <view v-if="s.id === selectedStyleId" class="sc-ai-badge">
              <image class="sc-ai-svg" :src="svgIcon('star','#fff')" mode="aspectFit" />
            </view>
          </view>
          <text class="sc-name">{{ s.name }}</text>
        </view>
      </view>
    </view>

    <!-- 生成按钮 -->
    <view class="generate-btn" @tap="onGenerate">
      <image class="gen-svg" :src="svgIcon('star','#fff')" mode="aspectFit" />
      <text class="gen-text">生成专属壁纸</text>
    </view>

    <!-- 壁纸信息 -->
    <view class="info-card">
      <view class="ic-title-row">
        <image class="ic-svg" :src="svgIcon('image','#00bc7d')" mode="aspectFit" />
        <text class="ic-title">壁纸信息</text>
      </view>
      <view class="ic-row">
        <text class="ic-label">节气：</text>
        <text class="ic-value">{{ currentTerm.name }}</text>
      </view>
      <view class="ic-row">
        <text class="ic-label">风格：</text>
        <text class="ic-value">{{ currentStyle.name }}</text>
      </view>
      <view class="ic-row">
        <text class="ic-label">分辨率：</text>
        <text class="ic-value">1080×2340</text>
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
      solarTerms,
      selectedTermId: getCurrentTerm().id,
      selectedStyleId: 1,
      styles: [
        { id: 1, name: '简约国风', preview: '/static/hero/hero4.png' },
        { id: 2, name: '水墨风格', preview: '/static/wallpaper/preview1.png' },
        { id: 3, name: '插画风格', preview: '/static/ip/ip4.png' }
      ]
    }
  },
  computed: {
    currentTerm() {
      return solarTerms.find(t => t.id === this.selectedTermId) || solarTerms[0]
    },
    currentStyle() {
      return this.styles.find(s => s.id === this.selectedStyleId) || this.styles[0]
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() { uni.navigateBack() },
    onGenerate() {
      uni.showToast({ title: '正在生成壁纸...', icon: 'none' })
    }
  }
}
</script>

<style scoped>
.wallpaper-page { background: linear-gradient(180deg, #f0f9ff 0%, #fff 25%); min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }

.wp-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.wp-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.select-section { padding: 0 32rpx; margin-bottom: 24rpx; }
.ss-label { display: block; font-size: 24rpx; color: #4a5565; margin-bottom: 14rpx; }

.term-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12rpx; background: #fff; border-radius: 20rpx; padding: 16rpx; }
.term-btn { padding: 14rpx 20rpx; border-radius: 30rpx; background: #fff; border: 1rpx solid #e5e7eb; font-size: 24rpx; color: #4a5565; text-align: center; }
.term-btn.active { background: #d0fae5; border-color: #00bc7d; color: #047857; font-weight: 600; }

.style-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14rpx; }
.style-card { background: #fff; border-radius: 16rpx; overflow: hidden; border: 3rpx solid transparent; transition: all 0.2s; }
.style-card.active { border-color: #6366f1; }
.sc-preview { width: 100%; height: 280rpx; position: relative; overflow: hidden; }
.sc-img { width: 100%; height: 100%; }
.sc-ai-badge { position: absolute; top: 14rpx; right: 14rpx; width: 44rpx; height: 44rpx; border-radius: 50%; background: #6366f1; display: flex; align-items: center; justify-content: center; }
.sc-ai-svg { width: 24rpx; height: 24rpx; }
.sc-name { display: block; padding: 16rpx; text-align: center; font-size: 24rpx; color: #1e2939; font-weight: 500; }

.generate-btn { margin: 24rpx 32rpx; height: 96rpx; border-radius: 48rpx; background: linear-gradient(135deg, #6366f1 0%, #a78bfa 100%); display: flex; align-items: center; justify-content: center; gap: 12rpx; }
.gen-svg { width: 32rpx; height: 32rpx; }
.gen-text { font-size: 28rpx; color: #fff; font-weight: 600; }

.info-card { margin: 0 32rpx; background: #d0fae5; border-radius: 20rpx; padding: 24rpx; border: 2rpx solid #86efac; }
.ic-title-row { display: flex; align-items: center; gap: 8rpx; margin-bottom: 14rpx; }
.ic-svg { width: 28rpx; height: 28rpx; }
.ic-title { font-size: 28rpx; font-weight: 700; color: #047857; }
.ic-row { display: flex; justify-content: space-between; padding: 8rpx 0; }
.ic-label { font-size: 26rpx; color: #4a5565; }
.ic-value { font-size: 26rpx; color: #1e2939; font-weight: 600; }
</style>
