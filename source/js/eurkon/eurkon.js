const eurkon = {
  // CSS 主颜色变量
  switchThemeColor: function ([r, g, b]) {
    document.documentElement.style.setProperty('--r', r)
    document.documentElement.style.setProperty('--g', g)
    document.documentElement.style.setProperty('--b', b)
    document.documentElement.style.setProperty('--second', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#000' : '#FFF')
    document.documentElement.style.setProperty('--cover-text', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#4C4948' : '#EEE')
  },

  // ColorThief 获取主颜色
  getMainColor: function (theme = '#1677B3') {
    let rgb = [parseInt('0x' + theme.slice(1, 3)), parseInt('0x' + theme.slice(3, 5)), parseInt('0x' + theme.slice(5, 7))]
    if (document.getElementById('post-cover-img')) rgb = new ColorThief().getColor(document.getElementById('post-cover-img'))
    return rgb
  },

  // RGBaster 切换主颜色
  switchMainColor: function () {
    let exclude_list = []
    for (let i = 0; i <= 20; i++) {
      for (let j = 0; j <= 20; j++) {
        for (let k = 0; k <= 20; k++) {
          exclude_list.push(`rgb(${i},${j},${k})`)
          exclude_list.push(`rgb(${255 - i},${255 - j},${255 - k})`)
        }
      }
    }
    if (document.getElementById('post-cover-img')) {
      RGBaster.colors(document.getElementById('post-cover-img'), {
        paletteSize: 30,
        exclude: exclude_list,
        success: function (payload) {
          let [r, g, b] = payload.dominant.match(/\d+/g)
          document.documentElement.style.setProperty('--r', r)
          document.documentElement.style.setProperty('--g', g)
          document.documentElement.style.setProperty('--b', b)
          document.documentElement.style.setProperty('--second', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#000' : '#FFF')
          document.documentElement.style.setProperty('--cover-text', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#4C4948' : '#EEE')
        }
      })
    }
    else {
      let theme = '#1677B3'
      let [r, g, b] = [parseInt('0x' + theme.slice(1, 3)), parseInt('0x' + theme.slice(3, 5)), parseInt('0x' + theme.slice(5, 7))]
      document.documentElement.style.setProperty('--r', r)
      document.documentElement.style.setProperty('--g', g)
      document.documentElement.style.setProperty('--b', b)
      document.documentElement.style.setProperty('--second', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#000' : '#FFF')
      document.documentElement.style.setProperty('--cover-text', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#4C4948' : '#EEE')
    }
  },

  // 页面标题
  switchPageTitle: function () {
    document.getElementById('page-title').style.display = window.location.pathname === '/' ? 'none' : 'flex'
    document.querySelector('#page-title>span').innerHTML = GLOBAL_CONFIG_SITE.title
  },

  // 分类|标签 导航栏
  catalogActive: function () {
    let $list = document.getElementById('catalog-list')
    if ($list) {
      // 鼠标滚轮滚动
      $list.addEventListener('mousewheel', function (e) {
        // 计算鼠标滚轮滚动的距离
        $list.scrollLeft -= e.wheelDelta / 2
        // 阻止浏览器默认方法
        e.preventDefault()
      }, false)

      // 高亮当前页面对应的分类或标签
      let $catalog = document.getElementById(decodeURIComponent(window.location.pathname))
      $catalog.classList.add('selected')

      // 滚动当前页面对应的分类或标签到中部
      $list.scrollLeft = ($catalog.offsetLeft - $list.offsetLeft) - ($list.offsetWidth - $catalog.offsetWidth) / 2
    }
  },

  // 热评
  switchCommentBarrage: function () {
    let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
    document.getElementById('comment-barrage').style.zIndex = flag === 'false' ? '1' : '-1001'
    window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
    if (document.querySelector('#menu-barrage>span')) document.querySelector('#menu-barrage>span').innerHTML = flag === 'false' ? '隐藏热评' : '显示热评'
  },

}