function main() {
  /*
   * @Author: saber2pr 
   * @Date: 2019-04-20 15:55:51 
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-20 16:40:36
   */
  /**
   * 可迭代对象(iterable)就是部署有Symbol.iterator的对象
   * 使用for-of遍历时会自动获取迭代器的返回值
   */
  const obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    lastIndex: 0,
    length: 3,
    [Symbol.iterator]() {
      return {
        next: () => ({
          value: this[this.lastIndex++],
          done: this.lastIndex > this.length
        })
      }
    }
  }

  for (let i of obj) {
    console.log(i, obj.lastIndex)
  }

  /**
   * isIterable
   * 判断一个对象是否是可遍历对象
   * 就是看有没有部署Symbol.iterator接口，该属性是function类型
   */
  function isIterable(obj) {
    return typeof obj[Symbol.iterator] === 'function'
  }
  // js内置iterable：
  // String、Array、Map、Set、arguments和其他伪数组、generator
  // 注意 WeakMap 和 WeakSet不是 iterable
  console.log(isIterable('')) // true
  console.log(isIterable([])) // true
  console.log(isIterable(new Map())) // true
  console.log(isIterable(new WeakMap())) // false
  console.log(isIterable(new Set())) // true
  console.log(isIterable(new WeakSet())) // false
  console.log(isIterable(arguments)) // true
  console.log(isIterable(document.getElementsByTagName('script'))) // true
  console.log(isIterable((function* () {})())) // true

}