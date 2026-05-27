<template>
  <view class="food-detail-page" v-if="term">
    <view class="status-bar"></view>

    <!-- Hero 图片 -->
    <view class="hero-section">
      <image class="hero-img" :src="foodImage" mode="aspectFill" />
      <view class="hero-overlay"></view>
      <view class="hero-nav">
        <view class="nav-btn" @tap="goBack">
          <image class="nav-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
        </view>
      </view>
      <view class="hero-info">
        <view class="hero-tags">
          <view class="hero-tag green"><text>{{ term.name }}</text></view>
          <view class="hero-rating">
            <image class="hr-svg" :src="svgIcon('star','#f59e0b')" mode="aspectFit" />
            <text class="hr-text">{{ rating }}</text>
          </view>
        </view>
        <text class="hero-name">{{ foodName }}</text>
        <text class="hero-desc">{{ foodDesc }}</text>
      </view>
    </view>

    <!-- 统计卡片 -->
    <view class="stats-card">
      <view class="stat-item">
        <view class="stat-icon" style="background:#d0fae5">
          <image class="si-svg" :src="svgIcon('clock','#00bc7d')" mode="aspectFit" />
        </view>
        <text class="stat-label">烹饪时间</text>
        <text class="stat-value">{{ cookTime }}</text>
      </view>
      <view class="stat-item">
        <view class="stat-icon" style="background:#d0fae5">
          <image class="si-svg" :src="svgIcon('fork','#00bc7d')" mode="aspectFit" />
        </view>
        <text class="stat-label">难度</text>
        <text class="stat-value">{{ difficulty }}</text>
      </view>
      <view class="stat-item">
        <view class="stat-icon" style="background:#d0fae5">
          <image class="si-svg" :src="svgIcon('heart','#00bc7d')" mode="aspectFit" />
        </view>
        <text class="stat-label">养生功效</text>
        <text class="stat-value">{{ healthEffect }}</text>
      </view>
    </view>

    <!-- 食材准备 -->
    <view class="section">
      <view class="section-title-row">
        <image class="st-svg" :src="svgIcon('leaf','#00bc7d')" mode="aspectFit" />
        <text class="section-title">食材准备</text>
      </view>
      <view class="ingredients-card">
        <view class="ing-group">
          <text class="ing-label">主料</text>
          <view class="ing-list">
            <view class="ing-item" v-for="(ing, i) in mainIngredients" :key="i">
              <view class="ing-dot"></view>
              <text>{{ ing }}</text>
            </view>
          </view>
        </view>
        <view class="ing-divider"></view>
        <view class="ing-group">
          <text class="ing-label">调料</text>
          <view class="ing-list">
            <view class="ing-item" v-for="(ing, i) in seasonings" :key="i">
              <view class="ing-dot"></view>
              <text>{{ ing }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 制作步骤 -->
    <view class="section">
      <view class="section-title-row">
        <image class="st-svg" :src="svgIcon('book','#f59e0b')" mode="aspectFit" />
        <text class="section-title">制作步骤</text>
      </view>
      <view class="steps-list">
        <view class="step-item" v-for="(step, i) in cookSteps" :key="i">
          <view class="step-num"><text>{{ i + 1 }}</text></view>
          <text class="step-text">{{ step }}</text>
        </view>
      </view>
    </view>

    <!-- 节气养生提示 -->
    <view class="section">
      <view class="section-title-row">
        <image class="st-svg" :src="svgIcon('bulb','#0ea5e9')" mode="aspectFit" />
        <text class="section-title">节气养生提示</text>
      </view>
      <view class="tip-card">
        <text class="tip-text">{{ healthTip }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { solarTerms } from '../../utils/solar-terms.js'
import { makeSvg } from '../../utils/svg-icons.js'

const foodData = {
  1: { name: '春饼卷菜', desc: '立春必吃春饼，卷入时令蔬菜，象征迎接春天，咬春尝鲜', cookTime: '30分钟', difficulty: '简单', healthEffect: '营养均衡', rating: 4.8, mainIngredients: ['面粉 300克', '豆芽 200克', '韭菜 100克', '胡萝卜丝 100克', '黄瓜丝 100克', '鸡蛋 2个'], seasonings: ['盐 适量', '香油 少许', '食用油 适量'], cookSteps: ['面粉加温水和成软面团，醒发30分钟', '将面团擀成薄饼，平底锅烙至两面金黄', '豆芽、韭菜焯水，胡萝卜丝、黄瓜丝切好', '鸡蛋摊薄饼切丝', '将所有食材卷入薄饼即可享用'], healthTip: '立春时节阳气初升，宜清淡饮食，多吃绿色蔬菜如韭菜、芹菜等，有助于肝气疏发。' },
  2: { name: '红枣山药粥', desc: '雨水时节健脾祛湿，红枣山药搭配滋补养生', cookTime: '40分钟', difficulty: '简单', healthEffect: '健脾祛湿', rating: 4.7, mainIngredients: ['大米 100克', '山药 200克', '红枣 10颗', '枸杞 适量'], seasonings: ['冰糖 适量'], cookSteps: ['大米淘洗干净，山药去皮切块', '红枣去核备用，枸杞洗净', '砂锅加水煮开，加入大米煮20分钟', '加入山药和红枣继续煮15分钟', '最后加入枸杞和冰糖，煮5分钟即可'], healthTip: '雨水时节湿气重，多食健脾食物有助于祛湿。' },
  3: { name: '香梨银耳羹', desc: '惊蛰润肺止咳，香梨银耳清润滋养', cookTime: '60分钟', difficulty: '中等', healthEffect: '润肺止咳', rating: 4.9, mainIngredients: ['银耳 1朵', '雪梨 2个', '红枣 8颗', '枸杞 适量'], seasonings: ['冰糖 适量'], cookSteps: ['银耳泡发后撕成小朵', '雪梨去皮切块，红枣去核', '砂锅加水煮开，放入银耳煮30分钟', '加入雪梨和红枣继续煮20分钟', '最后加入枸杞和冰糖，煮10分钟即可'], healthTip: '惊蛰节气干燥，应多食滋阴润肺的食物。' }
}

export default {
  data() {
    return {
      term: null
    }
  },
  computed: {
    foodImage() { return this.term ? `/static/food/food${this.term.id}.png` : '' },
    data() { return foodData[this.term?.id] || foodData[1] },
    foodName() { return this.data?.name || '节气美食' },
    foodDesc() { return this.data?.desc || '' },
    cookTime() { return this.data?.cookTime || '30分钟' },
    difficulty() { return this.data?.difficulty || '简单' },
    healthEffect() { return this.data?.healthEffect || '营养均衡' },
    rating() { return this.data?.rating || 4.5 },
    mainIngredients() { return this.data?.mainIngredients || [] },
    seasonings() { return this.data?.seasonings || [] },
    cookSteps() { return this.data?.cookSteps || [] },
    healthTip() { return this.data?.healthTip || (this.term?.health || '') }
  },
  onLoad(options) {
    if (options.id) {
      this.term = solarTerms.find(t => t.id === Number(options.id)) || solarTerms[0]
    } else {
      this.term = solarTerms[0]
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.navigateTo({ url: '/pages/food/food' })
    }
  }
}
</script>

<style scoped>
.food-detail-page { min-height: 100vh; background: #f5f5f5; padding-bottom: 40rpx; }
.status-bar { height: 44px; }

.hero-section { position: relative; height: 540rpx; }
.hero-img { width: 100%; height: 100%; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.6) 100%); }
.hero-nav { position: absolute; top: 16rpx; left: 24rpx; right: 24rpx; }
.nav-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; }
.nav-svg { width: 32rpx; height: 32rpx; }
.hero-info { position: absolute; bottom: 60rpx; left: 32rpx; right: 32rpx; color: #fff; }
.hero-tags { display: flex; align-items: center; gap: 12rpx; margin-bottom: 12rpx; }
.hero-tag { padding: 6rpx 18rpx; border-radius: 30rpx; }
.hero-tag.green { background: #d0fae5; }
.hero-tag.green text { color: #047857; font-size: 22rpx; font-weight: 600; }
.hero-rating { display: flex; align-items: center; gap: 4rpx; padding: 6rpx 14rpx; background: rgba(255,255,255,0.95); border-radius: 30rpx; }
.hr-svg { width: 22rpx; height: 22rpx; }
.hr-text { font-size: 22rpx; color: #1e2939; font-weight: 600; }
.hero-name { display: block; font-size: 56rpx; font-weight: 800; margin-bottom: 8rpx; }
.hero-desc { display: block; font-size: 24rpx; opacity: 0.9; line-height: 1.5; }

.stats-card { margin: -40rpx 32rpx 24rpx; background: #fff; border-radius: 24rpx; padding: 28rpx; display: flex; gap: 8rpx; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06); position: relative; z-index: 2; }
.stat-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6rpx; }
.stat-icon { width: 64rpx; height: 64rpx; border-radius: 16rpx; display: flex; align-items: center; justify-content: center; margin-bottom: 6rpx; }
.si-svg { width: 32rpx; height: 32rpx; }
.stat-label { font-size: 20rpx; color: #6a7282; }
.stat-value { font-size: 26rpx; font-weight: 700; color: #1e2939; }

.section { margin: 0 32rpx 24rpx; }
.section-title-row { display: flex; align-items: center; gap: 8rpx; margin-bottom: 14rpx; padding: 0 8rpx; }
.st-svg { width: 28rpx; height: 28rpx; }
.section-title { font-size: 30rpx; font-weight: 700; color: #1e2939; }

.ingredients-card { background: #fff; border-radius: 16rpx; padding: 24rpx; }
.ing-group { padding: 8rpx 0; }
.ing-label { display: block; font-size: 26rpx; font-weight: 700; color: #1e2939; margin-bottom: 14rpx; }
.ing-list { display: flex; flex-direction: column; gap: 12rpx; }
.ing-item { display: flex; align-items: center; gap: 12rpx; }
.ing-dot { width: 12rpx; height: 12rpx; border-radius: 50%; background: #00bc7d; flex-shrink: 0; }
.ing-item text { font-size: 26rpx; color: #4a5565; }
.ing-divider { height: 1rpx; background: #f3f4f6; margin: 16rpx 0; }

.steps-list { display: flex; flex-direction: column; gap: 14rpx; }
.step-item { display: flex; gap: 16rpx; background: #fff; border-radius: 16rpx; padding: 20rpx 24rpx; }
.step-num { width: 48rpx; height: 48rpx; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #fbbf24); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.step-num text { color: #fff; font-size: 24rpx; font-weight: 700; }
.step-text { flex: 1; font-size: 26rpx; color: #1e2939; line-height: 1.6; padding-top: 10rpx; }

.tip-card { background: #f0f9ff; border: 1rpx solid #bae6fd; border-radius: 16rpx; padding: 24rpx; }
.tip-text { font-size: 26rpx; color: #1e40af; line-height: 1.7; }
</style>
