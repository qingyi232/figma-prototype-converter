<template>
  <view class="tools-page">
    <view class="status-bar"></view>
    <view class="tools-header">
      <text class="th-title">实用工具</text>
      <text class="th-desc">节气相关实用小工具集合</text>
    </view>

    <view class="tools-grid">
      <view class="tool-card" v-for="item in tools" :key="item.id" @tap="goPage(item.path)">
        <view class="tc-icon" :style="{ background: item.bgColor }">
          <image class="tc-icon-img" :src="getSvgIcon(item.iconType, item.iconColor)" mode="aspectFit" />
        </view>
        <text class="tc-name">{{ item.name }}</text>
        <text class="tc-desc">{{ item.desc }}</text>
        <text class="tc-value" :style="{ color: item.iconColor }">{{ item.value }}</text>
        <text class="tc-hint">{{ item.hint }}</text>
      </view>
    </view>

    <text class="footer-hint">更多实用工具正在开发中...</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tools: [
        { id: 1, name: '节气倒计时', desc: '距离下一个节气还有', value: '15天8时', hint: '清明将至', iconType: 'clock', iconColor: '#00bc7d', bgColor: '#d0fae5', path: '/pages/countdown/countdown' },
        { id: 2, name: '节气换算', desc: '公历农历节气互转', value: '快速换算', hint: '支持多种历法', iconType: 'calendar', iconColor: '#0092b8', bgColor: '#cefafe', path: '/pages/converter/converter' },
        { id: 3, name: '节气提醒', desc: '不错过每个节气', value: '已开启', hint: '提前3天通知', iconType: 'bell', iconColor: '#ff6900', bgColor: '#ffedd4', path: '/pages/reminder/reminder' },
        { id: 4, name: '日出日落', desc: '今日日出日落时间', value: '06:15 / 18:32', hint: '基于当前位置', iconType: 'sunrise', iconColor: '#9810fa', bgColor: '#f3e8ff', path: '/pages/sunrise/sunrise' },
        { id: 5, name: '物候查询', desc: '查看节气物候变化', value: '三候查询', hint: '感受自然规律', iconType: 'eye', iconColor: '#e5007a', bgColor: '#fce7f3', path: '/pages/climate/climate' },
        { id: 6, name: '节气壁纸', desc: 'AI生成专属壁纸', value: '一键生成', hint: '个性化设计', iconType: 'image', iconColor: '#615fff', bgColor: '#e0e7ff', path: '/pages/wallpaper/wallpaper' }
      ]
    }
  },
  methods: {
    goPage(url) { uni.navigateTo({ url }) },
    getSvgIcon(type, color) {
      const c = encodeURIComponent(color)
      const paths = {
        clock: `<circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/>`,
        calendar: `<rect x='3' y='4' width='18' height='18' rx='2' ry='2'/><line x1='16' y1='2' x2='16' y2='6'/><line x1='8' y1='2' x2='8' y2='6'/><line x1='3' y1='10' x2='21' y2='10'/>`,
        bell: `<path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'/><path d='M13.73 21a2 2 0 0 1-3.46 0'/>`,
        sunrise: `<path d='M17 18a5 5 0 0 0-10 0'/><line x1='12' y1='9' x2='12' y2='2'/><line x1='4.22' y1='10.22' x2='5.64' y2='11.64'/><line x1='1' y1='18' x2='3' y2='18'/><line x1='21' y1='18' x2='23' y2='18'/><line x1='18.36' y1='11.64' x2='19.78' y2='10.22'/><polyline points='8 6 12 2 16 6'/>`,
        eye: `<path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/><circle cx='12' cy='12' r='3'/>`,
        image: `<rect x='3' y='3' width='18' height='18' rx='2' ry='2'/><circle cx='8.5' cy='8.5' r='1.5'/><polyline points='21 15 16 10 5 21'/>`
      }
      const p = paths[type] || paths.clock
      return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>${p}</svg>`)}`
    }
  }
}
</script>

<style scoped>
.tools-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 120rpx; }
.status-bar { height: 44px; }
.tools-header { text-align: center; padding: 24rpx 32rpx 28rpx; }
.th-title { display: block; font-size: 38rpx; font-weight: 800; color: #1e2939; }
.th-desc { display: block; font-size: 26rpx; color: #6a7282; margin-top: 8rpx; }

.tools-grid { display: grid; grid-template-columns: 1fr 1fr; padding: 0 24rpx; gap: 12rpx; }
.tool-card { background: #fff; border-radius: 24rpx; padding: 28rpx 24rpx; }
.tc-icon { width: 80rpx; height: 80rpx; border-radius: 20rpx; display: flex; align-items: center; justify-content: center; margin-bottom: 20rpx; }
.tc-icon-img { width: 40rpx; height: 40rpx; }
.tc-name { display: block; font-size: 28rpx; font-weight: 700; color: #1e2939; margin-bottom: 6rpx; }
.tc-desc { display: block; font-size: 22rpx; color: #6a7282; margin-bottom: 16rpx; }
.tc-value { display: block; font-size: 26rpx; font-weight: 700; margin-bottom: 4rpx; }
.tc-hint { display: block; font-size: 20rpx; color: #99a1af; }

.footer-hint { display: block; text-align: center; font-size: 24rpx; color: #99a1af; padding: 32rpx 0; }
</style>
