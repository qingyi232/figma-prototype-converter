<template>
  <view class="mall-page">
    <view class="status-bar"></view>
    <view class="mall-header">
      <text class="mh-title">文创商城</text>
      <view class="cart-btn" @tap="goCart"><image style="width:32rpx;height:32rpx" :src="svgIcon('cart','#1e2939')" mode="aspectFit" /></view>
    </view>

    <view class="search-bar">
      <image class="si-svg" :src="svgIcon('search','#99a1af')" mode="aspectFit" />
      <text class="sp">搜索节气文创商品...</text>
    </view>

    <view class="hot-banner">
      <view class="hb-icon" style="background:#d0fae5"><image style="width:28rpx;height:28rpx" :src="svgIcon('trend','#00bc7d')" mode="aspectFit" /></view>
      <view class="hb-info">
        <text class="hb-title">春季热销榜</text>
        <text class="hb-desc">精选好物 限量优惠</text>
      </view>
      <text class="hb-link" style="color:#2b7fff">查看</text>
    </view>

    <view class="points-banner">
      <view class="pb-top">
        <view class="pb-icon-wrap">
          <image class="pb-icon-svg" :src="svgIcon('trophy','#fff')" mode="aspectFit" />
        </view>
        <text class="pb-label">我的积分</text>
        <text class="pb-link" @tap="goPoints">查看详情</text>
      </view>
      <text class="pb-num">1280</text>
      <view class="pb-bottom">
        <text class="pb-hint">可用于兑换商品</text>
        <view class="pb-btn" @tap="goGame"><image class="pb-btn-svg" :src="svgIcon('star','#fff')" mode="aspectFit" /><text class="pb-btn-text">答题赚积分</text></view>
      </view>
    </view>

    <view class="category-tabs">
      <view v-for="(c, i) in categories" :key="i" :class="['cat-tab', { active: activeCategory === c }]" @tap="activeCategory = c">
        <text>{{ c }}</text>
      </view>
    </view>

    <view class="product-grid">
      <view class="product-card" v-for="item in products" :key="item.id">
        <view class="pc-img-wrap">
          <image class="pc-img" :src="item.img" mode="aspectFill" />
          <view class="pc-badge" v-if="item.badge" :style="{ background: item.badgeColor }">
            <text class="badge-text">{{ item.badge }}</text>
          </view>
          <view class="pc-season-tag"><text>{{ item.season }}</text></view>
          <view class="pc-fav"><image style="width:28rpx;height:28rpx" :src="svgIcon('heart','#fff')" mode="aspectFit" /></view>
          <view class="pc-rating"><image style="width:20rpx;height:20rpx;margin-right:4rpx" :src="svgIcon('star','#f59e0b')" mode="aspectFit" /><text class="rating-num">{{ item.rating }}</text></view>
        </view>
        <view class="pc-info">
          <text class="pc-category">{{ item.category }}</text>
          <text class="pc-name">{{ item.name }}</text>
          <view class="pc-price-row">
            <view class="pc-prices">
              <text class="pc-price">¥{{ item.price }}</text>
              <text class="pc-original">¥{{ item.original }}</text>
            </view>
          </view>
          <view class="pc-bottom">
            <text class="pc-sold">已售{{ item.sold }}</text>
            <view class="pc-buy-btn"><text>加购</text></view>
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
      activeCategory: '全部',
      categories: ['全部', '文具', '文创', '周边', '海报', '贴纸'],
      products: [
        { id: 1, name: '二十四节气手账本', category: '文具', price: 68, original: 98, sold: 1256, rating: 4.9, badge: '热销', badgeColor: '#f54900', season: '春分', img: '/static/mall/product1.png' },
        { id: 2, name: '节气主题徽章套装', category: '周边', price: 48, original: 78, sold: 856, rating: 4.8, badge: '新品', badgeColor: '#00bc7d', season: '全套', img: '/static/mall/product2.png' },
        { id: 3, name: '水墨节气明信片', category: '文创', price: 29, original: 49, sold: 2100, rating: 4.7, badge: '热销', badgeColor: '#f54900', season: '立春', img: '/static/mall/product3.png' },
        { id: 4, name: '节气主题茶杯', category: '周边', price: 89, original: 128, sold: 680, rating: 4.9, badge: '', badgeColor: '', season: '冬至', img: '/static/mall/product4.png' },
        { id: 5, name: '节气文创香包', category: '文创', price: 38, original: 58, sold: 920, rating: 4.8, badge: '', badgeColor: '', season: '夏至', img: '/static/mall/product5.png' },
        { id: 6, name: '节气主题贴纸', category: '贴纸', price: 18, original: 28, sold: 1500, rating: 4.6, badge: '', badgeColor: '', season: '秋分', img: '/static/mall/product6.png' },
        { id: 7, name: '节气主题海报', category: '海报', price: 25, original: 38, sold: 780, rating: 4.7, badge: '', badgeColor: '', season: '立秋', img: '/static/mall/product7.png' }
      ]
    }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goCart() { uni.navigateTo({ url: '/pages/cart/cart' }) },
    goPoints() { uni.navigateTo({ url: '/pages/points/points' }) },
    goGame() { uni.navigateTo({ url: '/pages/game/game' }) }
  }
}
</script>

