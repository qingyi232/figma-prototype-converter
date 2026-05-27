<template>
  <view class="login-page">
    <view class="status-bar"></view>

    <view class="login-card">
      <text class="skip-btn" @tap="skipLogin">跳过</text>

      <view class="welcome">
        <text class="welcome-title">欢迎</text>
        <text class="welcome-title">登录以继续</text>
      </view>

      <view class="input-group">
        <view class="input-row">
          <text class="input-prefix">手机号</text>
          <input class="form-input" v-model="form.phone" placeholder="请输入手机号" type="number" />
          <view class="eye-btn"><image style="width:32rpx;height:32rpx" :src="eyeSvg" mode="aspectFit" /></view>
        </view>
      </view>

      <view class="input-group">
        <view class="input-row">
          <text class="input-prefix">验证码</text>
          <input class="form-input" v-model="form.code" placeholder="请输入验证码" type="number" />
          <text class="get-code" @tap="getCode">获取验证码</text>
        </view>
      </view>

      <view class="link-row">
        <text class="link">尚未注册？</text>
        <text class="link blue">忘记密码？</text>
      </view>

      <view class="agree-row">
        <view :class="['checkbox', { checked: agreed }]" @tap="agreed = !agreed">
          <text v-if="agreed"></text>
        </view>
        <text class="agree-text">阅读并同意<text class="agree-link">《注册协议》</text>和<text class="agree-link">《隐私政策》</text></text>
      </view>

      <button class="login-btn" @tap="handleLogin">登录</button>

      <text class="other-login">其它登录方式</text>

      <view class="social-row">
        <view class="social-btn wechat"><image class="sb-svg" :src="wechatSvg" mode="aspectFit" /></view>
        <view class="social-btn qq"><image class="sb-svg" :src="qqSvg" mode="aspectFit" /></view>
        <view class="social-btn apple"><image class="sb-svg" :src="appleSvg" mode="aspectFit" /></view>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'

export default {
  computed: {
    eyeSvg() { return makeSvg('eye', '#6a7282') },
    wechatSvg() {
      const path = `<path d='M8.5 3a5.5 5.5 0 0 0-5.5 5.5c0 1.5.6 2.85 1.6 3.85L4 14l1.85-.5A5.5 5.5 0 0 0 14 8.5 5.5 5.5 0 0 0 8.5 3M16 9.5a4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0 4.5 4.5l.85.4 2.65-.4-.5-1.85a4.5 4.5 0 0 0 1.5-3.15A4.5 4.5 0 0 0 16 9.5'/>`
      return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23fff' stroke='none'>${path}</svg>`)}`
    },
    qqSvg() {
      const path = `<circle cx='12' cy='12' r='9'/>`
      return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23fff' stroke='none'>${path}</svg>`)}`
    },
    appleSvg() {
      const path = `<path d='M17.05 12.04c-.03-2.85 2.32-4.21 2.43-4.27-1.32-1.93-3.39-2.2-4.13-2.23-1.76-.18-3.43 1.04-4.32 1.04-.9 0-2.27-1.01-3.74-.99-1.92.03-3.7 1.12-4.69 2.84-2 3.47-.51 8.59 1.43 11.4.95 1.38 2.08 2.93 3.55 2.87 1.43-.06 1.97-.92 3.7-.92 1.72 0 2.21.92 3.72.89 1.54-.03 2.51-1.41 3.45-2.79 1.09-1.6 1.54-3.16 1.57-3.24-.04-.02-3-1.16-3.03-4.6m-2.83-8.45c.79-.96 1.32-2.29 1.18-3.62-1.13.05-2.51.76-3.33 1.71-.73.84-1.37 2.2-1.2 3.5 1.27.1 2.55-.64 3.35-1.59'/>`
      return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23fff' stroke='none'>${path}</svg>`)}`
    }
  },
  data() {
    return {
      form: { phone: '', code: '' },
      agreed: false
    }
  },
  methods: {
    handleLogin() {
      if (!this.form.phone) {
        uni.showToast({ title: '请输入手机号', icon: 'none' }); return
      }
      uni.setStorageSync('userInfo', JSON.stringify({ name: '节气爱好者' }))
      uni.switchTab({ url: '/pages/index/index' })
    },
    skipLogin() {
      uni.switchTab({ url: '/pages/index/index' })
    },
    getCode() {
      uni.showToast({ title: '验证码已发送', icon: 'none' })
    }
  }
}
</script>

<style scoped>
.login-page { min-height: 100vh; background: #ffffff; }
.status-bar { height: 44px; position: absolute; top: 0; }

.login-card { width: 100%; background: transparent; padding: 120rpx 40rpx 60rpx; position: relative; box-sizing: border-box; }

.skip-btn { position: absolute; top: 24rpx; right: 32rpx; font-size: 28rpx; color: #6a7282; }

.welcome { margin-bottom: 48rpx; margin-top: 20rpx; }
.welcome-title { display: block; font-size: 44rpx; font-weight: 800; color: #1e2939; line-height: 1.4; }

.input-group { margin-bottom: 24rpx; }
.input-row { display: flex; align-items: center; border: 2rpx solid #e5e7eb; border-radius: 16rpx; padding: 20rpx 24rpx; gap: 16rpx; }
.input-prefix { font-size: 28rpx; font-weight: 600; color: #1e2939; white-space: nowrap; }
.form-input { flex: 1; font-size: 28rpx; color: #1e2939; }
.eye-btn { font-size: 28rpx; color: #99a1af; }
.get-code { font-size: 26rpx; color: #00bc7d; font-weight: 600; white-space: nowrap; }

.link-row { display: flex; justify-content: space-between; margin-bottom: 24rpx; }
.link { font-size: 26rpx; color: #6a7282; }
.link.blue { color: #2b7fff; }
.agree-link { color: #2b7fff; }

.agree-row { display: flex; align-items: flex-start; gap: 12rpx; margin-bottom: 32rpx; }
.checkbox { width: 32rpx; height: 32rpx; border: 2rpx solid #d1d5db; border-radius: 6rpx; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 4rpx; }
.checkbox.checked { background: #00bc7d; border-color: #00bc7d; }
.checkbox text { font-size: 20rpx; color: #fff; }
.agree-text { font-size: 24rpx; color: #6a7282; line-height: 1.5; }
.agree-link { color: #00bc7d; }

.login-btn { width: 100%; height: 92rpx; line-height: 92rpx; background: #00bc7d; color: #fff; font-size: 30rpx; font-weight: 600; border-radius: 46rpx; border: none; margin-bottom: 32rpx; }
.login-btn::after { border: none; }

.other-login { display: block; text-align: center; font-size: 24rpx; color: #99a1af; margin-bottom: 24rpx; }

.social-row { display: flex; justify-content: center; gap: 32rpx; }
.social-btn { width: 80rpx; height: 80rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28rpx; font-weight: 700; color: #fff; }
.social-btn.wechat { background: #07c160; }
.social-btn.qq { background: #12b7f5; }
.social-btn.apple { background: #333; }
.sb-svg { width: 36rpx; height: 36rpx; }
</style>
