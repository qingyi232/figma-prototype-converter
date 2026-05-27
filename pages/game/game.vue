<template>
  <view class="game-page">
    <view class="status-bar"></view>

    <view class="game-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgArrow" mode="aspectFit" />
      </view>
      <view class="header-center">
        <text class="header-title">{{ currentChapter }}</text>
        <text class="header-progress">{{ currentQ + 1 }} / {{ questions.length }}</text>
      </view>
      <view style="width:72rpx"></view>
    </view>

    <view class="progress-bar">
      <view class="progress-fill" :style="{ width: ((currentQ + 1) / questions.length * 100) + '%' }"></view>
    </view>

    <view v-if="currentQ < questions.length">
      <view class="question-card">
        <view class="q-badge"><text class="q-badge-text">Q{{ currentQ + 1 }}</text></view>
        <text class="q-text">{{ questions[currentQ].q }}</text>
        <view class="q-points">
          <image class="q-pts-svg" :src="svgTrophy" mode="aspectFit" />
          <text class="q-points-text">+{{ questions[currentQ].pts || 20 }} 积分</text>
        </view>
      </view>

      <view class="options-list">
        <view
          v-for="(opt, i) in questions[currentQ].opts"
          :key="i"
          :class="['option-item', { correct: showResult && i === questions[currentQ].answer, wrong: showResult && selectedOpt === i && i !== questions[currentQ].answer }]"
          @tap="selectOption(i)"
        >
          <view :class="['opt-letter', { 'ol-correct': showResult && i === questions[currentQ].answer, 'ol-wrong': showResult && selectedOpt === i && i !== questions[currentQ].answer }]">
            <text>{{ ['A','B','C','D'][i] }}</text>
          </view>
          <text class="opt-text">{{ opt }}</text>
          <image v-if="showResult && i === questions[currentQ].answer" class="opt-mark" :src="svgCheck" mode="aspectFit" />
          <image v-if="showResult && selectedOpt === i && i !== questions[currentQ].answer" class="opt-mark" :src="svgCross" mode="aspectFit" />
        </view>
      </view>

      <view class="knowledge-box" v-if="showResult && questions[currentQ].tip">
        <view class="kb-head">
          <image class="kb-svg" :src="svgBulb" mode="aspectFit" />
          <text class="kb-title">知识点</text>
        </view>
        <text class="kb-text">{{ questions[currentQ].tip }}</text>
      </view>

      <button class="next-btn" v-if="showResult" @tap="nextQuestion">
        {{ currentQ < questions.length - 1 ? '下一题  →' : '查看结果' }}
      </button>
    </view>

    <view class="result-area" v-else>
      <view class="result-trophy">
        <image class="rt-svg" :src="svgTrophyLg" mode="aspectFit" />
      </view>
      <text class="result-title">挑战完成！</text>
      <text class="result-chapter">{{ currentChapter }}</text>

      <view class="result-stats">
        <view class="rs-item">
          <text class="rs-num">{{ correctCount }}</text>
          <text class="rs-label">答对</text>
        </view>
        <view class="rs-item">
          <text class="rs-num rs-orange">{{ accuracy }}%</text>
          <text class="rs-label">正确率</text>
        </view>
        <view class="rs-item">
          <text class="rs-num rs-green">+{{ score }}</text>
          <text class="rs-label">积分</text>
        </view>
      </view>

      <view class="result-msg">
        <text>{{ resultMsg }}</text>
      </view>

      <button class="next-chapter-btn" v-if="termId < 24" @tap="nextChapter">下一章  →</button>
      <button class="back-list-btn" @tap="goBack">返回关卡列表</button>
      <button class="retry-btn" @tap="restart">再挑战一次</button>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'
import { getChapterQuestions } from '../../utils/quiz-data.js'

export default {
  data() {
    return {
      termId: 1,
      currentChapter: '',
      currentQ: 0,
      score: 0,
      correctCount: 0,
      selectedOpt: -1,
      showResult: false,
      questions: []
    }
  },
  computed: {
    accuracy() { return this.questions.length ? Math.round(this.correctCount / this.questions.length * 100) : 0 },
    resultMsg() {
      const a = this.accuracy
      if (a >= 80) return '太棒了！你是节气小达人！'
      if (a >= 60) return '不错哦！继续加油！'
      return '加油！多学习节气知识吧！'
    },
    svgArrow() { return makeSvg('arrowLeft', '#1e2939') },
    svgTrophy() { return makeSvg('trophy', '#e17100') },
    svgTrophyLg() { return makeSvg('trophy', '#00bc7d') },
    svgCheck() { return makeSvg('check', '#00bc7d') },
    svgCross() { return makeSvg('crossMark', '#fb2c36') },
    svgBulb() { return makeSvg('bulb', '#f59e0b') }
  },
  onLoad(options) {
    this.termId = options.id ? parseInt(options.id) : 1
    this.loadChapter(this.termId)
  },
  methods: {
    loadChapter(id) {
      const data = getChapterQuestions(id)
      if (data) {
        this.termId = id
        this.currentChapter = data.chapter
        this.questions = data.questions
        this.currentQ = 0
        this.score = 0
        this.correctCount = 0
        this.selectedOpt = -1
        this.showResult = false
      }
    },
    selectOption(i) {
      if (this.showResult) return
      this.selectedOpt = i
      this.showResult = true
      if (i === this.questions[this.currentQ].answer) {
        this.score += (this.questions[this.currentQ].pts || 20)
        this.correctCount++
      }
    },
    nextQuestion() {
      this.currentQ++
      this.selectedOpt = -1
      this.showResult = false
    },
    nextChapter() {
      this.loadChapter(this.termId + 1)
    },
    restart() {
      this.loadChapter(this.termId)
    },
    goBack() { uni.navigateBack() }
  }
}
</script>

