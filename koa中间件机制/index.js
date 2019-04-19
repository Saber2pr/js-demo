function main () {
  /*
   * @Author: saber2pr 
   * @Date: 2019-04-19 12:52:42 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-19 13:19:05
   */

  async function job1 (ctx, next) {
    console.log(ctx.name, '1');
    await next();
    console.log(ctx.name, '5');
  }

  async function job2 (ctx, next) {
    console.log(ctx.name, '2');
    await next();
    console.log(ctx.name, '4');
  }

  async function job3 (ctx) {
    console.log(ctx.name, '3');
  }

  const ctx = { name: 'koa' }

  const process = (...jobs) => jobs.reduceRight((next, job) => async () => await job(ctx, next), null)

  process(job1, job2, job3)() // koa 1, koa 2, koa 3, koa 4, koa 5
}