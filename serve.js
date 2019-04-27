/*
 * @Author: saber2pr
 * @Date: 2019-04-27 20:59:41
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-27 23:01:08
 */
const { Koa } = require('@saber2pr/koa')
const { HTMLJob } = require('@saber2pr/koa-fs')
const url = require('url')
const { Http } = require('@saber2pr/node')

const app = Koa({
  getParams() {
    return url.parse(this.request.url, true).query
  }
})

app.listen(3005, () => console.log('http://localhost:3005'))

app.use(HTMLJob).use(async (ctx, next) => {
  setTimeout(() => ctx.response.end('timeout'), 3000)
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.request.url.startsWith('/form_test')) {
    if (ctx.request.method === 'GET') {
      const res = JSON.stringify(ctx.getParams())
      ctx.response.end(res)
    }
    if (ctx.request.method === 'POST') {
      let str = ''
      ctx.request.on('data', chunk => (str += chunk))
      ctx.request.on('end', () => ctx.response.end(str))
    }
  }
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.request.url.startsWith('/jsonp')) {
    const params = ctx.getParams()
    // 从参数获取回调函数名
    const callbackId = params['callback']
    const data = {
      name: params['name'],
      age: params['age']
    }
    // 生成js脚本，调用页面函数
    const script = `${callbackId}(${JSON.stringify(data)})`
    // 把js脚本发送给浏览器
    ctx.response.end(script)
  }
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.request.url === '/cors_test') {
    const port = 'http://localhost:3006'
    // 设置cors响应头，允许域为http://localhost:3006可以访问资源
    // 当前域http://localhost:3005/也是可以访问的
    ctx.response.setHeader('Access-Control-Allow-Origin', port)
    ctx.response.end('cors success')
  }
  await next()
})

// 模拟数据库
const store = []

app.use(async (ctx, next) => {
  const route = '/users/register'
  if (ctx.request.url.startsWith(route)) {
    // 获取cookie userInfor
    const requestUserInfor = ctx.request.headers.cookie
      ? JSON.parse(decodeURI(ctx.request.headers.cookie).split('=')[1])
      : null
    if (requestUserInfor) {
      console.log('查询用户信息')
      // 查询用户信息
      const target = store.find(u => u.username === requestUserInfor.username)
      if (target) {
        console.log('数据库：', store)
        console.log('己经注册, 核对请求密码', target, '?=', requestUserInfor)
        // 如果己经注册
        // 核对请求密码
        if (target.password === requestUserInfor.password) {
          console.log('密码正确')
          ctx.response.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8',
            'Access-Control-Allow-Credentials': 'true'
          })
          ctx.response.end('登录成功')
        } else {
          console.log('密码错误')
          ctx.response.writeHead(401, {
            'Content-Type': 'text/plain;charset=utf-8',
            'Access-Control-Allow-Credentials': 'true'
          })
          ctx.response.end('密码错误')
        }
      } else {
        console.log('注册')
        //注册
        const params = ctx.getParams()
        // 保存用户信息到数据库
        store.push(params)
        // 响应头字符编码，允许cookie，设置cookie内容
        ctx.response.writeHead(200, {
          'Content-Type': 'text/plain;charset=utf-8',
          'Access-Control-Allow-Credentials': 'true',
          'Set-Cookie': Http.cookie({
            // 保存账户到客户端cookie
            userInfor: encodeURI(JSON.stringify(params)),
            path: route,
            HttpOnly: true
          })
        })
        ctx.response.end('注册成功')
      }
    }
  }
  await next()
})

// 测试cors跨域
Koa()
  .use(HTMLJob)
  .listen(3006, () => console.log('http://localhost:3006'))