<style scoped>
.game-page { background: #f5f5f5; min-height: 100vh; }
.status-bar { height: 44px; }

.game-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 36rpx; height: 36rpx; }
.header-center { text-align: center; }
.header-title { display: block; font-size: 30rpx; font-weight: 700; color: #1e2939; }
.header-progress { display: block; font-size: 22rpx; color: #6a7282; }

.progress-bar { margin: 0 32rpx 28rpx; height: 10rpx; background: #e5e7eb; border-radius: 5rpx; }
.progress-fill { height: 100%; background: #00bc7d; border-radius: 5rpx; transition: width 0.3s; }

.question-card { margin: 0 32rpx 24rpx; background: #fff; border-radius: 20rpx; padding: 28rpx; }
.q-badge { width: 56rpx; height: 56rpx; border-radius: 50%; background: #d0fae5; display: flex; align-items: center; justify-content: center; margin-bottom: 16rpx; }
.q-badge-text { font-size: 24rpx; color: #00bc7d; font-weight: 700; }
.q-text { display: block; font-size: 30rpx; font-weight: 600; color: #1e2939; line-height: 1.6; margin-bottom: 16rpx; }
.q-points { display: flex; align-items: center; gap: 8rpx; }
.q-pts-svg { width: 28rpx; height: 28rpx; }
.q-points-text { font-size: 24rpx; color: #e17100; font-weight: 600; }

.options-list { padding: 0 32rpx; display: flex; flex-direction: column; gap: 16rpx; }
.option-item { display: flex; align-items: center; gap: 20rpx; background: #fff; border-radius: 16rpx; padding: 28rpx 24rpx; border: 2rpx solid #e5e7eb; transition: all 0.25s; }
.option-item.correct { border-color: #00bc7d; background: #d0fae5; }
.option-item.wrong { border-color: #fb2c36; background: #fee2e2; }
.opt-letter { width: 48rpx; height: 48rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 24rpx; font-weight: 700; color: #6a7282; flex-shrink: 0; transition: all 0.25s; }
.ol-correct { background: #00bc7d; color: #fff; }
.ol-wrong { background: #fb2c36; color: #fff; }
.opt-text { flex: 1; font-size: 28rpx; color: #1e2939; }
.opt-mark { width: 32rpx; height: 32rpx; flex-shrink: 0; }

.knowledge-box { margin: 20rpx 32rpx 0; background: #fffbeb; border-radius: 16rpx; padding: 24rpx; border: 2rpx solid #fef3c6; }
.kb-head { display: flex; align-items: center; gap: 8rpx; margin-bottom: 10rpx; }
.kb-svg { width: 28rpx; height: 28rpx; }
.kb-title { font-size: 26rpx; font-weight: 700; color: #92400e; }
.kb-text { font-size: 24rpx; color: #78350f; line-height: 1.7; }

.next-btn { margin: 28rpx 32rpx 40rpx; width: calc(100% - 64rpx); height: 88rpx; line-height: 88rpx; background: #00bc7d; color: #fff; font-size: 28rpx; font-weight: 600; border-radius: 44rpx; border: none; }
.next-btn::after { border: none; }

.result-area { padding: 80rpx 32rpx 40rpx; text-align: center; }
.result-trophy { width: 120rpx; height: 120rpx; border-radius: 50%; background: #d0fae5; display: flex; align-items: center; justify-content: center; margin: 0 auto 24rpx; }
.rt-svg { width: 64rpx; height: 64rpx; }
.result-title { display: block; font-size: 40rpx; font-weight: 800; color: #1e2939; margin-bottom: 8rpx; }
.result-chapter { display: block; font-size: 26rpx; color: #6a7282; margin-bottom: 32rpx; }

.result-stats { display: flex; justify-content: center; gap: 20rpx; margin-bottom: 28rpx; }
.rs-item { width: 160rpx; background: #f3f4f6; border-radius: 16rpx; padding: 24rpx 16rpx; text-align: center; }
.rs-num { display: block; font-size: 36rpx; font-weight: 800; color: #1e2939; margin-bottom: 6rpx; }
.rs-num.rs-orange { color: #e17100; }
.rs-num.rs-green { color: #00bc7d; }
.rs-label { display: block; font-size: 22rpx; color: #6a7282; }

.result-msg { background: #f3f4f6; border-radius: 12rpx; padding: 20rpx 24rpx; margin-bottom: 32rpx; font-size: 26rpx; color: #1e2939; }

.next-chapter-btn { margin-bottom: 16rpx; width: 100%; height: 88rpx; line-height: 88rpx; background: #e17100; color: #fff; font-size: 28rpx; font-weight: 600; border-radius: 44rpx; border: none; }
.next-chapter-btn::after { border: none; }
.back-list-btn { margin-bottom: 16rpx; width: 100%; height: 88rpx; line-height: 88rpx; background: #00bc7d; color: #fff; font-size: 28rpx; font-weight: 600; border-radius: 44rpx; border: none; }
.back-list-btn::after { border: none; }
.retry-btn { width: 100%; height: 88rpx; line-height: 88rpx; background: #fff; color: #1e2939; font-size: 28rpx; font-weight: 600; border-radius: 44rpx; border: 2rpx solid #e5e7eb; }
.retry-btn::after { border: none; }
</style>
