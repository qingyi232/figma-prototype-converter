<template>
  <view class="detail-page" v-if="term">
    <!-- Hero图片区域 -->
    <view class="hero-section">
      <image class="hero-img" :src="term.image" mode="aspectFill" />
      <view class="hero-overlay"></view>
      <view class="hero-nav">
        <view class="nav-btn" @tap="goBack"><image class="nav-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" /></view>
        <view class="nav-btn"><image class="nav-svg" :src="svgIcon('share','#1e2939')" mode="aspectFit" /></view>
      </view>
      <view class="hero-info">
        <view class="hero-badge">
          <image class="badge-svg" :src="svgIcon('leaf','#fff')" mode="aspectFit" />
          <text class="badge-date">{{ term.date }}</text>
        </view>
        <text class="hero-name">{{ term.name }}</text>
        <text class="hero-desc">{{ term.desc.substring(0, 30) }}</text>
      </view>
    </view>

    <!-- 白色内容区域 -->
    <view class="content-area">
      <!-- 物候气象 -->
      <view class="section">
        <view class="section-title-row">
          <image class="st-svg" :src="svgIcon('thermometer','#364153')" mode="aspectFit" />
          <text class="section-title">物候气象</text>
        </view>
        <view class="phenology-card">
          <text class="phenology-text">{{ getPhenology() }}</text>
        </view>
      </view>

      <!-- 民俗习惯 -->
      <view class="section">
        <view class="section-title-row">
          <image class="st-svg" :src="svgIcon('book','#364153')" mode="aspectFit" />
          <text class="section-title">民俗习惯</text>
        </view>
        <view class="custom-tags">
          <view class="custom-tag" v-for="(c, i) in customsList" :key="i">
            <text>{{ c }}</text>
          </view>
        </view>
        <text class="customs-full">{{ term.customs }}</text>
      </view>

      <!-- 时令饮食 -->
      <view class="section">
        <view class="section-title-row">
          <image class="st-svg" :src="svgIcon('fork','#364153')" mode="aspectFit" />
          <text class="section-title">时令饮食</text>
        </view>
        <view class="food-cards">
          <view class="food-card" v-for="(f, i) in foodList" :key="i">
            <view class="food-icon-wrap">
              <image class="food-img" :src="'/static/food/food' + term.id + '.png'" mode="aspectFill" />
            </view>
            <text class="food-name">{{ f }}</text>
          </view>
        </view>
      </view>

      <!-- 诗词赏析 -->
      <view class="section">
        <view class="section-title-row">
          <image class="st-svg" :src="svgIcon('scroll','#364153')" mode="aspectFit" />
          <text class="section-title">诗词赏析</text>
        </view>
        <text class="poem-text">{{ term.poem }}</text>
      </view>

      <!-- IP形象 & 时令美食按钮 -->
      <view class="action-row">
        <view class="action-btn light" @tap="goPoem">
          <image class="ab-svg" :src="svgIcon('user','#364153')" mode="aspectFit" />
          <text>IP形象</text>
        </view>
        <view class="action-btn dark" @tap="goFood">
          <image class="ab-svg" :src="svgIcon('fork','#fff')" mode="aspectFit" />
          <text>时令美食</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { solarTerms } from '../../utils/solar-terms.js'
import { makeSvg } from '../../utils/svg-icons.js'

const phenologyMap = {
  1: '东风解冻，蛰虫始振，鱼陟负冰',
  2: '獭祭鱼，鸿雁来，草木萌动',
  3: '桃始华，仓庚鸣，鹰化为鸠',
  4: '玄鸟至，雷乃发声，始电',
  5: '桐始华，田鼠化为鸿，虹始见',
  6: '萍始生，鸣鸠拂其羽，戴胜降于桑',
  7: '蝼蝈鸣，蚯蚓出，王瓜生',
  8: '苦菜秀，靡草死，麦秋至',
  9: '螳螂生，鵙始鸣，反舌无声',
  10: '鹿角解，蜩始鸣，半夏生',
  11: '温风至，蟋蟀居壁，鹰始挚',
  12: '腐草为萤，土润溽暑，大雨时行',
  13: '凉风至，白露降，寒蝉鸣',
  14: '鹰乃祭鸟，天地始肃，禾乃登',
  15: '鸿雁来，玄鸟归，群鸟养羞',
  16: '雷始收声，蛰虫坯户，水始涸',
  17: '鸿雁来宾，雀入大水为蛤，菊有黄华',
  18: '豺乃祭兽，草木黄落，蛰虫咸俯',
  19: '水始冰，地始冻，雉入大水为蜃',
  20: '虹藏不见，天气上升地气下降，闭塞成冬',
  21: '鹖鴠不鸣，虎始交，荔挺出',
  22: '蚯蚓结，麋角解，水泉动',
  23: '雁北乡，鹊始巢，雉始雊',
  24: '鸡乳，征鸟厉疾，水泽腹坚'
}

