function main () {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-17 21:22:07
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-18 17:37:20
   */
  // 判断一个对象是不是数组
  const isArray0 = obj => Array.isArray(obj)
  const isArray1 = obj =>
    Object.prototype.toString.call(obj) === '[object Array]'
  console.log(isArray0([]))
  console.log(isArray0({ 0: 'value', length: 1 }))
  console.log(isArray1([]))
  console.log(isArray1({ 0: 'value', length: 1 }))
  console.log(isArray0(arguments))
  console.log(isArray1(arguments))
  console.log(isArray0(document.getElementsByClassName('')))
  console.log(isArray1(document.getElementsByClassName('')))
  console.log(isArray0(document.getElementsByTagName('div')))
  console.log(isArray1(document.getElementsByTagName('div')))
  console.log(Array.from({ 0: 'value', length: 1 }))
  console.log(isArray0(Array.from({ 0: 'value', length: 1 })))
  console.log(isArray1(Array.from({ 0: 'value', length: 1 })))
  /// es5方法

  // for遍历基本类型，注意for of是取数组元素，for in是取对象属性
  const clone0 = arr => {
    const result = []
    for (let item of arr) {
      result.push(item)
    }
    return result
  }

  const arr0 = [1, 2, 3]
  const newArr0 = clone0(arr0)
  arr0[2] = 233
  console.log(newArr0)

  /// slice是纯函数，用来截取指定区间的内容
  const arr1 = [1, 2, 3]
  const newArr1 = arr1.slice()
  arr1[2] = 233
  console.log(newArr1)

  // concat也是纯函数
  const arr2 = [1, 2, 3]
  const newArr2 = Array.prototype.concat(arr2)
  arr2[2] = 233
  console.log(newArr2)

  /// es6方法

  const arr3 = [1, 2, 3]
  const newArr3 = Object.assign([], arr3)
  arr3[2] = 233
  console.log(newArr3)

  const arr4 = [1, 2, 3]
  const newArr4 = [...arr4]
  arr4[2] = 233
  console.log(newArr4)

  const arr5 = [1, 2, 3]
  const newArr5 = arr5.map(i => i)
  arr5[2] = 233
  console.log(newArr5)

  const arr6 = [1, 2, 3]
  const newArr6 = arr6.reduce((out, cur) => {
    out.push(cur)
    return out
  }, [])
  arr6[2] = 233
  console.log(newArr6)

  const arr7 = [1, 2, 3]
  const newArr7 = arr7.filter(_ => 1)
  arr7[2] = 233
  console.log(newArr7)

  /// API实现
  /**
   * map
   */
  Array.prototype.myMap = function (callbackfn, thisArg) {
    const newArr = []
    for (let i = 0; i < this.length; i++) {
      newArr.push(callbackfn.call(thisArg, this[i], i, this))
    }
    return newArr
  }
  console.log([1, 2, 3].myMap(i => i * i))

  /**
   * reduce
   * 为什么原生的reduce没有thisArg??
   */
  Array.prototype.myReduce = function (callbackfn, initialValue = null) {
    for (let i = 0; i < this.length; i++) {
      initialValue = callbackfn(initialValue, this[i], i, this)
      // initialValue = callbackfn.call(thisArg, initialValue, this[i], i, this)
    }
    return initialValue
  }
  console.log([1, 2, 3].myReduce((pre, cur) => pre + cur))

  /**
   * filter
   */
  Array.prototype.myFilter = function (callbackfn, thisArg) {
    const newArr = []
    for (let i = 0; i < this.length; i++) {
      callbackfn.call(thisArg, this[i], i, this) && newArr.push(this[i])
    }
    return newArr
  }
  console.log([1, 2, 3].myFilter(i => i >= 2))

  // 对象作用域
  const obj = {
    value: 2,
    testFilter () {
      // function函数作用域，上下文随调用时的作用域决定
      return [1, 2, 3].myFilter(function (i) {
        return i >= this.value
      }, this)
    },
    testReduce () {
      return [1, 2, 3].myReduce((pre, cur) => pre + this.value + cur, 0)
    }
  }
  console.log(obj.testFilter())
  console.log(obj.testReduce())

  // 补充
  // 数组乱序
  console.log([1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() > 0.5 ? 1 : -1))
  function shuffle (arr) {
    for (let i = 0; i < arr.length; i++) {
      const index = parseInt(Math.random() * (arr.length - 1));
      [arr[i], arr[index]] = [arr[index], arr[i]]
    }
    return arr
  }
  console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]))
}
