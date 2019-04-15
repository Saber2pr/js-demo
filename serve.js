const {
  Nana,
  Module,
  FsModule
} = require('@saber2pr/nana')

const user = Module({
  'url': '/user/',
  service(ctx) {
    const res = JSON.stringify(ctx.params)
    console.log(ctx.request.url)
    console.log(res)
    ctx.response.end(res)
  }
})

Nana.server([user, FsModule]).listen(3005, () => console.log('http://localhost:3005/'))