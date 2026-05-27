<template>
  <view class="splash-page">
    <!-- 底层 Logo 兜底（视频加载前或失败时显示） -->
    <view class="splash-bg" :class="{ 'fade-out': videoPlaying }">
      <image class="splash-logo" src="/static/app-logo.png" mode="aspectFit" />
      <text class="splash-name">节气拾光</text>
    </view>

    <!-- 视频开机动画 -->
    <video
      class="splash-video"
      id="splashVideo"
      src="/static/splash.mp4"
      :show-fullscreen-btn="false"
      :show-play-btn="false"
      :show-center-play-btn="false"
      :controls="false"
      :autoplay="true"
      :muted="true"
      :loop="false"
      :enable-progress-gesture="false"
      object-fit="cover"
      @play="onPlay"
      @ended="onEnded"
      @error="onError"
      @timeupdate="onTimeUpdate"
    ></video>

    <!-- 跳过按钮 -->
    <view class="skip-btn" @tap="goNext">
      <text>跳过 {{ countdown }}s</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoPlaying: false,
      jumped: false,
      timer: null,
      playAttempts: 0,
      countdown: 5,
      countdownTimer: null,
      hasTimeUpdate: false
    }
  },
  onReady() {
    this.timer = setTimeout(() => { this.goNext() }, 12000)
    this.startCountdown()
    this.tryPlay()
  },
  onUnload() {
    if (this.timer) clearTimeout(this.timer)
    if (this.countdownTimer) clearInterval(this.countdownTimer)
  },
  methods: {
    tryPlay() {
      this.playAttempts++
      try {
        const ctx = uni.createVideoContext('splashVideo', this)
        if (ctx) {
          ctx.play()
          // Android 上首次 play 可能无效，延迟重试
          if (this.playAttempts < 3) {
            setTimeout(() => {
              if (!this.videoPlaying) this.tryPlay()
            }, 500)
          }
        }
      } catch(e) {
        console.log('play error', e)
        if (this.playAttempts < 3) {
          setTimeout(() => this.tryPlay(), 500)
        }
      }
    },
    startCountdown() {
      this.countdownTimer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          clearInterval(this.countdownTimer)
          this.countdownTimer = null
          this.goNext()
        }
      }, 1000)
    },
    onPlay() {
      this.videoPlaying = true
    },
    onTimeUpdate(e) {
      if (!this.hasTimeUpdate) {
        this.hasTimeUpdate = true
        this.videoPlaying = true
      }
    },
    onEnded() {
      setTimeout(() => { this.goNext() }, 500)
    },
    onError(e) {
      console.log('Video error:', e)
      setTimeout(() => { this.goNext() }, 2000)
    },
    goNext() {
      if (this.jumped) return
      this.jumped = true
      if (this.timer) { clearTimeout(this.timer); this.timer = null }
      if (this.countdownTimer) { clearInterval(this.countdownTimer); this.countdownTimer = null }
      uni.switchTab({ url: '/pages/index/index' })
    }
  }
}
</script>

<style scoped>
.splash-page {
  width: 100%;
  height: 100vh;
  background: #000;
  position: relative;
  overflow: hidden;
}
.splash-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: opacity 0.5s ease;
}
.splash-bg.fade-out {
  opacity: 0;
  pointer-events: none;
}
.splash-logo {
  width: 180rpx;
  height: 180rpx;
  border-radius: 40rpx;
  margin-bottom: 28rpx;
}
.splash-name {
  font-size: 48rpx;
  font-weight: 800;
  color: #047857;
}
.splash-video {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.skip-btn {
  position: absolute;
  top: 80rpx;
  right: 32rpx;
  z-index: 20;
  padding: 10rpx 24rpx;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 30rpx;
}
.skip-btn text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 24rpx;
}
</style>
