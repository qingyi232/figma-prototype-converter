<template>
  <view class="poem-list-page">
    <view class="status-bar"></view>

    <view class="pl-header">
      <text class="pl-title">诗词赏析</text>
    </view>

    <!-- 搜索栏 -->
    <view class="search-bar">
      <image class="search-svg" :src="svgIcon('search','#99a1af')" mode="aspectFit" />
      <text class="search-placeholder">搜索诗词、作者...</text>
    </view>

    <!-- 横幅 -->
    <view class="banner">
      <view class="banner-icon"><image class="bn-svg" :src="svgIcon('book','#f97316')" mode="aspectFit" /></view>
      <view class="banner-info">
        <text class="bn-title">诗词与节气</text>
        <text class="bn-desc">通过诗词感受二十四节气的文化韵味</text>
      </view>
    </view>

    <!-- 诗词列表 -->
    <view class="poem-list">
      <view class="poem-card" v-for="p in poems" :key="p.id" @tap="goDetail(p.id)">
        <image class="pc-bg" :src="`/static/poem/poem${p.id}.png`" mode="aspectFill" />
        <view class="pc-content-wrap">
          <view class="pc-header">
            <view class="pc-tag" :style="{ background: p.tagBg, color: p.tagColor }"><text>{{ p.term }}</text></view>
            <view class="pc-fav"><image class="pc-fav-svg" :src="svgIcon('heart','#99a1af')" mode="aspectFit" /></view>
          </view>
          <text class="pc-title">{{ p.title }}</text>
          <text class="pc-content">{{ p.content }}</text>
          <view class="pc-footer">
            <view class="pc-author">
              <view class="pc-avatar" :style="{ background: p.avatarBg }"><text>{{ p.author.charAt(0) }}</text></view>
              <view class="pc-author-info">
                <text class="pc-name">{{ p.author }}</text>
                <text class="pc-dynasty">{{ p.dynasty }}</text>
              </view>
            </view>
            <view class="pc-read">
              <text class="pc-read-text">阅读全文</text>
              <text class="pc-read-arrow">›</text>
            </view>
          </view>
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
      poems: [
        { id: 1, term: '立春', title: '咏柳', author: '贺知章', dynasty: '唐', content: '碧玉妆成一树高，万条垂下绿丝绦。', tagBg: '#d0fae5', tagColor: '#047857', avatarBg: '#fef3c6' },
        { id: 2, term: '雨水', title: '春夜喜雨', author: '杜甫', dynasty: '唐', content: '好雨知时节，当春乃发生。随风潜入夜，润物细无声。', tagBg: '#d0fae5', tagColor: '#047857', avatarBg: '#fef3c6' },
        { id: 3, term: '惊蛰', title: '春雷', author: '韩愈', dynasty: '唐', content: '震蛰四时新，春雷一鸣发。万物复苏起，生机焕然新。', tagBg: '#d0fae5', tagColor: '#047857', avatarBg: '#fef3c6' },
        { id: 4, term: '春分', title: '春分', author: '杜甫', dynasty: '唐', content: '仲春初四日，春色正中分。绿野徘徊月，晴天断续云。', tagBg: '#d0fae5', tagColor: '#047857', avatarBg: '#fef3c6' },
        { id: 5, term: '清明', title: '清明', author: '杜牧', dynasty: '唐', content: '清明时节雨纷纷，路上行人欲断魂。', tagBg: '#d0fae5', tagColor: '#047857', avatarBg: '#fef3c6' },
        { id: 6, term: '谷雨', title: '谷雨', author: '王建', dynasty: '唐', content: '谷雨春光晓，山川黛色青。叶间鸣戴胜，泽水长浮萍。', tagBg: '#d0fae5', tagColor: '#047857', avatarBg: '#fef3c6' }
      ]
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goDetail(id) { uni.navigateTo({ url: '/pages/poem-detail/poem-detail?id=' + id }) }
  }
}
</script>

<style scoped>
.poem-list-page { background: linear-gradient(180deg, #fff7ed 0%, #fff 25%); min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }

.pl-header { padding: 24rpx 32rpx 16rpx; }
.pl-title { font-size: 36rpx; font-weight: 800; color: #1e2939; }

.search-bar { display: flex; align-items: center; gap: 14rpx; margin: 0 32rpx 20rpx; padding: 18rpx 24rpx; background: #fff; border-radius: 30rpx; }
.search-svg { width: 28rpx; height: 28rpx; }
.search-placeholder { font-size: 26rpx; color: #99a1af; }

.banner { display: flex; align-items: center; gap: 16rpx; margin: 0 32rpx 20rpx; background: #fff7ed; border-radius: 16rpx; padding: 20rpx 24rpx; border: 1rpx solid #fed7aa; }
.banner-icon { width: 56rpx; height: 56rpx; border-radius: 14rpx; background: #ffedd4; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.bn-svg { width: 28rpx; height: 28rpx; }
.banner-info { flex: 1; }
.bn-title { display: block; font-size: 28rpx; font-weight: 700; color: #c2410c; margin-bottom: 4rpx; }
.bn-desc { display: block; font-size: 22rpx; color: #ea580c; }

.poem-list { padding: 0 32rpx; display: flex; flex-direction: column; gap: 16rpx; }
.poem-card { background: #fff; border-radius: 20rpx; padding: 24rpx; position: relative; overflow: hidden; }
.pc-bg { position: absolute; right: 0; top: 0; width: 220rpx; height: 100%; opacity: 0.15; }
.pc-content-wrap { position: relative; z-index: 1; }
.pc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14rpx; }
.pc-tag { padding: 6rpx 18rpx; border-radius: 30rpx; }
.pc-tag text { font-size: 22rpx; font-weight: 600; }
.pc-fav-svg { width: 28rpx; height: 28rpx; }
.pc-title { display: block; font-size: 32rpx; font-weight: 800; color: #1e2939; margin-bottom: 10rpx; }
.pc-content { display: block; font-size: 26rpx; color: #4a5565; line-height: 1.6; margin-bottom: 18rpx; }

.pc-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 14rpx; border-top: 1rpx solid #f3f4f6; }
.pc-author { display: flex; align-items: center; gap: 12rpx; }
.pc-avatar { width: 48rpx; height: 48rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24rpx; font-weight: 700; color: #c2410c; }
.pc-author-info { display: flex; flex-direction: column; }
.pc-name { font-size: 24rpx; font-weight: 600; color: #1e2939; }
.pc-dynasty { font-size: 20rpx; color: #6a7282; }

.pc-read { display: flex; align-items: center; gap: 4rpx; }
.pc-read-text { font-size: 24rpx; color: #ff6900; font-weight: 600; }
.pc-read-arrow { font-size: 26rpx; color: #ff6900; font-weight: 600; }
</style>
