<template>
  <view class="register-page">
    <view class="nav-back">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <text class="nav-title">注册</text>
      <view style="width:72rpx"></view>
    </view>

    <view class="form-area">
      <view class="input-group">
        <text class="input-label">手机号</text>
        <input class="form-input" v-model="form.phone" placeholder="请输入手机号" type="number" />
      </view>
      <view class="input-group">
        <text class="input-label">昵称</text>
        <input class="form-input" v-model="form.nickname" placeholder="请输入昵称" />
      </view>
      <view class="input-group">
        <text class="input-label">密码</text>
        <input class="form-input" v-model="form.password" type="password" placeholder="请设置密码" />
      </view>
      <view class="input-group">
        <text class="input-label">确认密码</text>
        <input class="form-input" v-model="form.confirmPwd" type="password" placeholder="请再次输入密码" />
      </view>
      <button class="register-btn" @tap="handleRegister">注 册</button>
      <view class="form-footer">
        <text class="link" @tap="goBack">已有账号？返回登录</text>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'

export default {
  data() {
    return { form: { phone: '', nickname: '', password: '', confirmPwd: '' } }
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    handleRegister() {
      if (!this.form.phone || !this.form.nickname || !this.form.password) {
        uni.showToast({ title: '请填写完整', icon: 'none' }); return
      }
      if (this.form.password !== this.form.confirmPwd) {
        uni.showToast({ title: '两次密码不一致', icon: 'none' }); return
      }
      uni.showToast({ title: '注册成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1000)
    },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.navigateTo({ url: '/pages/login/login' })
    }
  }
}
</script>

<style scoped>
.register-page { min-height: 100vh; background: #fff; padding: 0 32rpx; }
.nav-back { display: flex; align-items: center; justify-content: space-between; padding-top: 100rpx; margin-bottom: 48rpx; }
.back-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.nav-title { font-size: 36rpx; font-weight: 700; color: #1e2939; }
.form-area { padding: 0 16rpx; }
.input-group { margin-bottom: 24rpx; }
.input-label { display: block; font-size: 26rpx; font-weight: 600; color: #0a0a0a; margin-bottom: 12rpx; }
.form-input { width: 100%; height: 88rpx; background: #f1f5f9; border-radius: 12rpx; padding: 0 24rpx; font-size: 28rpx; color: #0a0a0a; box-sizing: border-box; }
.register-btn { width: 100%; height: 92rpx; line-height: 92rpx; background: #059669; color: #fff; font-size: 30rpx; font-weight: 600; border-radius: 12rpx; border: none; margin-top: 20rpx; }
.register-btn::after { border: none; }
.form-footer { display: flex; justify-content: center; margin-top: 24rpx; }
.link { font-size: 26rpx; color: #059669; }
</style>