<style scoped>
.mall-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }
.mall-header { display: flex; justify-content: center; align-items: center; padding: 16rpx 32rpx; position: relative; }
.mh-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }
.cart-btn { position: absolute; right: 32rpx; font-size: 36rpx; }

.search-bar { display: flex; align-items: center; margin: 12rpx 32rpx 20rpx; padding: 0 24rpx; height: 76rpx; background: #fff; border-radius: 12rpx; gap: 12rpx; border: 1rpx solid #e5e7eb; }
.si-svg { width: 28rpx; height: 28rpx; }
.sp { font-size: 26rpx; color: #99a1af; }

.hot-banner { display: flex; align-items: center; margin: 0 32rpx 16rpx; background: #fff; border-radius: 16rpx; padding: 20rpx 24rpx; gap: 16rpx; }
.hb-icon { width: 72rpx; height: 72rpx; border-radius: 16rpx; display: flex; align-items: center; justify-content: center; font-size: 32rpx; }
.hb-info { flex: 1; }
.hb-title { display: block; font-size: 28rpx; font-weight: 600; color: #1e2939; }
.hb-desc { display: block; font-size: 22rpx; color: #6a7282; }
.hb-link { font-size: 26rpx; font-weight: 600; }

.points-banner { margin: 0 32rpx 20rpx; background: linear-gradient(135deg, #6366f1 0%, #a78bfa 60%, #c084fc 100%); border-radius: 20rpx; padding: 24rpx 28rpx; color: #fff; box-shadow: 0 8rpx 24rpx rgba(99,102,241,0.25); }
.pb-top { display: flex; align-items: center; gap: 12rpx; margin-bottom: 8rpx; }
.pb-icon-wrap { width: 56rpx; height: 56rpx; border-radius: 14rpx; background: rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; }
.pb-icon-svg { width: 28rpx; height: 28rpx; }
.pb-label { font-size: 24rpx; opacity: 0.9; flex: 1; }
.pb-link { font-size: 22rpx; color: #fff; opacity: 0.9; }
.pb-num { display: block; font-size: 64rpx; font-weight: 800; margin-bottom: 8rpx; }
.pb-bottom { display: flex; justify-content: space-between; align-items: center; }
.pb-hint { font-size: 22rpx; opacity: 0.85; }
.pb-btn { background: rgba(255,255,255,0.2); border-radius: 30rpx; padding: 10rpx 24rpx; display: flex; align-items: center; }
.pb-btn-svg { width: 22rpx; height: 22rpx; margin-right: 6rpx; }
.pb-btn-text { font-size: 22rpx; color: #fff; }

.category-tabs { display: flex; padding: 0 32rpx; gap: 12rpx; margin-bottom: 20rpx; overflow-x: auto; }
.cat-tab { padding: 12rpx 28rpx; border-radius: 30rpx; font-size: 26rpx; color: #4a5565; background: #fff; border: 1rpx solid #e5e7eb; white-space: nowrap; }
.cat-tab.active { background: #f54900; color: #fff; border-color: #f54900; }

.product-grid { display: grid; grid-template-columns: 1fr 1fr; padding: 0 24rpx; gap: 16rpx; }
.product-card { background: #fff; border-radius: 20rpx; overflow: hidden; }
.pc-img-wrap { position: relative; }
.pc-img { width: 100%; height: 280rpx; }
.pc-badge { position: absolute; top: 12rpx; left: 12rpx; padding: 4rpx 14rpx; border-radius: 8rpx; }
.badge-text { font-size: 20rpx; color: #fff; font-weight: 600; }
.pc-season-tag { position: absolute; top: 12rpx; left: 80rpx; background: rgba(255,255,255,0.85); padding: 4rpx 14rpx; border-radius: 8rpx; font-size: 20rpx; color: #4a5565; }
.pc-fav { position: absolute; top: 12rpx; right: 12rpx; font-size: 32rpx; color: #fff; }
.pc-rating { position: absolute; bottom: 12rpx; right: 12rpx; background: rgba(0,0,0,0.5); padding: 4rpx 12rpx; border-radius: 8rpx; display: flex; align-items: center; gap: 4rpx; }
.rating-star { font-size: 20rpx; color: #f59e0b; }
.rating-num { font-size: 20rpx; color: #fff; }
.pc-info { padding: 16rpx; }
.pc-category { display: block; font-size: 20rpx; color: #99a1af; margin-bottom: 6rpx; }
.pc-name { display: block; font-size: 26rpx; font-weight: 700; color: #1e2939; margin-bottom: 12rpx; }
.pc-prices { display: flex; align-items: baseline; gap: 8rpx; }
.pc-price { font-size: 32rpx; font-weight: 800; color: #f54900; }
.pc-original { font-size: 22rpx; color: #99a1af; text-decoration: line-through; }
.pc-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 12rpx; }
.pc-sold { font-size: 20rpx; color: #99a1af; }
.pc-buy-btn { background: #f54900; padding: 8rpx 24rpx; border-radius: 30rpx; }
.pc-buy-btn text { font-size: 22rpx; color: #fff; font-weight: 600; }
</style>
