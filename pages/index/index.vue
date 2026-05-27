<template>
  <view class="page" style="background:#ffffff;border-radius:40rpx;">
    <view class="status-bar"></view>

    <!-- 顶部区域 padding:52rpx 40rpx 0 40rpx; gap:40rpx -->
    <view class="header-area">
      <view class="header-row">
        <view class="header-left">
          <text class="app-title">节气拾光</text>
          <text class="app-subtitle">感受四季更迭之美</text>
        </view>
        <view class="bell-btn" @tap="goSearch">
          <image class="bell-svg" :src="svgIcon('bell','#e17100')" mode="aspectFit" />
        </view>
      </view>

      <!-- 搜索栏 r=27rpx; padding:20rpx 27rpx 20rpx 80rpx -->
      <view class="search-bar" @tap="goSearch">
        <image class="search-svg" :src="svgIcon('search','#99a1af')" mode="aspectFit" />
        <text class="search-placeholder">搜索节气、诗词、民俗...</text>
      </view>
    </view>

    <!-- 天气卡片 r=27rpx; padding:27rpx; gap:20rpx -->
    <view class="weather-card">
      <view class="weather-top">
        <view class="weather-left">
          <view class="weather-icon-wrap">
            <image class="weather-svg" :src="svgIcon('cloud','#00bc7d')" mode="aspectFit" />
          </view>
          <view class="weather-info">
            <view class="temp-row">
              <text class="temp-num">18°</text>
              <text class="temp-desc">多云</text>
            </view>
            <text class="temp-range">12°C ~ 22°C</text>
          </view>
        </view>
        <view class="weather-right">
          <view class="aqi-row">
            <text class="aqi-label">空气质量</text>
            <view class="aqi-badge"><text class="aqi-text">优</text></view>
          </view>
          <view class="wind-row">
            <text class="wind-text">东南风 3级</text>
          </view>
        </view>
      </view>
      <view class="weather-bottom">
        <image class="wb-svg" :src="svgIcon('calendar','#00bc7d')" mode="aspectFit" />
        <text class="wb-text">今日{{ currentTerm.name }}，玄鸟至</text>
      </view>
    </view>

    <!-- 当前节气大卡片 r=40rpx -->
    <view class="term-hero" @tap="goDetail(currentTerm.id)">
      <image class="hero-img" src="/static/home/card-bg.png" mode="aspectFill" />
      <view class="hero-overlay"></view>
      <view class="hero-text">
        <text class="hero-name">{{ currentTerm.name }}</text>
        <text class="hero-date">{{ currentTerm.date }}</text>
      </view>
      <view class="hero-bottom">
        <view class="hero-info-item">
          <view class="info-icon-wrap"><image class="info-svg" :src="svgIcon('fork','#ff6900')" mode="aspectFit" /></view>
          <view class="info-content">
            <text class="info-label">民俗饮食</text>
            <text class="info-value">{{ currentTerm.customs.substring(0, 12) }}</text>
          </view>
        </view>
        <view class="hero-info-item">
          <view class="info-icon-wrap"><image class="info-svg" :src="svgIcon('scroll','#00bc7d')" mode="aspectFit" /></view>
          <view class="info-content">
            <text class="info-label">诗词赏析</text>
            <text class="info-value">{{ currentTerm.poem.split('\n')[0].substring(0, 16) }}</text>
            <text class="info-author">—— {{ currentTerm.poem.split('\n')[1] }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 探索节气 fs=30rpx; fw=500 -->
    <view class="explore-section">
      <text class="section-title">探索节气</text>
      <view class="explore-grid">
        <view class="explore-btn" @tap="goCalendar">
          <view class="explore-icon" style="background:#d0fae5"><image class="exp-svg" :src="svgIcon('calendar','#00bc7d')" mode="aspectFit" /></view>
          <text class="explore-text">节气历</text>
        </view>
        <view class="explore-btn" @tap="goTools">
          <view class="explore-icon" style="background:#cefafe"><image class="exp-svg" :src="svgIcon('tool','#0092b8')" mode="aspectFit" /></view>
          <text class="explore-text">工具</text>
        </view>
        <view class="explore-btn" @tap="goFood">
          <view class="explore-icon" style="background:#f3e8ff"><image class="exp-svg" :src="svgIcon('fork','#9810fa')" mode="aspectFit" /></view>
          <text class="explore-text">饮食</text>
        </view>
        <view class="explore-btn" @tap="goPoemList">
          <view class="explore-icon" style="background:#dcfce7"><image class="exp-svg" :src="svgIcon('scroll','#00bc7d')" mode="aspectFit" /></view>
          <text class="explore-text">诗词</text>
        </view>
      </view>
    </view>

    <!-- 二十四节气列表 -->
    <view class="list-section">
      <view class="section-header">
        <text class="section-title">二十四节气</text>
        <text class="section-more" @tap="goCalendar">查看全部</text>
      </view>
      <view class="season-icons">
        <view v-for="s in seasons" :key="s.key" :class="['season-btn', { active: activeSeason === s.key }]" @tap="activeSeason = s.key">
          <text>{{ s.icon }}</text>
        </view>
      </view>
      <view class="term-list">
        <view class="term-item" v-for="item in filteredTerms" :key="item.id" @tap="goDetail(item.id)">
          <image class="ti-img" :src="item.image" mode="aspectFill" />
          <view class="ti-info">
            <text class="ti-name">{{ item.name }}</text>
            <text class="ti-date">{{ item.date }}</text>
            <text class="ti-desc">{{ item.desc.substring(0, 25) }}...</text>
          </view>
          <text class="ti-arrow">></text>
        </view>
      </view>
    </view>

    <!-- 节气古诗 -->
    <view class="list-section">
      <view class="section-header">
        <text class="section-title">节气古诗</text>
        <text class="section-more">更多</text>
      </view>
      <view class="poem-list">
        <view class="poem-card" v-for="item in poemTerms" :key="item.id" @tap="goPoem(item.id)">
          <text class="pc-text">{{ item.poem.split('\n')[0] }}</text>
          <text class="pc-from">—— {{ item.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { solarTerms, getCurrentTerm } from '../../utils/solar-terms.js'
import { makeSvg } from '../../utils/svg-icons.js'

export default {
  data() {
    return {
      currentTerm: getCurrentTerm(),
      activeSeason: '春',
      seasons: [
        { key: '春', icon: '' }, { key: '夏', icon: '' },
        { key: '秋', icon: '' }, { key: '冬', icon: '' }
      ],
      allTerms: solarTerms,
      poemTerms: solarTerms.slice(0, 6)
    }
  },
  computed: {
    filteredTerms() { return this.allTerms.filter(t => t.season === this.activeSeason) }
  },
  onLoad() {},
  onShow() {
    this.currentTerm = getCurrentTerm()
    this.activeSeason = this.currentTerm.season
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goDetail(id) { uni.navigateTo({ url: '/pages/detail/detail?id=' + id }) },
    goSearch() { uni.navigateTo({ url: '/pages/search/search' }) },
    goCalendar() { uni.switchTab({ url: '/pages/calendar/calendar' }) },
    goTools() { uni.switchTab({ url: '/pages/tools/tools' }) },
    goFood() { uni.navigateTo({ url: '/pages/food/food' }) },
    goPoemList() { uni.navigateTo({ url: '/pages/poem/poem?id=1' }) },
    goPoem(id) { uni.navigateTo({ url: '/pages/poem/poem?id=' + id }) }
  }
}
</script>

<style scoped>
.page { min-height: 100vh; }
.status-bar { height: 44px; }

.header-area { padding: 52rpx 40rpx 0; }
.header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40rpx; }
.header-left { display: flex; flex-direction: column; gap: 7rpx; }
.app-title { font-size: 50rpx; font-weight: 500; color: #0a0a0a; }
.app-subtitle { font-size: 24rpx; font-weight: 400; color: #6a7282; }
.bell-btn { width: 67rpx; height: 67rpx; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; }
.bell-svg { width: 34rpx; height: 34rpx; }

.search-bar { display: flex; align-items: center; gap: 16rpx; height: 75rpx; background: #f3f4f6; border-radius: 27rpx; padding: 0 27rpx; margin-bottom: 40rpx; }
.search-placeholder { font-size: 24rpx; color: #99a1af; }
.search-svg { width: 32rpx; height: 32rpx; flex-shrink: 0; }

.weather-card { margin: 0 40rpx 20rpx; background: #fff; border-radius: 27rpx; padding: 27rpx; }
.weather-top { display: flex; justify-content: space-between; margin-bottom: 20rpx; }
.weather-left { display: flex; align-items: center; gap: 27rpx; }
.weather-icon-wrap { width: 107rpx; height: 107rpx; background: #d0fae5; border-radius: 27rpx; display: flex; align-items: center; justify-content: center; }
.weather-info { display: flex; flex-direction: column; gap: 7rpx; }
.temp-row { display: flex; align-items: baseline; gap: 8rpx; }
.temp-num { font-size: 60rpx; color: #0a0a0a; }
.temp-desc { font-size: 24rpx; color: #6a7282; }
.temp-range { font-size: 20rpx; color: #99a1af; }
.weather-right { display: flex; flex-direction: column; gap: 13rpx; }
.aqi-row { display: flex; align-items: center; gap: 7rpx; }
.aqi-label { font-size: 20rpx; color: #6a7282; }
.aqi-badge { background: #dcfce7; border-radius: 50rpx; padding: 7rpx 13rpx; }
.aqi-text { font-size: 20rpx; color: #008236; }
.wind-row { display: flex; align-items: center; gap: 7rpx; }
.wind-text { font-size: 20rpx; color: #6a7282; }

.weather-bottom { display: flex; align-items: center; gap: 13rpx; }
.wb-svg { width: 28rpx; height: 28rpx; vertical-align: middle; margin-right: 8rpx; }
.weather-svg { width: 32rpx; height: 32rpx; }
.info-svg { width: 28rpx; height: 28rpx; }
.wb-text { font-size: 20rpx; color: #007a55; font-weight: 400; }

.term-hero { margin: 0 40rpx 20rpx; border-radius: 40rpx; overflow: hidden; position: relative; }
.hero-img { width: 100%; height: 348rpx; }
.hero-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.5) 100%); }
.hero-text { position: absolute; top: 40rpx; left: 40rpx; color: #fff; z-index: 2; }
.hero-name { display: block; font-size: 60rpx; font-weight: 500; }
.hero-date { display: block; font-size: 24rpx; opacity: 0.85; margin-top: 4rpx; }
.hero-bottom { padding: 33rpx; display: flex; flex-direction: column; gap: 25rpx; background: #fff; }
.hero-info-item { display: flex; align-items: flex-start; gap: 20rpx; }
.info-icon-wrap { width: 54rpx; height: 54rpx; background: #d0fae5; border-radius: 17rpx; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.info-content { display: flex; flex-direction: column; gap: 5rpx; }
.info-label { font-size: 20rpx; color: #6a7282; }
.info-value { font-size: 24rpx; color: #1e2939; }
.info-author { font-size: 20rpx; color: #99a1af; }

.explore-section { padding: 0 40rpx 20rpx; }
.section-title { font-size: 30rpx; font-weight: 500; color: #1e2939; }
.explore-grid { display: flex; gap: 13rpx; margin-top: 20rpx; }
.explore-btn { flex: 1; background: #fff; border-radius: 27rpx; padding: 20rpx; display: flex; flex-direction: column; align-items: center; gap: 13rpx; }
.explore-icon { width: 80rpx; height: 80rpx; border-radius: 23rpx; display: flex; align-items: center; justify-content: center; font-size: 36rpx; }
.exp-svg { width: 40rpx; height: 40rpx; }
.explore-text { font-size: 22rpx; color: #6a7282; }

.list-section { padding: 20rpx 40rpx; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20rpx; }
.section-more { font-size: 20rpx; color: #99a1af; }

.season-icons { display: flex; gap: 13rpx; margin-bottom: 20rpx; }
.season-btn { width: 67rpx; height: 67rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 30rpx; }
.season-btn.active { background: #d0fae5; }

.term-list { display: flex; flex-direction: column; gap: 13rpx; }
.term-item { display: flex; align-items: center; background: #fff; border-radius: 20rpx; padding: 17rpx; gap: 17rpx; }
.ti-img { width: 134rpx; height: 100rpx; border-radius: 13rpx; flex-shrink: 0; }
.ti-info { flex: 1; }
.ti-name { display: block; font-size: 27rpx; font-weight: 600; color: #1e2939; }
.ti-date { display: block; font-size: 20rpx; color: #007a55; margin: 4rpx 0; }
.ti-desc { display: block; font-size: 20rpx; color: #99a1af; }
.ti-arrow { font-size: 24rpx; color: #d1d5db; }

.poem-list { display: flex; flex-direction: column; gap: 13rpx; }
.poem-card { background: #f3f4f6; border-radius: 17rpx; padding: 27rpx; }
.pc-text { display: block; font-size: 24rpx; color: #364153; line-height: 1.6; }
.pc-from { display: block; font-size: 20rpx; color: #99a1af; margin-top: 10rpx; text-align: right; }

</style>
