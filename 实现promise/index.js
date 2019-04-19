function main () {
  /*
   * @Author: saber2pr 
   * @Date: 2019-04-19 10:32:06 
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-19 12:50:45
   */
  /**
   * 没有去实现A+，有时间研究好再回来写
   * promise本质就是把一串有序的任务注册到队列(微任务队列)里，然后在主线程执行完后去执行
   * 关键就是放到主线程后执行，setTimeout(job, 0)正好可以实现。但是这种做法无法区分宏任务还是微任务。
   * 使用reduce把上一个任务的结果传入下一个任务
   * promise构造函数executor是同步执行
   */
  class MyPromise {
    constructor(executor) {
      this.queue = []
      executor(this.process.bind(this))
    }
    static resolve (initialState) {
      return new MyPromise(resolve => resolve(initialState))
    }
    process (initialState) {
      const reduce = () => this.queue.reduce((preState, job) => job(preState), initialState)
      setTimeout(reduce)
    }
    then (job) {
      this.queue.push(job)
      return this
    }
  }

  new MyPromise(res => setTimeout(() => res(0), 1000)).then(res => {
    const next = res + 1
    console.log(next)
    return next
  }).then(res => {
    const next = res + 1
    console.log(next)
    return next
  })

  MyPromise.resolve(0).then(res => {
    const next = res + 1
    console.log(next)
    return next
  }).then(res => {
    const next = res + 1
    console.log(next)
    return next
  })

}