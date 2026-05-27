<template>
  <view class="ip-page">
    <view class="status-bar"></view>

    <view class="ip-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <view class="term-tag" :style="{ background: termData.bgColor, color: termData.color }">
        <text>{{ termData.name }}</text>
      </view>
      <view class="fav-btn" @tap="toggleFav">
        <image class="hdr-svg" :src="svgIcon('heart', faved ? '#fb2c36' : '#99a1af')" mode="aspectFit" />
      </view>
    </view>

    <view class="ip-card">
      <view class="ip-media-wrap">
        <image class="ip-img" :src="termData.ipImage" mode="aspectFit" />
        <video
          v-if="animationSrc"
          class="ip-anim-video"
          :src="animationSrc"
          :autoplay="true"
          :loop="true"
          :muted="true"
          :show-play-btn="false"
          :show-center-play-btn="false"
          :controls="false"
          :show-fullscreen-btn="false"
          :show-progress="false"
          :enable-progress-gesture="false"
          object-fit="contain"
        ></video>
      </view>
    </view>

    <view class="info-section">
      <view class="info-title-row">
        <image class="info-title-svg" :src="svgIcon('book','#00bc7d')" mode="aspectFit" />
        <text class="info-title">形象介绍</text>
      </view>

      <view class="info-card">
        <view class="info-row">
          <text class="info-label">姓名：</text>
          <text class="info-value">{{ termData.name }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">性格：</text>
          <text class="info-value">{{ termData.personality }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">形象：</text>
          <text class="info-value">{{ termData.appearance }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">寄语：</text>
          <text class="info-value">{{ termData.greeting }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'
import { solarTerms } from '../../utils/solar-terms.js'

const animTermIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 23, 24]

const ipData = {
  1: { personality: '温婉灵动，心怀期许，自带春日的温柔气息', appearance: '梳着典雅的双环望仙髻，点缀明艳的黄色花饰与朱红发带，额间饰精致花钿。身着暖黄底色绣满繁花的襦裙，双手合十，神态恬静安然。身旁飞燕轻拂，远山青草相映，满是春日的鲜活与美好', greeting: '春序启，万事皆可期，愿你如春日草木，向阳生长，所愿皆所得。' },
  2: { personality: '柔和静雅，润物无声，宛若春雨般温润', appearance: '身着水蓝色衣裙，手持油纸伞，发间点缀雨滴形玉饰。身形纤细柔美，眼波含春雨润意', greeting: '好雨知时节，当春乃发生。愿你被温柔以待。' },
  3: { personality: '活泼俏皮，充满生机，如惊雷般唤醒沉寂', appearance: '身着嫩绿底绣虫蝶的春装，发髻间点缀小虫饰物。眼神灵动明亮，微微张口似在倾听春雷', greeting: '春雷动，万物醒。愿你也能觉醒内心的力量。' },
  4: { personality: '端庄均衡，不偏不倚，如昼夜等分般公正', appearance: '身着半绿半粉的春装，象征昼夜等分。发间簪花对称，手持春秤，神态从容', greeting: '春分至，昼夜均。愿你的生活张弛有度，恰到好处。' },
  5: { personality: '清雅脱俗，怀念故人，带着淡淡哀思', appearance: '身着素雅白绿长裙，手持柳枝，发间插白花。神情温柔而略带忧伤', greeting: '清明时节，缅怀过往，珍惜当下，砥砺前行。' },
  6: { personality: '勤劳灵动，清新温婉，浸润着春日生机与茶香', appearance: '发鬓簪着粉嫩牡丹，柔顺发丝更添柔美。身着淡绿底绣繁花的襦裙，置身茶园间，俯身轻采嫩绿茶芽，竹蓝渐满。背景茶山连绵，绿意盎然，谷雨的润泽与她的灵动相融', greeting: '谷雨生，茶香溢，愿你采撷春光，收获满满，生活芬雅致。' },
}

export default {
  data() {
    return {
      termId: 1,
      faved: false
    }
  },
  computed: {
    termData() {
      const term = solarTerms.find(t => t.id === this.termId) || solarTerms[0]
      const ip = ipData[this.termId] || { personality: '温柔善良，热爱自然', appearance: '身着节气特色服饰，形象优美', greeting: '愿你感受节气之美，与自然同行。' }
      return {
        ...term,
        personality: ip.personality,
        appearance: ip.appearance,
        greeting: ip.greeting,
        ipImage: `/static/ip/ip${this.termId}.png`
      }
    },
    animationSrc() {
      if (animTermIds.includes(this.termId)) {
        return `/static/animation/anim${this.termId}.mp4`
      }
      return ''
    }
  },
  onLoad(options) {
    if (options.id) this.termId = parseInt(options.id)
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.switchTab({ url: '/pages/index/index' })
    },
    toggleFav() { this.faved = !this.faved }
  }
}
</script>

<style scoped>
.ip-page { background: linear-gradient(180deg, #e8f5e9 0%, #fff 30%); min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }

.ip-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn, .fav-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: rgba(255,255,255,0.8); display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.term-tag { padding: 8rpx 28rpx; border-radius: 30rpx; font-size: 26rpx; font-weight: 600; }

.ip-card { margin: 16rpx 32rpx; background: #fff; border-radius: 24rpx; overflow: hidden; box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.06); }
.ip-media-wrap { position: relative; width: 100%; height: 600rpx; }
.ip-img { width: 100%; height: 600rpx; }
.ip-anim-video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2; }

.info-section { padding: 28rpx 32rpx; }
.info-title-row { display: flex; align-items: center; gap: 10rpx; margin-bottom: 20rpx; }
.info-title-svg { width: 32rpx; height: 32rpx; }
.info-title { font-size: 32rpx; font-weight: 700; color: #1e2939; }

.info-card { background: #fff; border-radius: 20rpx; padding: 28rpx; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.04); }
.info-row { margin-bottom: 20rpx; line-height: 1.7; }
.info-row:last-child { margin-bottom: 0; }
.info-label { font-size: 28rpx; font-weight: 700; color: #1e2939; }
.info-value { font-size: 26rpx; color: #4b5563; }
</style>
