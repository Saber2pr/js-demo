function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-18 09:10:39
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-23 23:14:03
   */
  // micro-task
  Promise.resolve('micro-task1!').then(console.log)
  // macro-task
  setTimeout(() => console.log('macro-task1!'))
  // micro-task
  new Promise((resolve, reject) => {
    console.log('micro-task1.5?')
    resolve('micro-task2!')
  }).then(res => console.log(res))
  setTimeout(() => console.log('macro-task2!'))
  // main-process
  console.log('main process!')
  // promise微任务队列
  // setTimeout宏任务队列，会延迟推入主线程一个任务
  // 全局范围调用也是宏任务（主线程）
  // 主线程执行完毕，先取一个微任务队列中的任务推入主线程执行，执行完后再取，如果微任务执行完，再取宏任务执行。
  // 优先级 主线程 > 微任务 >　宏任务
  // 优先级相同的任务按调用先后执行
  // promise构造函数里的是同步执行，then注册的是异步执行
  /**
   * 输出
   * main process!
   * micro-task1!
   * micro-task2!
   * macro-task1!
   * macro-task2!
   */

  setTimeout(() => {
    /// generator
    function* generator() {
      const next1 = yield 1
      console.log(next1)

      const next2 = yield 2
      console.log(next2)

      const next3 = yield 3
      console.log(next3)
    }
    const iterator = generator()
    console.log(iterator.next()) // 第一次调用返回第一次yield的值，后续每调用一次向后迭代一次
    console.log(iterator.next())
    console.log(iterator.next())
    console.log(iterator.next()) // done true 意思是后面没有yield了，迭代结束
    // next函数可接受一个值，会覆盖生成器中yield左边的值

    /**
     * async实现
     * 未做异常处理
     * @param {() => IterableIterator<Promise<any>>} generator
     */
    function async (generator) {
      // 调用生成器生成迭代器
      const iterator = generator()

      function next(onfulfilled) {
        // 迭代一次
        const result = iterator.next(onfulfilled)
        // 如果yield完成，则返回
        if (result.done) return
        // 注册下一次迭代到promise回调中
        // 如果yield的值不是promise，则包装为Promise.resolve
        result.value.then ?
          result.value.then(onfulfilled => next(onfulfilled)) :
          Promise.resolve(result.value).then(onfulfilled => next(onfulfilled))
      }
      next()
    }

    const delay = (time, value) =>
      new Promise(res => setTimeout(() => res(value), time))

    async (function* () {
      const first = yield 1
      console.log(first)

      const second = yield delay(1000, 2)
      console.log(second)

      const third = yield 3
      console.log(third)
    })
  })
  // 总结一下
  /**
   * promise和setTimeout都是主线程之后的调用，微任务优先于宏任务执行，主线程执行完，执行异步任务，
   * 异步任务执行中可能调用主线程中的回调函数来返回值。
   * 其实和callback差不多，但是不管是微任务还是宏任务，它们都在主线程执行完毕才会执行。即调用顺序上，它们都在最后面。
   * 所以promise和setTimeout所做的，只是把一段代码推迟执行。
   * setTimeout需要注意，如果主线程花费的时间超过了timeout，延时效果就没了
   */
}