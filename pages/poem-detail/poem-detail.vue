<template>
  <view class="poem-page" v-if="poem">
    <view class="status-bar"></view>

    <view class="poem-header">
      <view class="back-btn" @tap="goBack">
        <image class="hdr-svg" :src="svgIcon('arrowLeft','#1e2939')" mode="aspectFit" />
      </view>
      <view class="term-badge"><text>{{ poem.term }}</text></view>
      <view class="fav-btn"><image class="hdr-svg" :src="svgIcon('heart','#99a1af')" mode="aspectFit" /></view>
    </view>

    <!-- 诗词卡片 -->
    <view class="poem-card">
      <text class="poem-title">{{ poem.title }}</text>
      <view class="poem-author-row">
        <view class="author-avatar" :style="{ background: '#fef3c6' }"><text>{{ poem.author.charAt(0) }}</text></view>
        <text class="poem-author">{{ poem.dynasty }}·{{ poem.author }}</text>
      </view>

      <view class="poem-content-wrap">
        <text class="poem-line" v-for="(line, i) in poemLines" :key="i">{{ line }}</text>
      </view>

      <view class="poem-tags">
        <view class="ptag" v-for="(tag, i) in tags" :key="i">
          <text>#{{ tag }}</text>
        </view>
      </view>
    </view>

    <!-- 译文 -->
    <view class="section">
      <view class="section-title-row">
        <image class="st-svg" :src="svgIcon('book','#0ea5e9')" mode="aspectFit" />
        <text class="section-title">译文</text>
      </view>
      <view class="section-content">
        <text class="sc-text">{{ translation }}</text>
      </view>
    </view>

    <!-- 赏析 -->
    <view class="section">
      <view class="section-title-row">
        <image class="st-svg" :src="svgIcon('leaf','#00bc7d')" mode="aspectFit" />
        <text class="section-title">赏析</text>
      </view>
      <view class="section-content">
        <text class="sc-text">{{ appreciation }}</text>
      </view>
    </view>

    <!-- 创作背景 -->
    <view class="section">
      <view class="section-title-row">
        <image class="st-svg" :src="svgIcon('scroll','#f59e0b')" mode="aspectFit" />
        <text class="section-title">创作背景</text>
      </view>
      <view class="section-content">
        <text class="sc-text">{{ background }}</text>
      </view>
    </view>

    <!-- 节气关联 -->
    <view class="section">
      <view class="section-title-row">
        <image class="st-svg" :src="svgIcon('leaf','#e5007a')" mode="aspectFit" />
        <text class="section-title">节气关联</text>
      </view>
      <view class="section-content">
        <text class="sc-text">这首诗与{{ poem.term }}节气紧密相关，描绘了该时节的自然景象和文化内涵。</text>
      </view>
    </view>
  </view>
</template>

<script>
import { makeSvg } from '../../utils/svg-icons.js'

const allPoems = {
  1: { id: 1, term: '立春', title: '咏柳', author: '贺知章', dynasty: '唐', content: '碧玉妆成一树高，万条垂下绿丝绦。不知细叶谁裁出，二月春风似剪刀。', tags: ['咏物', '春天', '柳树', '形象生动'], translation: '高高的柳树长满了翠绿的新叶，看上去好像用碧玉装扮而成。成千上万的柳枝垂下来，好像垂挂着绿色的丝带。不知道这细细的柳叶是谁裁剪出来的？原来是那二月的春风，它就像一把灵巧的剪刀。', appreciation: '这首诗通过赞美柳树，歌颂春风。诗人用"碧玉妆成"写出柳树的美丽，用"绿丝绦"描绘柳条的柔美。最后两句设问作答，把春风比作剪刀，想象奇特。', background: '此诗作于贺知章晚年返乡途中，反映了诗人对春天和故乡的热爱。' },
  2: { id: 2, term: '雨水', title: '春夜喜雨', author: '杜甫', dynasty: '唐', content: '好雨知时节，当春乃发生。随风潜入夜，润物细无声。野径云俱黑，江船火独明。晓看红湿处，花重锦官城。', tags: ['雨水', '春雨', '夜景'], translation: '好雨似乎知道时节，正当春天来临，万物萌发的时候，它就开始下了。它伴随着春风在夜里偷偷地下，悄无声息地滋润着万物。野外田间的小路漆黑一片，只有江中船上的灯火分外明亮。早晨起来看那带着雨水的红花，整个锦官城变得花团锦簇，繁花似锦。', appreciation: '诗中描绘的春雨润物细无声，体现了大自然的温柔与生机，表达诗人对春雨的喜爱之情。', background: '此诗作于成都，是杜甫定居草堂后的作品。' },
  3: { id: 3, term: '惊蛰', title: '春雷', author: '韩愈', dynasty: '唐', content: '震蛰四时新，春雷一鸣发。万物复苏起，生机焕然新。', tags: ['惊蛰', '春雷', '万物'], translation: '春雷震动大地，蛰伏的虫类开始苏醒。万物复苏，处处展现新的生机。', appreciation: '诗作描绘了惊蛰时节春雷阵阵、万物复苏的景象。', background: '韩愈所作，反映惊蛰节气特征。' },
  4: { id: 4, term: '春分', title: '春分', author: '杜甫', dynasty: '唐', content: '仲春初四日，春色正中分。绿野徘徊月，晴天断续云。', tags: ['春分', '昼夜', '景色'], translation: '仲春初四这天，春色正分昼夜两半。月亮在绿野上空徘徊，晴空中云朵断断续续。', appreciation: '诗中精准描绘了春分昼夜平分的特点。', background: '杜甫描写春分节气的作品。' },
  5: { id: 5, term: '清明', title: '清明', author: '杜牧', dynasty: '唐', content: '清明时节雨纷纷，路上行人欲断魂。借问酒家何处有，牧童遥指杏花村。', tags: ['清明', '春雨', '思念'], translation: '清明节这天雨纷纷下个不停，路上的行人都伤心欲绝。问问哪里有卖酒的店家？牧童遥指远方那杏花盛开的村庄。', appreciation: '诗作描绘清明时节雨景，流露出诗人对故人的哀思。', background: '杜牧路过杏花村时所作。' },
  6: { id: 6, term: '谷雨', title: '谷雨', author: '王建', dynasty: '唐', content: '谷雨春光晓，山川黛色青。叶间鸣戴胜，泽水长浮萍。', tags: ['谷雨', '春末', '自然'], translation: '谷雨时节春光明媚，山川呈现深绿色。树叶间戴胜鸟在鸣叫，水泽中浮萍生长。', appreciation: '诗作描绘谷雨时节的自然景象，表达对大自然的热爱。', background: '王建描写谷雨节气的作品。' }
}

