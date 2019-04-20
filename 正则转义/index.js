function main() {
  /*
   * @Author: saber2pr 
   * @Date: 2019-04-20 15:00:08 
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-20 15:53:27
   */
  const element = `<script>hello</script>`

  /**
   * 正则对象(全局g)的exec方法可用来迭代搜索字符串，并把匹配到的位置记录到lastIndex属性
   * 1. 利用split把字符串拆解成字符序列
   * 2. 根据匹配到的index修改序列对应元素
   * 3. 利用join反序列为字符串
   * @param {string} element 
   */
  const transform0 = element => {
    // 得到字符序列
    const words = element.split('')
    const reg = /<|>/g
    let res = reg.exec(element)
    while (res) {
      // 匹配到的位置会被记录到lastIndex属性，由于是从1开始，所以要-1
      const index = reg.lastIndex - 1
      // 修改序列对应元素
      words.splice(index, 1, element.charCodeAt(index))
      // 迭代搜索下一个位置
      res = reg.exec(element)
    }
    return words.join('')
  }

  console.log(transform0(element))

  // 利用dom innerText转义
  // innerText输入,innerHTML输出
  const transform1 = element => {
    const dom = document.createElement('span')
    dom.innerText = element
    return dom.innerHTML
  }

  console.log(transform1(element))

}