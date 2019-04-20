function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-17 17:47:35
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-20 18:17:40
   */
  // 是否为数组
  const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]'

  const clone = value => {
    if (typeof value !== 'object') return value
    // 遍历每个属性，执行clone，并把返回值添加到新对象对应属性上
    return Object.keys(value).reduce(
      (out, key) => Object.assign(out, {
        [key]: clone(value[key])
      }), {}
    )
  }

  const obj = {
    name: 'saber',
    age: 21,
    like: ['js', 'ts']
  }

  const newObj = clone(obj)
  console.log(obj, newObj)
  obj.age = 233
  obj.like.push('vv')
  console.log(obj, newObj)
  // 补充
  /**
   * 深拷贝遇到循环引用会无限递归导致堆栈溢出
   * lodash却可以实现循环引用的拷贝，它的原理：
   * 利用了stack，每次访问一个属性后，把值存入stack中，如果stack中已经存在，说明发生了循环引用，则直接返回。
   * 即遇到循环引用的属性，就浅拷贝
   */
}