<template>
  <view class="food-page">
    <view class="status-bar"></view>
    <view class="food-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="fh-title">节气美食</text>
      <view style="width:72rpx"></view>
    </view>
    <text class="fh-desc">二十四节气传统美食文化</text>

    <view class="category-tabs">
      <view v-for="(c, i) in categories" :key="i" :class="['cat-tab', { active: activeCategory === c.key }]" @tap="activeCategory = c.key">
        <text>{{ c.label }}</text>
      </view>
    </view>

    <view class="stats-banner">
      <view class="sb-icon"><image style="width:28rpx;height:28rpx" :src="svgIcon('fork','#00bc7d')" mode="aspectFit" /></view>
      <view class="sb-info">
        <text class="sb-title">24节气美食</text>
        <text class="sb-desc">每个节气的传统美食</text>
      </view>
      <view class="sb-count">
        <text class="sb-num">24</text>
        <text class="sb-unit">道美食</text>
      </view>
    </view>

    <view class="food-list">
      <view class="food-card" v-for="item in filteredTerms" :key="item.id" @tap="goFoodDetail(item.id)">
        <view class="fc-img-wrap">
          <image class="fc-img" :src="foodImages[item.id] || item.image" mode="aspectFill" />
          <view class="fc-term-tag"><text>{{ item.name }}</text></view>
          <view class="fc-rating"><text class="rating-star"></text><text class="rating-num">{{ (4.5 + Math.random() * 0.4).toFixed(1) }}</text></view>
          <view class="fc-meta">
            <view class="meta-tag"><text>简单</text></view>
            <view class="meta-tag"><text>⏱ 30分钟</text></view>
          </view>
        </view>
        <view class="fc-info">
          <text class="fc-name">{{ getFoodName(item) }}</text>
          <text class="fc-desc">{{ getFoodDesc(item) }}</text>
          <view class="fc-health">
            <image style="width:28rpx;height:28rpx" :src="svgIcon('fork','#00bc7d')" mode="aspectFit" />
            <text class="fch-label">养生功效</text>
          </view>
          <text class="fc-health-text">{{ getFoodHealth(item) }}</text>
          <view class="fc-tip">
            <text class="fct-icon"></text>
            <text class="fct-text">{{ getFoodTip(item) }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'
import { solarTerms } from '../../utils/solar-terms.js'

const foodImages = {}
for (let i = 1; i <= 24; i++) foodImages[i] = `/static/food/food${i}.png`

const foodNames = { 1: '春饼卷菜', 2: '红枣山药粥', 3: '香梨银耳羹', 4: '春菜沙拉', 5: '清明青团', 6: '谷雨新茶' }
const foodDescs = {
  1: '立春必吃春饼，卷入时令蔬菜，象征迎接春天，咬春尝鲜',
  2: '雨水时节健脾祛湿，红枣山药搭配滋补养生',
  3: '惊蛰润肺止咳，香梨银耳清润滋养',
  4: '春分阴阳平衡，多食时令蔬菜清爽健康',
  5: '清明时节青团飘香，艾草糯米传承千年',
  6: '谷雨品新茶，春茶清香回甘养生佳品'
}
const foodHealths = { 1: '营养均衡、开胃健脾', 2: '健脾祛湿、温补养胃', 3: '润肺止咳、滋阴养颜', 4: '平衡膳食、清热解毒', 5: '清热解毒、养肝护胃', 6: '提神醒脑、抗氧化' }
const foodTips = {
  1: '立春吃春饼又称"咬春"，寓意迎接春天',
  2: '雨水多食温性食物，避免寒凉伤脾',
  3: '惊蛰吃梨有"惊蛰吃梨不生病"的说法',
  4: '春分竖蛋、吃春菜是传统习俗',
  5: '清明青团用艾草汁和糯米制成',
  6: '谷雨茶又称"雨前茶"，品质上佳'
}

export default {
  data() {
    return {
      activeCategory: 'all',
      categories: [
        { key: 'all', label: '全部' }, { key: '春', label: '春季' }, { key: '夏', label: '夏季' },
        { key: '秋', label: '秋季' }, { key: '冬', label: '冬季' }
      ],
      foodImages
    }
  },
  computed: {
    filteredTerms() {
      if (this.activeCategory === 'all') return solarTerms
      return solarTerms.filter(t => t.season === this.activeCategory)
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() { uni.navigateBack() },
    goFoodDetail(id) { uni.navigateTo({ url: '/pages/food-detail/food-detail?id=' + id }) },
    getFoodName(item) { return foodNames[item.id] || item.food.split('、')[0] },
    getFoodDesc(item) { return foodDescs[item.id] || item.health.substring(0, 25) },
    getFoodHealth(item) { return foodHealths[item.id] || '营养丰富、养生保健' },
    getFoodTip(item) { return foodTips[item.id] || item.customs.substring(0, 20) }
  }
}
</script>

<style scoped>
.food-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 40rpx; }
.status-bar { height: 44px; }
.food-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.fh-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }
.fh-desc { display: block; text-align: center; font-size: 24rpx; color: #6a7282; margin-bottom: 20rpx; }

.category-tabs { display: flex; padding: 0 32rpx; gap: 12rpx; margin-bottom: 20rpx; }
.cat-tab { padding: 12rpx 28rpx; border-radius: 30rpx; font-size: 26rpx; color: #4a5565; background: #fff; border: 1rpx solid #e5e7eb; }
.cat-tab.active { background: #ff6900; color: #fff; border-color: #ff6900; }

.stats-banner { display: flex; align-items: center; margin: 0 32rpx 20rpx; background: #fef3c6; border-radius: 16rpx; padding: 20rpx 24rpx; gap: 16rpx; }
.sb-icon { width: 64rpx; height: 64rpx; background: #ffedd4; border-radius: 14rpx; display: flex; align-items: center; justify-content: center; font-size: 28rpx; }
.sb-info { flex: 1; }
.sb-title { display: block; font-size: 28rpx; font-weight: 700; color: #1e2939; }
.sb-desc { display: block; font-size: 22rpx; color: #6a7282; }
.sb-num { display: block; font-size: 40rpx; font-weight: 800; color: #ff6900; text-align: right; }
.sb-unit { display: block; font-size: 20rpx; color: #6a7282; text-align: right; }

.food-list { padding: 0 32rpx; }
.food-card { background: #fff; border-radius: 24rpx; overflow: hidden; margin-bottom: 20rpx; }
.fc-img-wrap { position: relative; }
.fc-img { width: 100%; height: 340rpx; }
.fc-term-tag { position: absolute; top: 16rpx; left: 16rpx; background: #ff6900; padding: 6rpx 18rpx; border-radius: 10rpx; }
.fc-term-tag text { font-size: 22rpx; color: #fff; font-weight: 600; }
.fc-rating { position: absolute; top: 16rpx; right: 16rpx; background: rgba(0,0,0,0.4); padding: 6rpx 14rpx; border-radius: 8rpx; display: flex; align-items: center; gap: 4rpx; }
.rating-star { font-size: 20rpx; color: #f59e0b; }
.rating-num { font-size: 22rpx; color: #fff; font-weight: 600; }
.fc-meta { position: absolute; bottom: 16rpx; right: 16rpx; display: flex; gap: 8rpx; }
.meta-tag { background: rgba(255,255,255,0.9); padding: 6rpx 14rpx; border-radius: 8rpx; }
.meta-tag text { font-size: 20rpx; color: #4a5565; }

.fc-info { padding: 24rpx; }
.fc-name { display: block; font-size: 32rpx; font-weight: 800; color: #1e2939; margin-bottom: 10rpx; }
.fc-desc { display: block; font-size: 26rpx; color: #4a5565; line-height: 1.6; margin-bottom: 16rpx; }
.fc-health { display: flex; align-items: center; gap: 8rpx; margin-bottom: 8rpx; }
.fch-icon { font-size: 24rpx; }
.fch-label { font-size: 24rpx; color: #6a7282; }
.fc-health-text { display: block; font-size: 26rpx; font-weight: 600; color: #1e2939; margin-bottom: 14rpx; margin-left: 32rpx; }
.fc-tip { display: flex; align-items: flex-start; gap: 8rpx; background: #f9fafb; border-radius: 12rpx; padding: 16rpx; }
.fct-icon { font-size: 24rpx; }
.fct-text { font-size: 24rpx; color: #6a7282; line-height: 1.5; }
</style>
