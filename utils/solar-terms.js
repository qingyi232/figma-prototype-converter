const solarTerms = [
  {
    id: 1, name: '立春', en: 'Start of Spring', date: '2月3-5日',
    season: '春', icon: '🌱',
    color: '#7cb342', bgColor: '#f1f8e9',
    image: '/static/hero/hero1.png',
    desc: '立春，为二十四节气之首。立，是"开始"之意；春，代表着温暖、生长。立春标志着万物闭藏的冬季已过去，开始进入风和日暖、万物生长的春季。',
    customs: '迎春、咬春（吃春饼、春卷）、打春牛、贴春字',
    health: '春季养生重在养肝，宜多食绿色蔬菜，如菠菜、韭菜、芹菜。早睡早起，适量运动，保持心情舒畅。',
    poem: '东风解冻鱼陟负冰\n——《月令七十二候集解》',
    food: '春饼、春卷、萝卜'
  },
  {
    id: 2, name: '雨水', en: 'Rain Water', date: '2月18-20日',
    season: '春', icon: '🌧️',
    color: '#5c9dc4', bgColor: '#e3f2fd',
    image: '/static/hero/hero2.png',
    desc: '雨水节气标示着降雨开始、雨量渐增。雨水和谷雨、小满、小雪、大雪等节气一样，都是反映降水现象的节气。',
    customs: '接寿、回娘屋、拉保保（拉干爹）',
    health: '雨水时节湿气渐重，饮食宜清淡，多吃健脾祛湿食物，如山药、薏米、红枣。',
    poem: '好雨知时节，当春乃发生。\n——杜甫《春夜喜雨》',
    food: '蜂蜜、红枣、山药'
  },
  {
    id: 3, name: '惊蛰', en: 'Awakening of Insects', date: '3月5-7日',
    season: '春', icon: '⚡',
    color: '#8d6e63', bgColor: '#efebe9',
    image: '/static/hero/hero3.png',
    desc: '惊蛰，又名"启蛰"。天气回暖，春雷始鸣，惊醒蛰伏于地下冬眠的昆虫，万物复苏。',
    customs: '祭白虎、打小人、吃梨、蒙鼓皮',
    health: '惊蛰时节肝气旺盛，宜多吃富含蛋白质和维生素的食物。适宜户外运动，呼吸新鲜空气。',
    poem: '微雨众卉新，一雷惊蛰始。\n——韦应物《观田家》',
    food: '梨、菠菜、芹菜'
  },
  {
    id: 4, name: '春分', en: 'Spring Equinox', date: '3月20-22日',
    season: '春', icon: '🌸',
    color: '#ec407a', bgColor: '#fce4ec',
    image: '/static/hero/hero4.png',
    desc: '春分，昼夜平分之意。春分是太阳直射地球赤道的日子，全球各地几乎昼夜等长。春分过后，太阳直射点继续北移。',
    customs: '竖蛋、吃春菜、送春牛、放风筝',
    health: '春分养生应注意阴阳平衡，饮食上注意寒热均衡。多食时令蔬菜，保持规律作息。',
    poem: '雪入春分省见稀，半开桃李不胜威。\n——苏轼',
    food: '香椿、豆芽、春笋'
  },
  {
    id: 5, name: '清明', en: 'Pure Brightness', date: '4月4-6日',
    season: '春', icon: '🍃',
    color: '#66bb6a', bgColor: '#e8f5e9',
    image: '/static/hero/hero5.png',
    desc: '清明，兼具自然与人文两大内涵，既是自然节气点，也是传统节日。清明节气后，气温升高，正是春耕春种的大好时节。',
    customs: '扫墓祭祖、踏青、插柳、放风筝、荡秋千',
    health: '清明时节多雨潮湿，宜饮菊花茶、薄荷茶疏肝理气。饮食以清淡为主，忌食"发物"。',
    poem: '清明时节雨纷纷，路上行人欲断魂。\n——杜牧《清明》',
    food: '青团、艾粄、鸡蛋'
  },
  {
    id: 6, name: '谷雨', en: 'Grain Rain', date: '4月19-21日',
    season: '春', icon: '🌾',
    color: '#9ccc65', bgColor: '#f1f8e9',
    image: '/static/hero/hero6.png',
    desc: '谷雨，是春季最后一个节气。"雨生百谷"，此时降水明显增加，田中秧苗初插、作物新种，最需要雨水的滋润。',
    customs: '赏牡丹、饮谷雨茶、祭仓颉、走谷雨',
    health: '谷雨前后是过敏高发期，应注意防花粉过敏。多食祛湿食物，如冬瓜、薏米。',
    poem: '谷雨如丝复似尘，煮瓶浮蜡正尝新。\n——范成大',
    food: '谷雨茶、香椿、菠菜'
  },
  {
    id: 7, name: '立夏', en: 'Start of Summer', date: '5月5-7日',
    season: '夏', icon: '☀️',
    color: '#ff7043', bgColor: '#fbe9e7',
    image: '/static/hero/hero7.png',
    desc: '立夏，是夏季的第一个节气。立夏表示告别春天，进入夏天。此时温度明显升高，雷雨增多，农作物进入旺盛生长阶段。',
    customs: '迎夏仪式、尝新活动、斗蛋游戏、称人',
    health: '立夏养生重在养心，宜清淡饮食，多食苦味食物如苦瓜。注意午休，避免大汗淋漓。',
    poem: '四时天气促相催，一夜薰风带暑来。\n——赵友直《立夏》',
    food: '蚕豆、乌米饭、樱桃'
  },
  {
    id: 8, name: '小满', en: 'Lesser Fullness', date: '5月20-22日',
    season: '夏', icon: '🌿',
    color: '#43a047', bgColor: '#e8f5e9',
    image: '/static/hero/hero8.png',
    desc: '小满，其含义是夏熟作物的籽粒开始灌浆饱满，但还未完全成熟，只是小满。小满节气意味着进入了大幅降水的雨季。',
    customs: '祭车神、祈蚕、食苦菜、看麦稍黄',
    health: '小满时节湿热交加，饮食宜清淡，多吃利水渗湿的食物。注意皮肤保健，防止湿疹。',
    poem: '夜莺啼绿柳，皓月醒长空。\n——欧阳修',
    food: '苦菜、枇杷、黄瓜'
  },
  {
    id: 9, name: '芒种', en: 'Grain in Ear', date: '6月5-7日',
    season: '夏', icon: '🌾',
    color: '#ffa726', bgColor: '#fff3e0',
    image: '/static/hero/hero9.png',
    desc: '芒种，是"有芒的麦子快收，有芒的稻子可种"的意思。芒种时节气温显著升高、雨量充沛、空气湿度大。',
    customs: '送花神、安苗、打泥巴仗、煮梅',
    health: '芒种时节天气炎热，要注意防暑降温，多喝水。饮食以清淡易消化为主。',
    poem: '时雨及芒种，四野皆插秧。\n——陆游',
    food: '杨梅、青梅、西瓜'
  },
  {
    id: 10, name: '夏至', en: 'Summer Solstice', date: '6月21-22日',
    season: '夏', icon: '🔆',
    color: '#ef5350', bgColor: '#ffebee',
    image: '/static/hero/hero10.png',
    desc: '夏至，是一年中白天最长的一天。夏至日太阳直射北回归线，北半球各地的白昼时间达到全年最长。',
    customs: '祭神祀祖、消夏避伏、吃面条、吃馄饨',
    health: '夏至养生注意防暑，适当午休。饮食宜多酸多甘，多食瓜果蔬菜，避免冷饮过量。',
    poem: '昼晷已云极，宵漏自此长。\n——韦应物《夏至避暑》',
    food: '面条、凉面、荔枝'
  },
  {
    id: 11, name: '小暑', en: 'Lesser Heat', date: '7月6-8日',
    season: '夏', icon: '🌡️',
    color: '#e53935', bgColor: '#ffebee',
    image: '/static/hero/hero11.png',
    desc: '小暑，暑即炎热之意，小暑为小热，还不十分热。小暑虽不是一年中最炎热的时节，但紧接着就是大暑。',
    customs: '食新米、晒书画、吃饺子、乘凉',
    health: '小暑时节注意养心安神，适量运动以微汗为宜。多食绿豆、莲子等清热解暑食物。',
    poem: '倏忽温风至，因循小暑来。\n——元稹《小暑六月节》',
    food: '绿豆、莲藕、黄鳝'
  },
  {
    id: 12, name: '大暑', en: 'Greater Heat', date: '7月22-24日',
    season: '夏', icon: '🔥',
    color: '#c62828', bgColor: '#ffcdd2',
    image: '/static/hero/hero12.png',
    desc: '大暑，是一年中最热的节气。"大暑"与"小暑"一样，都是反映夏季炎热程度的节令。大暑时节高温酷热，雷暴频繁。',
    customs: '晒伏姜、饮伏茶、送大暑船、吃仙草',
    health: '大暑为全年最热，重在防中暑。多饮水，清淡饮食，避免正午外出。适当食用苦瓜、冬瓜等清热食物。',
    poem: '何以销烦暑，端居一院中。\n——白居易《消暑》',
    food: '仙草、凉粉、西瓜'
  },
  {
    id: 13, name: '立秋', en: 'Start of Autumn', date: '8月7-9日',
    season: '秋', icon: '🍂',
    color: '#ff8f00', bgColor: '#fff8e1',
    image: '/static/hero/hero13.png',
    desc: '立秋，是秋季的起点。虽然暑气未消，但"秋"字当头，天气逐渐转凉。立秋后，梧桐树开始落叶，因此有"落叶知秋"的成语。',
    customs: '贴秋膘、啃秋瓜、晒秋、秋社',
    health: '立秋后应注意"秋燥"，多食滋阴润燥的食物，如梨、百合、银耳。适量运动，早睡早起。',
    poem: '自古逢秋悲寂寥，我言秋日胜春朝。\n——刘禹锡《秋词》',
    food: '西瓜、茄子、南瓜'
  },
  {
    id: 14, name: '处暑', en: 'End of Heat', date: '8月22-24日',
    season: '秋', icon: '🌤️',
    color: '#ffb300', bgColor: '#fff8e1',
    image: '/static/hero/hero14.png',
    desc: '处暑，即"出暑"，是炎热离开的意思。处暑节气意味着酷热难熬的天气到了尾声，暑气渐退，天气由炎热向凉爽过渡。',
    customs: '放河灯、开渔节、吃鸭子、煎凉茶',
    health: '处暑时节秋意渐浓，应注意调整作息。饮食以滋阴润肺为主，可多食银耳、百合、蜂蜜。',
    poem: '处暑无三日，新凉直万金。\n——苏泂',
    food: '鸭肉、银耳、百合'
  },
  {
    id: 15, name: '白露', en: 'White Dew', date: '9月7-9日',
    season: '秋', icon: '💧',
    color: '#90a4ae', bgColor: '#eceff1',
    image: '/static/hero/hero15.png',
    desc: '白露，是反映自然界寒气增长的重要节气。天气渐转凉，清晨时分地面和植物上会有许多露珠，这是因夜晚水汽凝结在上面而成。',
    customs: '收清露、饮白露茶、酿白露酒、祭禹王',
    health: '白露时节早晚温差大，注意添衣保暖。饮食宜温补，多食滋阴食物，防止秋燥伤肺。',
    poem: '蒹葭苍苍，白露为霜。\n——《诗经·蒹葭》',
    food: '桂圆、核桃、红薯'
  },
  {
    id: 16, name: '秋分', en: 'Autumn Equinox', date: '9月22-24日',
    season: '秋', icon: '🍁',
    color: '#e65100', bgColor: '#fff3e0',
    image: '/static/hero/hero16.png',
    desc: '秋分，昼夜等长。秋分过后，太阳直射点继续由赤道向南半球推移，北半球昼短夜长，气温降低。',
    customs: '秋祭月、吃秋菜、送秋牛、竖蛋',
    health: '秋分养生重在平衡阴阳。饮食温润，多食秋梨、柿子等应季水果。注意保暖，防止感冒。',
    poem: '金气秋分，风清露冷秋期半。\n——谢逸',
    food: '秋梨、柿子、螃蟹'
  },
  {
    id: 17, name: '寒露', en: 'Cold Dew', date: '10月8-9日',
    season: '秋', icon: '🌫️',
    color: '#78909c', bgColor: '#eceff1',
    image: '/static/hero/hero17.png',
    desc: '寒露，是深秋的节令。这个节气之后，露水增多，气温更低。此时我国大部分地区天气凉爽，东北和西北地区已进入或即将进入冬季。',
    customs: '登高赏菊、饮菊花酒、吃芝麻、斗蟋蟀',
    health: '寒露养生防秋燥、防感冒。适量饮用蜂蜜水、银耳汤。注意足部保暖。',
    poem: '袅袅凉风动，凄凄寒露零。\n——白居易',
    food: '芝麻、菊花茶、板栗'
  },
  {
    id: 18, name: '霜降', en: 'Frost Descent', date: '10月23-24日',
    season: '秋', icon: '❄️',
    color: '#607d8b', bgColor: '#eceff1',
    image: '/static/hero/hero18.png',
    desc: '霜降，是秋季最后一个节气。霜降时节，万物毕成，秋将逝去，冬将来临。此时天气渐冷、初霜出现。',
    customs: '赏菊、吃柿子、登高远眺、送芋鬼',
    health: '霜降养生重在保暖防寒。饮食宜滋补，多食牛肉、羊肉等温补食物。注意关节保暖。',
    poem: '霜降水痕收，浅碧鳞鳞露远洲。\n——苏轼',
    food: '柿子、萝卜、山药'
  },
  {
    id: 19, name: '立冬', en: 'Start of Winter', date: '11月7-8日',
    season: '冬', icon: '🌨️',
    color: '#546e7a', bgColor: '#eceff1',
    image: '/static/hero/hero19.png',
    desc: '立冬，是冬季的起始。"立冬"与"立春"、"立夏"、"立秋"合称四立，代表季节的开始。立冬后日照时间将继续缩短。',
    customs: '补冬、吃饺子、酿黄酒、扫疥',
    health: '立冬时节注意保暖御寒，多食温补食物。适当进补，如羊肉、枸杞炖汤。早睡晚起，减少阳气消耗。',
    poem: '冻笔新诗懒写，寒炉美酒时温。\n——李白《立冬》',
    food: '饺子、羊肉、板栗'
  },
  {
    id: 20, name: '小雪', en: 'Lesser Snow', date: '11月22-23日',
    season: '冬', icon: '🌨️',
    color: '#78909c', bgColor: '#e3f2fd',
    image: '/static/hero/hero20.png',
    desc: '小雪，是反映降水与气温的节气。小雪节气到来，意味着天气会越来越冷、降水量渐增。"小雪"是寒潮和强冷空气活动频数较高的节气。',
    customs: '腌腊肉、吃糍粑、晒鱼干、酿酒',
    health: '小雪时节防寒保暖为重。饮食宜温热，多食黑色食物如黑芝麻、黑豆、黑木耳。',
    poem: '小雪已晴芦叶暗，长波乍急鹤声嘶。\n——陈与义',
    food: '腊肉、糍粑、红薯'
  },
  {
    id: 21, name: '大雪', en: 'Greater Snow', date: '12月6-8日',
    season: '冬', icon: '❄️',
    color: '#b0bec5', bgColor: '#e3f2fd',
    image: '/static/hero/hero21.png',
    desc: '大雪，标志着仲冬时节正式开始。大雪节气与小雪节气一样，是反映气温与降水变化趋势的节气。',
    customs: '腌肉、赏雪、进补、溜冰',
    health: '大雪时节寒气重，重在补肾御寒。多食羊肉、山药、核桃等温补食物。注意头部和足部保暖。',
    poem: '忽如一夜春风来，千树万树梨花开。\n——岑参',
    food: '羊肉、萝卜、橙子'
  },
  {
    id: 22, name: '冬至', en: 'Winter Solstice', date: '12月21-23日',
    season: '冬', icon: '⛄',
    color: '#455a64', bgColor: '#eceff1',
    image: '/static/hero/hero22.png',
    desc: '冬至，是北半球白天最短、夜晚最长的一天。冬至既是节气又是节日，古人对冬至的说法是"阴极之至，阳气始生"。',
    customs: '吃饺子/汤圆、祭祀、九九消寒、贺冬',
    health: '冬至养生重在"养藏"。多食温补肾阳食物，如鹿茸、枸杞。起居注意早睡晚起。',
    poem: '天时人事日相催，冬至阳生春又来。\n——杜甫《小至》',
    food: '饺子、汤圆、羊肉汤'
  },
  {
    id: 23, name: '小寒', en: 'Lesser Cold', date: '1月5-7日',
    season: '冬', icon: '🥶',
    color: '#37474f', bgColor: '#eceff1',
    image: '/static/hero/hero23.png',
    desc: '小寒，标志着一年中最寒冷的日子已经到来。小寒的天气特点是天渐寒，尚未大冷。俗话有讲"冷在三九"，而"三九"多在1月9日至17日。',
    customs: '探梅、冰戏、腊祭、吃糯米饭',
    health: '小寒为一年中最冷时期，注意保暖防病。多食温热食物，如生姜、大枣。避免冷风直吹。',
    poem: '小寒连大吕，欢鹊垒新巢。\n——元稹',
    food: '糯米饭、腊八粥、生姜茶'
  },
  {
    id: 24, name: '大寒', en: 'Greater Cold', date: '1月20-21日',
    season: '冬', icon: '🏔️',
    color: '#263238', bgColor: '#eceff1',
    image: '/static/hero/hero24.png',
    desc: '大寒，是二十四节气中最后一个节气。大寒同小寒一样，也是表示天气寒冷程度的节气。过了大寒又立春，即迎来新一年的节气轮回。',
    customs: '除旧布新、尾牙祭、买芝麻秸、蒸供',
    health: '大寒节气养生要注意防寒保暖，合理进补。适量运动，不宜剧烈。为来年春季养生做准备。',
    poem: '大寒须遣酒争豪，酒有芳醇气有膏。\n——陆游',
    food: '八宝饭、年糕、腊味'
  }
]

