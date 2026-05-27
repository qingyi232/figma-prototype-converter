<template>
  <view class="culture-page">
    <view class="status-bar"></view>

    <view class="ct-nav">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="ct-title">节气文化</text>
      <view style="width:72rpx"></view>
    </view>

    <view class="page-header">
      <text class="ph-title">传承千年的农耕智慧</text>
      <text class="ph-desc">了解二十四节气文化习俗</text>
    </view>

    <view class="culture-list">
      <view class="culture-card" v-for="item in cultureItems" :key="item.id" @tap="goDetail(item.termId)">
        <image class="culture-img" :src="`/static/hero/hero${item.termId}.png`" mode="aspectFill" />
        <view class="culture-overlay"></view>
        <view class="culture-info">
          <view class="ci-tag"><text>{{ item.season }}</text></view>
          <text class="culture-title">{{ item.title }}</text>
          <text class="culture-subtitle">{{ item.subtitle }}</text>
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
      cultureItems: [
        { id: 1, termId: 1, title: '立春迎春', subtitle: '万物复苏，春回大地', season: '春' },
        { id: 2, termId: 5, title: '清明踏青', subtitle: '春日出游，亲近自然', season: '春' },
        { id: 3, termId: 7, title: '立夏尝新', subtitle: '初夏时光，品尝新鲜', season: '夏' },
        { id: 4, termId: 10, title: '夏至习俗', subtitle: '最长白昼，消暑纳凉', season: '夏' },
        { id: 5, termId: 16, title: '秋分丰收', subtitle: '金秋时节，硕果累累', season: '秋' },
        { id: 6, termId: 22, title: '冬至团圆', subtitle: '饺子汤圆，家的味道', season: '冬' }
      ]
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.switchTab({ url: '/pages/index/index' })
    },
    goDetail(id) {
      uni.navigateTo({ url: '/pages/detail/detail?id=' + id })
    }
  }
}
</script>

<style scoped>
.culture-page { background: #fff; min-height: 100vh; padding-bottom: 40rpx; }
.status-bar { height: 44px; }

.ct-nav { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.ct-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.page-header { padding: 24rpx 32rpx; }
.ph-title { display: block; font-size: 36rpx; font-weight: 800; color: #1e2939; }
.ph-desc { display: block; font-size: 24rpx; color: #6a7282; margin-top: 8rpx; }

.culture-list { padding: 0 32rpx; }
.culture-card { border-radius: 24rpx; overflow: hidden; margin-bottom: 20rpx; position: relative; height: 320rpx; }
.culture-img { width: 100%; height: 100%; }
.culture-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.6) 100%); }
.culture-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 24rpx; color: #fff; }
.ci-tag { display: inline-flex; padding: 4rpx 16rpx; background: rgba(255,255,255,0.25); border-radius: 20rpx; margin-bottom: 8rpx; }
.ci-tag text { font-size: 22rpx; color: #fff; font-weight: 600; }
.culture-title { display: block; font-size: 32rpx; font-weight: 800; margin-bottom: 4rpx; }
.culture-subtitle { display: block; font-size: 24rpx; opacity: 0.85; }
</style>
