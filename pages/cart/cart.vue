<template>
  <view class="cart-page">
    <view class="status-bar"></view>

    <view class="cart-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="ch-title">购物车</text>
      <view style="width:72rpx"></view>
    </view>

    <!-- 有商品时 -->
    <view class="cart-list" v-if="cartItems.length > 0">
      <view class="cart-item" v-for="item in cartItems" :key="item.id">
        <image class="ci-img" :src="item.img" mode="aspectFill" />
        <view class="ci-info">
          <text class="ci-name">{{ item.name }}</text>
          <view class="ci-bottom">
            <text class="ci-price">¥{{ item.price }}</text>
            <view class="ci-qty">
              <text class="qty-btn" @tap="changeQty(item, -1)">-</text>
              <text class="qty-num">{{ item.qty }}</text>
              <text class="qty-btn" @tap="changeQty(item, 1)">+</text>
            </view>
          </view>
        </view>
        <text class="ci-delete" @tap="removeItem(item.id)">×</text>
      </view>
    </view>

    <!-- 空购物车 -->
    <view class="empty-cart" v-else>
      <view class="ec-icon-wrap">
        <image class="ec-svg" :src="svgIcon('shop','#ff6900')" mode="aspectFit" />
      </view>
      <text class="ec-text">购物车是空的</text>
      <text class="ec-hint">快去挑选心仪的商品吧～</text>
      <view class="ec-btn" @tap="goMall">
        <text class="ec-btn-text">去逛逛</text>
      </view>
    </view>

    <view class="cart-footer" v-if="cartItems.length > 0">
      <view class="cf-total">
        <text class="cf-label">合计：</text>
        <text class="cf-price">¥{{ totalPrice }}</text>
      </view>
      <button class="cf-btn">去结算</button>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'

export default {
  data() {
    return {
      cartItems: []
    }
  },
  computed: {
    totalPrice() { return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0) }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.switchTab({ url: '/pages/mall/mall' })
    },
    changeQty(item, delta) {
      item.qty = Math.max(1, item.qty + delta)
    },
    removeItem(id) {
      this.cartItems = this.cartItems.filter(i => i.id !== id)
    },
    goMall() { uni.switchTab({ url: '/pages/mall/mall' }) }
  }
}
</script>

<style scoped>
.cart-page { min-height: 100vh; background: linear-gradient(180deg, #fff7ed 0%, #fff 30%); padding-bottom: 140rpx; }
.status-bar { height: 44px; }

.cart-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.ch-title { font-size: 34rpx; font-weight: 700; color: #1e2939; }

.cart-list { padding: 16rpx 24rpx; }
.cart-item { display: flex; align-items: center; background: #fff; border-radius: 14rpx; padding: 20rpx; margin-bottom: 12rpx; position: relative; }
.ci-img { width: 120rpx; height: 120rpx; border-radius: 10rpx; margin-right: 20rpx; flex-shrink: 0; }
.ci-info { flex: 1; }
.ci-name { display: block; font-size: 26rpx; font-weight: 600; color: #1e2939; margin-bottom: 12rpx; }
.ci-bottom { display: flex; justify-content: space-between; align-items: center; }
.ci-price { font-size: 28rpx; font-weight: 700; color: #ef4444; }
.ci-qty { display: flex; align-items: center; gap: 16rpx; }
.qty-btn { width: 44rpx; height: 44rpx; border-radius: 8rpx; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 28rpx; color: #374151; text-align: center; line-height: 44rpx; }
.qty-num { font-size: 26rpx; font-weight: 600; color: #1e2939; }
.ci-delete { position: absolute; top: 12rpx; right: 16rpx; font-size: 32rpx; color: #d1d5db; }

.empty-cart { display: flex; flex-direction: column; align-items: center; padding: 160rpx 0; }
.ec-icon-wrap { width: 200rpx; height: 200rpx; border-radius: 50%; background: #fef3c6; display: flex; align-items: center; justify-content: center; margin-bottom: 32rpx; }
.ec-svg { width: 80rpx; height: 80rpx; }
.ec-text { font-size: 32rpx; font-weight: 700; color: #1e2939; margin-bottom: 12rpx; }
.ec-hint { font-size: 26rpx; color: #6a7282; margin-bottom: 40rpx; }
.ec-btn { background: linear-gradient(135deg, #ff6900 0%, #f54900 100%); border-radius: 40rpx; padding: 0 60rpx; height: 84rpx; display: flex; align-items: center; justify-content: center; box-shadow: 0 8rpx 24rpx rgba(255,105,0,0.3); }
.ec-btn-text { font-size: 28rpx; color: #fff; font-weight: 600; }

.cart-footer { position: fixed; bottom: 0; left: 0; right: 0; background: #fff; padding: 20rpx 28rpx; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 -4rpx 16rpx rgba(0,0,0,0.06); }
.cf-label { font-size: 26rpx; color: #6a7282; }
.cf-price { font-size: 36rpx; font-weight: 800; color: #ef4444; }
.cf-btn { background: #ff6900; color: #fff; border: none; border-radius: 40rpx; padding: 0 48rpx; height: 76rpx; line-height: 76rpx; font-size: 28rpx; font-weight: 600; }
.cf-btn::after { border: none; }
</style>
