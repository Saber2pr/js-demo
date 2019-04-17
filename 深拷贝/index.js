function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-17 17:47:35
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-17 18:02:06
   */
  const clone = value => {
    // 如果是数组，（Array.isArray也可以）
    // if (Object.prototype.toString.call(value) === '[object Array]') {
    //   return [...value]
    // }
    // 若不是Array 且 不是 object，则为基本数据类型，直接返回
    if (typeof value !== 'object') {
      return value
    }
    // 遍历每个属性，执行clone，并把返回值添加到新对象对应属性上
    return Object.keys(value).reduce(
      (out, key) => Object.assign(out, { [key]: clone(value[key]) }),
      {}
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
}
