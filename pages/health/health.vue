<template>
  <view class="health-page">
    <view class="status-bar"></view>

    <view class="hp-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="hp-title">答题闯关</text>
      <view style="width:72rpx"></view>
    </view>

    <!-- 紫色积分卡 -->
    <view class="points-banner">
      <view class="pb-top">
        <view class="pb-trophy">
          <image class="pb-tr-svg" :src="svgIcon('trophy','#fff')" mode="aspectFit" />
        </view>
        <view class="pb-info">
          <text class="pb-label">我的积分</text>
          <text class="pb-num">1280</text>
        </view>
        <view class="pb-detail-btn" @tap="goPoints">
          <text>积分详情</text>
        </view>
      </view>
      <view class="pb-bottom">
        <text class="pb-hint">答题得积分，兑换心仪好物</text>
        <image class="pb-bolt" :src="svgIcon('star','#fff')" mode="aspectFit" />
      </view>
    </view>

    <!-- 闯关规则 -->
    <view class="rules-section">
      <view class="rules-title-row">
        <image class="rt-svg" :src="svgIcon('target','#fb2c36')" mode="aspectFit" />
        <text class="rules-title">闯关规则</text>
      </view>
      <view class="rules-card">
        <view class="rule-item">
          <view class="dot"></view>
          <text>每个关卡包含5道题目，答对即可获得积分</text>
        </view>
        <view class="rule-item">
          <view class="dot"></view>
          <text>部分关卡需要达到一定积分才能解锁</text>
        </view>
        <view class="rule-item">
          <view class="dot"></view>
          <text>获得的积分可以在商城兑换商品</text>
        </view>
      </view>
    </view>

    <!-- 选择关卡 -->
    <text class="section-title">选择关卡</text>
    <view class="level-list">
      <view
        v-for="lv in levels"
        :key="lv.id"
        class="level-card"
        @tap="goGame(lv)"
      >
        <view class="lc-info">
          <view class="lc-title-row">
            <text class="lc-name">{{ lv.name }}</text>
            <view class="lc-tag" :style="{ background: lv.tagBg, color: lv.tagColor }"><text>{{ lv.difficulty }}</text></view>
          </view>
          <text class="lc-desc">{{ lv.desc }}</text>
          <view class="lc-meta">
            <view class="lc-meta-item">
              <image class="lc-meta-svg" :src="svgIcon('note','#6a7282')" mode="aspectFit" />
              <text class="lc-meta-text">{{ lv.questions }}题</text>
            </view>
            <view class="lc-meta-item">
              <image class="lc-meta-svg" :src="svgIcon('star','#f59e0b')" mode="aspectFit" />
              <text class="lc-meta-text">{{ lv.points }}积分</text>
            </view>
          </view>
        </view>
        <view class="lc-action">
          <view class="lc-action-btn">
            <image class="lc-act-svg" :src="svgIcon('star','#00bc7d')" mode="aspectFit" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'
import { solarTerms } from '../../utils/solar-terms.js'
import { getAllChapters, getTotalQuestionCount } from '../../utils/quiz-data.js'

