function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-17 22:39:16
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-17 23:33:32
   */
  // 对象作用域
  const objContext = {
    value: 233,
    getValue(c, a) {
      console.log(c, a)
      return this.value
    }
  }
  // 获取对象作用域内的函数
  const method = objContext.getValue

  // 函数作用域下（父作用域不能访问子作用域！）
  console.log(method()) // undefined

  // 手动转移（绑定、指定）执行上下文到objContext上下文中
  console.log(method.apply(objContext)) // 233
  console.log(method.call(objContext)) // 233
  console.log(method.bind(objContext)()) // 233

  // 实现bind
  Function.prototype.myCall = function(thisArg) {
    const id = Symbol()
    context = thisArg || window
    context[id] = this
    const result = context[id](...Array.from(arguments).slice(1))
    delete context[id]
    // 伪数组转真数组，去除上下文参数
    return result
  }

  console.log(method.myCall(objContext, 222, 22))

  console.log(Math.max.myCall(objContext, ...[1, 2, 3]))
  console.log(objContext)
}