export default {
  data() {
    return { term: null, prevTerm: null, nextTerm: null }
  },
  computed: {
    customsList() { return this.term ? this.term.customs.split('、').slice(0, 3) : [] },
    foodList() { return this.term ? this.term.food.split('、') : [] }
  },
  onLoad(options) { this.loadTerm(Number(options.id)) },
  methods: {
    loadTerm(id) {
      const idx = solarTerms.findIndex(t => t.id === id)
      if (idx >= 0) {
        this.term = solarTerms[idx]
        this.prevTerm = idx > 0 ? solarTerms[idx - 1] : null
        this.nextTerm = idx < solarTerms.length - 1 ? solarTerms[idx + 1] : null
      }
    },
    getPhenology() {
      return phenologyMap[this.term.id] || this.term.desc.substring(0, 20)
    },
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.switchTab({ url: '/pages/index/index' })
    },
    goPoem() { uni.navigateTo({ url: '/pages/ip/ip?id=' + this.term.id }) },
    goFood() { uni.navigateTo({ url: '/pages/food-detail/food-detail?id=' + this.term.id }) }
  }
}
</script>

<style scoped>
.detail-page { min-height: 100vh; background: #f5f5f5; }

.hero-section { position: relative; height: 536rpx; background: linear-gradient(135deg, #43a047, #2e7d32); }
.hero-img { width: 100%; height: 100%; object-fit: cover; }
.hero-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%); z-index: 2; }
.hero-nav { position: absolute; top: 80rpx; left: 24rpx; right: 24rpx; display: flex; justify-content: space-between; z-index: 5; }
.nav-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; }
.nav-svg { width: 32rpx; height: 32rpx; }
.hero-info { position: absolute; bottom: 40rpx; left: 40rpx; right: 40rpx; z-index: 5; }
.hero-badge { display: flex; align-items: center; gap: 8rpx; margin-bottom: 12rpx; }
.badge-svg { width: 28rpx; height: 28rpx; }
.badge-date { font-size: 24rpx; color: #fff; opacity: 0.9; }
.hero-name { display: block; font-size: 72rpx; font-weight: 800; color: #fff; letter-spacing: 8rpx; margin-bottom: 8rpx; }
.hero-desc { display: block; font-size: 24rpx; color: rgba(255,255,255,0.85); }

.content-area { margin-top: -40rpx; background: #fff; border-radius: 40rpx 40rpx 0 0; padding: 40rpx 32rpx; position: relative; z-index: 3; }

.section { margin-bottom: 40rpx; padding-bottom: 32rpx; border-bottom: 1rpx solid #f3f4f6; }
.section:last-of-type { border-bottom: none; }
.section-title-row { display: flex; align-items: center; gap: 12rpx; margin-bottom: 20rpx; }
.st-svg { width: 32rpx; height: 32rpx; }
.section-title { font-size: 32rpx; font-weight: 700; color: #1e2939; }

.phenology-card { background: #d0fae5; border-radius: 16rpx; padding: 24rpx 28rpx; }
.phenology-text { font-size: 26rpx; color: #1e2939; line-height: 1.6; }

.custom-tags { display: flex; gap: 16rpx; margin-bottom: 16rpx; }
.custom-tag { padding: 10rpx 28rpx; border: 2rpx solid #e5e7eb; border-radius: 30rpx; font-size: 26rpx; color: #364153; }
.customs-full { display: block; font-size: 24rpx; color: #6a7282; line-height: 1.6; }

.food-cards { display: flex; gap: 16rpx; }
.food-card { flex: 1; background: #f9fafb; border-radius: 16rpx; padding: 28rpx 16rpx; display: flex; flex-direction: column; align-items: center; gap: 12rpx; border: 1rpx solid #f3f4f6; }
.food-icon-wrap { width: 72rpx; height: 72rpx; border-radius: 50%; background: #d0fae5; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.food-img { width: 72rpx; height: 72rpx; border-radius: 50%; }

.food-name { font-size: 26rpx; color: #1e2939; font-weight: 500; }

.poem-text { display: block; font-size: 26rpx; color: #364153; line-height: 2; white-space: pre-line; }

.action-row { display: flex; gap: 16rpx; margin-top: 20rpx; }
.action-btn { flex: 1; height: 94rpx; border-radius: 16rpx; display: flex; align-items: center; justify-content: center; gap: 8rpx; font-size: 28rpx; font-weight: 600; }
.action-btn.light { background: #f1f5f9; color: #364153; }
.action-btn.dark { background: #00bc7d; color: #fff; }
.ab-svg { width: 28rpx; height: 28rpx; }
</style>
