function main () {
  /*
   * @Author: saber2pr 
   * @Date: 2019-04-19 10:32:06 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-19 11:42:38
   */
  class MyPromise {
    constructor(executor) {
      this.queue = []
      executor(this.process.bind(this))
    }
    static resolve (initialState) {
      return new MyPromise(executor => executor(initialState))
    }
    process (initialState) {
      setTimeout(() => this.queue.reduce((pre, cur) => cur(pre), initialState))
    }
    then (preState) {
      this.queue.push(preState)
      return this
    }
  }

  new MyPromise(res => setTimeout(() => {
    res(0)
  }, 1000)).then(res => {
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