const difficultyMap = {
  1: { difficulty: '简单', tagBg: '#d0fae5', tagColor: '#047857' },
  2: { difficulty: '简单', tagBg: '#d0fae5', tagColor: '#047857' },
  3: { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' },
  4: { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' },
  5: { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' },
  6: { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' },
  7: { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' },
  8: { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' },
  9: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  10: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  11: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  12: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  13: { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' },
  14: { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' },
  15: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  16: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  17: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  18: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  19: { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' },
  20: { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' },
  21: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  22: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  23: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' },
  24: { difficulty: '困难', tagBg: '#fee2e2', tagColor: '#991b1b' }
}

export default {
  data() {
    const terms = solarTerms
    const chapters = getAllChapters()
    const levels = chapters.map(ch => {
      const term = terms.find(t => t.id === ch.id)
      const diff = difficultyMap[ch.id] || { difficulty: '中等', tagBg: '#fef3c6', tagColor: '#92400e' }
      return {
        id: ch.id,
        name: ch.chapter,
        ...diff,
        desc: term ? term.desc.substring(0, 8) : '',
        questions: ch.questionCount,
        points: ch.questionCount * 20
      }
    })
    return {
      levels,
      totalQuestions: getTotalQuestionCount()
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() { uni.navigateBack() },
    goPoints() { uni.navigateTo({ url: '/pages/points/points' }) },
    goGame(lv) { uni.navigateTo({ url: '/pages/game/game?id=' + lv.id }) }
  }
}
</script>

<style scoped>
.health-page { background: linear-gradient(180deg, #f5f3ff 0%, #fff 25%); min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }

.hp-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.hp-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.points-banner { margin: 0 32rpx 24rpx; background: linear-gradient(135deg, #6366f1 0%, #a78bfa 60%, #c084fc 100%); border-radius: 24rpx; padding: 28rpx; color: #fff; }
.pb-top { display: flex; align-items: center; gap: 16rpx; margin-bottom: 18rpx; }
.pb-trophy { width: 80rpx; height: 80rpx; border-radius: 18rpx; background: rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; }
.pb-tr-svg { width: 40rpx; height: 40rpx; }
.pb-info { flex: 1; }
.pb-label { display: block; font-size: 22rpx; opacity: 0.85; }
.pb-num { display: block; font-size: 44rpx; font-weight: 800; line-height: 1.1; }
.pb-detail-btn { background: rgba(255,255,255,0.2); padding: 10rpx 18rpx; border-radius: 30rpx; }
.pb-detail-btn text { font-size: 22rpx; color: #fff; }

.pb-bottom { display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.15); border-radius: 14rpx; padding: 14rpx 20rpx; }
.pb-hint { font-size: 24rpx; opacity: 0.9; }
.pb-bolt { width: 28rpx; height: 28rpx; }

.rules-section { padding: 0 32rpx; margin-bottom: 24rpx; }
.rules-title-row { display: flex; align-items: center; gap: 8rpx; margin-bottom: 14rpx; }
.rt-svg { width: 26rpx; height: 26rpx; }
.rules-title { font-size: 26rpx; font-weight: 600; color: #4a5565; }
.rules-card { background: #fff; border-radius: 20rpx; padding: 24rpx 28rpx; }
.rule-item { display: flex; align-items: flex-start; gap: 12rpx; margin-bottom: 14rpx; }
.rule-item:last-child { margin-bottom: 0; }
.rule-item .dot { width: 12rpx; height: 12rpx; border-radius: 50%; background: #6366f1; margin-top: 14rpx; flex-shrink: 0; }
.rule-item text { font-size: 26rpx; color: #4a5565; line-height: 1.6; }

.section-title { display: block; font-size: 26rpx; color: #4a5565; padding: 0 32rpx; margin-bottom: 14rpx; }

.level-list { padding: 0 32rpx; display: flex; flex-direction: column; gap: 14rpx; }
.level-card { display: flex; align-items: center; background: #fff; border-radius: 20rpx; padding: 24rpx; gap: 16rpx; }
.lc-info { flex: 1; }
.lc-title-row { display: flex; align-items: center; gap: 12rpx; margin-bottom: 8rpx; }
.lc-name { font-size: 30rpx; font-weight: 700; color: #1e2939; }
.lc-tag { padding: 4rpx 12rpx; border-radius: 6rpx; }
.lc-tag text { font-size: 20rpx; font-weight: 600; }
.lc-desc { display: block; font-size: 24rpx; color: #6a7282; margin-bottom: 12rpx; }
.lc-meta { display: flex; gap: 16rpx; }
.lc-meta-item { display: flex; align-items: center; gap: 4rpx; }
.lc-meta-svg { width: 22rpx; height: 22rpx; }
.lc-meta-text { font-size: 22rpx; color: #6a7282; }

.lc-action-btn { width: 80rpx; height: 80rpx; border-radius: 50%; background: #d0fae5; display: flex; align-items: center; justify-content: center; }
.lc-act-svg { width: 36rpx; height: 36rpx; }
</style>
