<template>
  <view class="mine-page">
    <view class="status-bar"></view>

    <!-- 头像区域 -->
    <view class="profile-area">
      <view class="avatar-wrap">
        <image class="avatar-svg" :src="svgIcon('user','#fff')" mode="aspectFit" />
        <view class="avatar-check">
          <image class="check-svg" :src="svgIcon('check','#fff')" mode="aspectFit" />
        </view>
      </view>
      <view class="profile-info">
        <text class="username">节气爱好者</text>
        <text class="user-bio">感受四季更迭，品味时光之美</text>
      </view>
      <view class="settings-btn"><image style="width:28rpx;height:28rpx" :src="svgIcon('settings','#6a7282')" mode="aspectFit" /></view>
    </view>

    <!-- 三个统计卡片 -->
    <view class="stats-row">
      <view class="stat-card">
        <view class="sc-icon-wrap">
          <image class="sc-svg" :src="svgIcon('heart','#00bc7d')" mode="aspectFit" />
        </view>
        <text class="sc-num">23</text>
        <text class="sc-label">收藏</text>
      </view>
      <view class="stat-card">
        <view class="sc-icon-wrap">
          <image class="sc-svg" :src="svgIcon('book','#00bc7d')" mode="aspectFit" />
        </view>
        <text class="sc-num">156</text>
        <text class="sc-label">阅读</text>
      </view>
      <view class="stat-card">
        <view class="sc-icon-wrap">
          <image class="sc-svg" :src="svgIcon('shop','#00bc7d')" mode="aspectFit" />
        </view>
        <text class="sc-num">8</text>
        <text class="sc-label">订单</text>
      </view>
    </view>

    <!-- 我的内容 -->
    <view class="menu-section">
      <text class="ms-title">我的内容</text>
      <view class="menu-list">
        <view class="menu-item">
          <view class="mi-icon-wrap"><image class="mi-svg" :src="svgIcon('heart','#6a7282')" mode="aspectFit" /></view>
          <text class="mi-text">我的收藏</text>
          <view class="mi-badge"><text>23</text></view>
          <text class="mi-arrow">></text>
        </view>
        <view class="menu-item">
          <view class="mi-icon-wrap"><image class="mi-svg" :src="svgIcon('book','#6a7282')" mode="aspectFit" /></view>
          <text class="mi-text">阅读历史</text>
          <text class="mi-arrow">></text>
        </view>
        <view class="menu-item" @tap="goMall">
          <view class="mi-icon-wrap"><image class="mi-svg" :src="svgIcon('shop','#6a7282')" mode="aspectFit" /></view>
          <text class="mi-text">我的订单</text>
          <view class="mi-badge"><text>2</text></view>
          <text class="mi-arrow">></text>
        </view>
      </view>
    </view>

    <!-- 设置与帮助 -->
    <view class="menu-section">
      <text class="ms-title">设置与帮助</text>
      <view class="menu-list">
        <view class="menu-item">
          <view class="mi-icon-wrap"><image class="mi-svg" :src="svgIcon('settings','#6a7282')" mode="aspectFit" /></view>
          <text class="mi-text">设置</text>
          <text class="mi-arrow">></text>
        </view>
        <view class="menu-item">
          <view class="mi-icon-wrap"><image class="mi-svg" :src="svgIcon('bell','#6a7282')" mode="aspectFit" /></view>
          <text class="mi-text">消息通知</text>
          <view class="mi-badge"><text>5</text></view>
          <text class="mi-arrow">></text>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-area">
      <text class="logout-btn" @tap="handleLogout">退出登录</text>
    </view>

    <text class="footer-text">节气拾光 v1.0.0</text>
    <text class="footer-sub">感受时光与自然</text>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'

export default {
  methods: {
    svgIcon(type, color) { return makeSvg(type, color || '#333') },
    goPoints() { uni.navigateTo({ url: '/pages/points/points' }) },
    goMall() { uni.switchTab({ url: '/pages/mall/mall' }) },
    handleLogout() {
      uni.showModal({
        title: '提示', content: '确定退出登录？',
        success: (res) => {
          if (res.confirm) uni.navigateTo({ url: '/pages/login/login' })
        }
      })
    }
  }
}
</script>

<style scoped>
.mine-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }

.profile-area { display: flex; align-items: center; padding: 32rpx; gap: 20rpx; }
.avatar-wrap { width: 100rpx; height: 100rpx; border-radius: 50%; background: linear-gradient(135deg, #00bc7d 0%, #34d399 100%); display: flex; align-items: center; justify-content: center; position: relative; }
.check-svg { width: 18rpx; height: 18rpx; }
.avatar-icon { font-size: 48rpx; }
.avatar-check { position: absolute; bottom: 0; right: 0; width: 28rpx; height: 28rpx; border-radius: 50%; background: #00bc7d; color: #fff; font-size: 16rpx; display: flex; align-items: center; justify-content: center; }
.profile-info { flex: 1; }
.username { display: block; font-size: 34rpx; font-weight: 700; color: #1e2939; }
.user-bio { display: block; font-size: 24rpx; color: #6a7282; margin-top: 6rpx; }
.settings-btn { width: 64rpx; height: 64rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 28rpx; }

.stats-row { display: flex; gap: 16rpx; padding: 0 32rpx; margin-bottom: 28rpx; }
.stat-card { flex: 1; border-radius: 20rpx; padding: 24rpx; display: flex; flex-direction: column; align-items: center; gap: 8rpx; background: #fff; box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.04); }
.sc-icon-wrap { width: 64rpx; height: 64rpx; border-radius: 16rpx; background: #d0fae5; display: flex; align-items: center; justify-content: center; margin-bottom: 4rpx; }
.sc-icon { font-size: 32rpx; }
.sc-svg { width: 40rpx; height: 40rpx; }
.avatar-svg { width: 48rpx; height: 48rpx; }
.mi-svg { width: 28rpx; height: 28rpx; }
.sc-num { font-size: 36rpx; font-weight: 800; color: #1e2939; }
.sc-label { font-size: 22rpx; color: #6a7282; }

.points-entry { margin: 0 32rpx 24rpx; background: linear-gradient(135deg, #fff7ed 0%, #ffedd4 100%); border-radius: 20rpx; padding: 28rpx 24rpx; display: flex; align-items: center; gap: 16rpx; }
.pe-left { display: flex; align-items: center; gap: 16rpx; flex: 1; }
.pe-icon { width: 64rpx; height: 64rpx; border-radius: 16rpx; background: #ff6900; display: flex; align-items: center; justify-content: center; font-size: 32rpx; }
.pe-info { flex: 1; }
.pe-title { display: block; font-size: 28rpx; font-weight: 700; color: #1e2939; }
.pe-desc { display: block; font-size: 22rpx; color: #6a7282; margin-top: 4rpx; }
.pe-num { font-size: 36rpx; font-weight: 800; color: #ff6900; }
.pe-arrow { font-size: 26rpx; color: #d1d5db; margin-left: 8rpx; }

.menu-section { padding: 0 32rpx; margin-bottom: 24rpx; }
.ms-title { display: block; font-size: 26rpx; color: #6a7282; margin-bottom: 16rpx; }
.menu-list { background: #fff; border-radius: 20rpx; overflow: hidden; }
.menu-item { display: flex; align-items: center; padding: 28rpx 24rpx; border-bottom: 1rpx solid #f3f4f6; }
.menu-item:last-child { border-bottom: none; }
.mi-icon-wrap { width: 56rpx; height: 56rpx; border-radius: 14rpx; background: #f3f4f6; display: flex; align-items: center; justify-content: center; margin-right: 18rpx; }
.mi-icon { font-size: 24rpx; }
.mi-text { flex: 1; font-size: 28rpx; color: #1e2939; }
.mi-badge { background: #fb2c36; min-width: 36rpx; height: 36rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12rpx; }
.mi-badge text { font-size: 20rpx; color: #fff; font-weight: 600; }
.mi-arrow { font-size: 26rpx; color: #d1d5db; }

.logout-area { padding: 0 32rpx; margin-top: 20rpx; }
.logout-btn { display: block; text-align: center; font-size: 28rpx; color: #fb2c36; padding: 24rpx; background: #fff; border-radius: 16rpx; }

.footer-text { display: block; text-align: center; font-size: 22rpx; color: #99a1af; margin-top: 40rpx; }
.footer-sub { display: block; text-align: center; font-size: 20rpx; color: #d1d5db; margin-top: 6rpx; }
</style>