export default {
  data() {
    return { poemId: 1 }
  },
  computed: {
    poem() { return allPoems[this.poemId] || allPoems[1] },
    poemLines() { return this.poem.content.split('，').flatMap(s => s.split('。').filter(Boolean).map(t => t.includes('，') ? t : t + '。')).filter(s => s.trim()) },
    tags() { return this.poem.tags || [] },
    translation() { return this.poem.translation || '诗词译文待补充。' },
    appreciation() { return this.poem.appreciation || '此诗描绘了节气时节的自然景象。' },
    background() { return this.poem.background || '创作背景待补充。' }
  },
  onLoad(options) {
    if (options.id) this.poemId = parseInt(options.id)
  },
  methods: {
    svgIcon(type, color) { return makeSvg(type, color) },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) uni.navigateBack()
      else uni.navigateTo({ url: '/pages/poem/poem' })
    }
  }
}
</script>

<style scoped>
.poem-page { background: linear-gradient(180deg, #f0fdf4 0%, #fff 30%); min-height: 100vh; padding-bottom: 80rpx; }
.status-bar { height: 44px; }

.poem-header { display: flex; align-items: center; justify-content: space-between; padding: 16rpx 24rpx; }
.back-btn, .fav-btn { width: 72rpx; height: 72rpx; border-radius: 50%; background: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; }
.hdr-svg { width: 32rpx; height: 32rpx; }
.term-badge { padding: 8rpx 28rpx; background: #d0fae5; border-radius: 30rpx; }
.term-badge text { font-size: 24rpx; font-weight: 600; color: #047857; }

.poem-card { margin: 16rpx 32rpx; background: #fff; border-radius: 24rpx; padding: 32rpx; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.04); }
.poem-title { display: block; text-align: center; font-size: 44rpx; font-weight: 800; color: #1e2939; margin-bottom: 16rpx; }
.poem-author-row { display: flex; justify-content: center; align-items: center; gap: 10rpx; margin-bottom: 24rpx; }
.author-avatar { width: 36rpx; height: 36rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.author-avatar text { font-size: 20rpx; font-weight: 700; color: #c2410c; }
.poem-author { font-size: 26rpx; color: #6a7282; }

.poem-content-wrap { background: #d0fae5; border-radius: 16rpx; padding: 32rpx; margin-bottom: 20rpx; }
.poem-line { display: block; font-size: 32rpx; color: #1e2939; text-align: center; line-height: 1.8; font-weight: 500; }

.poem-tags { display: flex; flex-wrap: wrap; gap: 10rpx; }
.ptag { background: #f3f4f6; padding: 8rpx 18rpx; border-radius: 6rpx; }
.ptag text { font-size: 22rpx; color: #6a7282; }

.section { margin: 16rpx 32rpx 0; }
.section-title-row { display: flex; align-items: center; gap: 8rpx; margin-bottom: 14rpx; padding: 0 8rpx; }
.st-svg { width: 28rpx; height: 28rpx; }
.section-title { font-size: 30rpx; font-weight: 700; color: #1e2939; }
.section-content { background: #fff; border-radius: 20rpx; padding: 24rpx; }
.sc-text { font-size: 26rpx; color: #4a5565; line-height: 1.7; }
</style>
