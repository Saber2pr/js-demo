function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-18 09:10:39
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-18 09:54:35
   */
  // micro-task
  Promise.resolve('micro-task1!').then(console.log)
  // macro-task
  setTimeout(() => console.log('macro-task1!'))
  // micro-task
  new Promise((resolve, reject) => resolve('micro-task2!')).then(res =>
    console.log(res)
  )
  setTimeout(() => console.log('macro-task2!'))
  // main-process
  console.log('main process!')
  // 先输出？？然后是233。
  // console.log('??')主线程执行栈
  // promise微任务队列
  // setTimeout宏任务队列
  // 主线程执行完毕，先取一个微任务队列中的任务推入主线程执行，执行完后再取，如果微任务执行完，再取宏任务执行。
  // 优先级 主线程 > 微任务 >　宏任务
  // 优先级相同的任务按调用先后执行
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
      const next0 = yield 0
      console.log(next0)
      const next1 = yield 1 + next0
      console.log(next1)
      yield 2 + next1
    }
    const iterator = generator()
    console.log(iterator.next(0)) // 第一次调用返回第一次yield的值，后续每调用一次向后迭代一次
    console.log(iterator.next(0))
    console.log(iterator.next(0))
    console.log(iterator.next(0)) // done true 意思是后面没有yield了，迭代结束

    // // co实现
    // function co(fn) {
    //   const gen = fn()

    //   function next(data) {
    //     const result = gen.next(data)
    //     if (result.done) return
    //     result.value(next)
    //   }

    //   next()
    // }

    // co(generator)
  })
}
