/*
 * @Author: saber2pr 
 * @Date: 2019-04-15 22:06:25 
 * @Last Modified by:   saber2pr 
 * @Last Modified time: 2019-04-15 22:06:25 
 */
const {
  Nana,
  Module,
  FsModule
} = require('@saber2pr/nana')

const user = Module({
  'url': '/user/',
  service(ctx) {
    if (ctx.request.method === 'GET') {
      const res = JSON.stringify(ctx.params)
      ctx.response.end(res)
    } else if (ctx.request.method === 'POST') {
      let str = ''
      ctx.request.on('data', chunk => str += chunk)
      ctx.request.on('end', () => ctx.response.end(str))
    }
  }
})

Nana.server([user, FsModule]).listen(3005, () => console.log('http://localhost:3005/'))

Nana.watch({
  'method': true,
  'url': true
})