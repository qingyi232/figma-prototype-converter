<template>
  <view class="search-page">
    <view class="status-bar"></view>

    <view class="sp-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="sp-title">搜索</text>
      <view style="width:72rpx"></view>
    </view>

    <!-- 搜索框 -->
    <view class="search-bar">
      <image class="sb-svg" :src="svgIcon('search','#99a1af')" mode="aspectFit" />
      <input class="sb-input" v-model="keyword" placeholder="搜索节气、诗词、民俗..." @confirm="doSearch" />
      <text v-if="keyword" class="sb-clear" @tap="keyword = ''">×</text>
    </view>

    <!-- 搜索结果 -->
    <view class="result-section" v-if="keyword && results.length > 0">
      <text class="rs-title">搜索结果（{{ results.length }}）</text>
      <view class="result-list">
        <view class="result-item" v-for="item in results" :key="item.id" @tap="goDetail(item.id)">
          <view class="ri-icon" style="background:#d0fae5">
            <image class="ri-svg" :src="termIconSvg(item)" mode="aspectFit" />
          </view>
          <view class="ri-info">
            <text class="ri-name">{{ item.name }}</text>
            <text class="ri-date">{{ item.date }}</text>
            <text class="ri-desc">{{ item.desc.substring(0, 28) }}</text>
          </view>
          <text class="ri-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- 无结果 -->
    <view class="no-result" v-else-if="keyword && results.length === 0">
      <image class="nr-svg" :src="svgIcon('search','#d1d5db')" mode="aspectFit" />
      <text class="nr-text">没有找到相关结果</text>
      <text class="nr-hint">换个关键词试试吧～</text>
    </view>

    <!-- 默认推荐 -->
    <view v-else>
      <!-- 历史搜索 -->
      <view class="hot-section">
        <view class="hot-title-row">
          <text class="hot-title">历史搜索</text>
          <text class="hot-clear" @tap="historyKeywords = []">清空</text>
        </view>
        <view class="tag-list">
          <view class="tag" v-for="(t, i) in historyKeywords" :key="i" @tap="searchTag(t)">
            <text>{{ t }}</text>
          </view>
        </view>
      </view>

      <!-- 热门节气 -->
      <view class="hot-section">
        <text class="hot-title">热门节气</text>
        <view class="hot-grid">
          <view class="hot-card" v-for="t in hotTerms" :key="t.id" @tap="goDetail(t.id)">
            <view class="hc-icon" style="background:#d0fae5">
              <image class="hc-svg" :src="termIconSvg(t)" mode="aspectFit" />
            </view>
            <text class="hc-name">{{ t.name }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg, termIconSvg } from '../../utils/svg-icons.js'
import { solarTerms } from '../../utils/solar-terms.js'

export default {
  data() {
    return {
      keyword: '',
      results: [],
      historyKeywords: ['立春', '清明', '冬至'],
      hotTerms: [solarTerms[0], solarTerms[3], solarTerms[4], solarTerms[9], solarTerms[15], solarTerms[21]]
    }
  },
  watch: {
    keyword(v) { this.doSearch() }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    termIconSvg(t) { return termIconSvg(t) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.switchTab({ url: '/pages/index/index' })
    },
    doSearch() {
      const k = this.keyword.trim().toLowerCase()
      if (!k) { this.results = []; return }
      this.results = solarTerms.filter(t =>
        t.name.includes(k) || t.en.toLowerCase().includes(k) || t.desc.includes(k)
      )
    },
    searchTag(t) {
      this.keyword = t
    },
    goDetail(id) {
      uni.navigateTo({ url: '/pages/detail/detail?id=' + id })
    }
  }
}
</script>

<style scoped>
.search-page { background: #f9fafb; min-height: 100vh; padding-bottom: 60rpx; }
.status-bar { height: 44px; }

.sp-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; background: #fff; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.sp-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.search-bar { display: flex; align-items: center; gap: 14rpx; margin: 16rpx 32rpx; padding: 18rpx 24rpx; background: #fff; border-radius: 30rpx; box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.04); }
.sb-svg { width: 28rpx; height: 28rpx; flex-shrink: 0; }
.sb-input { flex: 1; font-size: 26rpx; color: #1e2939; }
.sb-clear { font-size: 32rpx; color: #99a1af; padding: 0 8rpx; }

.result-section { padding: 0 32rpx; margin-top: 16rpx; }
.rs-title { display: block; font-size: 24rpx; color: #6a7282; margin-bottom: 14rpx; }
.result-list { background: #fff; border-radius: 20rpx; padding: 8rpx 24rpx; }
.result-item { display: flex; align-items: center; gap: 16rpx; padding: 20rpx 0; border-bottom: 1rpx solid #f3f4f6; }
.result-item:last-child { border-bottom: none; }
.ri-icon { width: 64rpx; height: 64rpx; border-radius: 14rpx; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ri-svg { width: 32rpx; height: 32rpx; }
.ri-info { flex: 1; }
.ri-name { display: block; font-size: 28rpx; font-weight: 700; color: #1e2939; }
.ri-date { display: block; font-size: 20rpx; color: #00bc7d; margin: 2rpx 0 4rpx; }
.ri-desc { display: block; font-size: 22rpx; color: #99a1af; }
.ri-arrow { font-size: 32rpx; color: #d1d5db; }

.no-result { display: flex; flex-direction: column; align-items: center; padding: 120rpx 0; }
.nr-svg { width: 100rpx; height: 100rpx; margin-bottom: 24rpx; }
.nr-text { font-size: 28rpx; color: #1e2939; margin-bottom: 8rpx; }
.nr-hint { font-size: 22rpx; color: #99a1af; }

.hot-section { margin: 16rpx 32rpx 24rpx; padding: 24rpx; background: #fff; border-radius: 20rpx; }
.hot-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx; }
.hot-title { display: block; font-size: 26rpx; font-weight: 600; color: #1e2939; margin-bottom: 16rpx; }
.hot-clear { font-size: 22rpx; color: #99a1af; }
.tag-list { display: flex; flex-wrap: wrap; gap: 12rpx; }
.tag { padding: 10rpx 24rpx; background: #f3f4f6; border-radius: 20rpx; }
.tag text { font-size: 24rpx; color: #4a5565; }

.hot-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12rpx; }
.hot-card { display: flex; flex-direction: column; align-items: center; gap: 8rpx; padding: 20rpx; background: #f9fafb; border-radius: 16rpx; }
.hc-icon { width: 56rpx; height: 56rpx; border-radius: 14rpx; display: flex; align-items: center; justify-content: center; }
.hc-svg { width: 28rpx; height: 28rpx; }
.hc-name { font-size: 24rpx; color: #1e2939; font-weight: 500; }
</style>