function getCurrentTerm() {
  const now = new Date()
  const m = now.getMonth() + 1
  const d = now.getDate()
  const key = m * 100 + d
  const ranges = [
    [105, 1], [119, 2], [305, 3], [320, 4], [404, 5], [419, 6],
    [505, 7], [520, 8], [605, 9], [621, 10], [706, 11], [722, 12],
    [807, 13], [822, 14], [907, 15], [922, 16], [1008, 17], [1023, 18],
    [1107, 19], [1122, 20], [1206, 21], [1221, 22], [105, 23]
  ]
  let current = solarTerms[23]
  for (let i = ranges.length - 1; i >= 0; i--) {
    if (key >= ranges[i][0]) {
      current = solarTerms[ranges[i][1] - 1]
      break
    }
  }
  return current
}

function getSeasonTerms(season) {
  return solarTerms.filter(t => t.season === season)
}

const seasonColors = {
  '春': { primary: '#66bb6a', bg: '#e8f5e9', text: '#2e7d32' },
  '夏': { primary: '#ef5350', bg: '#ffebee', text: '#c62828' },
  '秋': { primary: '#ff8f00', bg: '#fff3e0', text: '#e65100' },
  '冬': { primary: '#546e7a', bg: '#eceff1', text: '#37474f' }
}

export { solarTerms, getCurrentTerm, getSeasonTerms, seasonColors }
