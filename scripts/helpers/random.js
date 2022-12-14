hexo.extend.filter.register('after_render:html', function (data) {
  const posts = []
  hexo.locals.get('posts').map(function (post) {
    if (post.random !== false) posts.push(post.path)
  })
  data += `<script>var posts=${JSON.stringify(posts)};function toRandomPost(){ window.pjax ? pjax.loadUrl('/'+posts[Math.floor(Math.random()*posts.length)]) : window.open('/'+posts[Math.floor(Math.random()*posts.length)], "_self"); };</script>`
  return data
})

hexo.extend.filter.register('after_render:html', function (data) {
  const flinks = []
  hexo.locals.get('data').link.map(function (list) {
    list.link_list.map(function (flink) {
      flinks.push(flink.link)
    })
  })

  data += `<script>var flinks=${JSON.stringify(flinks)};function toRandomFlink(){window.open(flinks[Math.floor(Math.random()*flinks.length)]);};</script>`
  return data
})

// hexo.extend.generator.register('random', function (locals) {
//   const config = hexo.config.random || {}
//   const posts = []
//   for (const post of locals.posts.data) {
//     if (post.random !== false) posts.push(post.path)
//   }
//   return {
//     path: config.path || 'random/index.html',
//     data: `<html><head><script>var posts=${JSON.stringify(posts)}; window.pjax ? pjax.loadUrl('/'+posts[Math.floor(Math.random()*posts.length)]) : window.open('/'+posts[Math.floor(Math.random()*posts.length)], "_self");</script></head></html>`
//   }
// })