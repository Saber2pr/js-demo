/*
 * @Author: saber2pr
 * @Date: 2019-04-15 22:06:25
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-20 15:33:26
 */
const {
  Nana,
  Module,
  FsModule
} = require('@saber2pr/nana')

const user = Module({
  url: '/user/',
  service(ctx) {
    if (ctx.request.method === 'GET') {
      const res = JSON.stringify(ctx.params)
      ctx.response.end(res)
    } else if (ctx.request.method === 'POST') {
      let str = ''
      ctx.request.on('data', chunk => (str += chunk))
      ctx.request.on('end', () => ctx.response.end(str))
    }
  }
})

const jsonp = Module({
  url: '/jsonp',
  service(ctx) {
    // 从参数获取回调函数名
    const callbackId = ctx.params['callback']
    const data = {
      name: ctx.params['name'],
      age: ctx.params['age']
    }
    // 生成js脚本，调用页面函数
    const script = `${callbackId}(${JSON.stringify(data)})`
    // 把js脚本发送给浏览器
    ctx.response.end(script)
  }
})

const cors = Module({
  url: '/cors_test',
  service(ctx) {
    const port = 'http://localhost:3006'
    // 设置cors响应头，允许域为http://localhost:3006可以访问资源
    // 当前域http://localhost:3005/也是可以访问的
    ctx.response.setHeader('Access-Control-Allow-Origin', port)
    ctx.response.end('cors success')
  }
})

// Nana.watch({
//   method: true,
//   url: true
// })

// 域为http://localhost:3005/
Nana.server([user, FsModule, jsonp, cors]).listen(3005, () =>
  console.log('http://localhost:3005/')
)

// 域为http://localhost:3006/
Nana.fileServer().listen(3006, () => console.log('http://localhost:3006/'))