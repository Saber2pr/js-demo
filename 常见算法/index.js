function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-26 10:59:23
   * @Last Modified by: saber2prpr
   * @Last Modified time: 2019-04-26 11:16:1741
   */
  /**
   * 判断回文字符串
   *
   * @param {string} str
   */
  function checkStr(str) {
    return str
      .split('')
      .reverse()
      .join('')
  }
  console.log(checkStr('abcdef'))

  /**
   * 数组去重
   *
   * @param {number[]} arr
   */
  function dedup0(arr) {
    return [...new Set(arr)]
  }
  console.log(dedup0([1, 2, 3, 4, 3, 2, 5]))

  /**
   * @param {number[]} arr
   */
  function dedup1(arr) {
    return arr.reduce(
      (out, cur) => (out.includes(cur) ? out : out.concat(cur)),
      []
    )
  }
  console.log(dedup1([1, 2, 3, 4, 3, 2, 5]))

  /**
   * @param {number[]} arr
   */
  function dedup2(arr) {
    const obj = {}
    const result = []
    for (const item of arr) {
      if (!(item in obj)) {
        obj[item] = result.push(item)
      }
    }
    return result
  }
  console.log(dedup2([1, 2, 3, 4, 3, 2, 5]))

  // 数组乱序
  console.log([1, 2, 3, 4, 5].sort(() => Math.random() - 0.5))

  function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
      const index = parseInt(Math.random() * (arr.length - 1))
      ;[arr[i], arr[index]] = [arr[index], arr[i]]
    }
    return arr
  }
  console.log(shuffle([1, 2, 3, 4, 5]))

  /**
   * 找出重复次数最多的字符
   * @param {string} str
   */
  function findMaxCode(str) {
    const union = str.split('')
    const obj = {}
    // 记录所有字符出现的次数
    union.forEach(item => {
      if (item in obj) {
        obj[item]++
      } else {
        obj[item] = 1
      }
    })
    let max = 0
    let result = ''
    // 找出出现次数最多的元素
    Object.entries(obj).forEach(([key, times]) => {
      if (times > max) {
        max = times
        result = key
      }
    })
    return result
  }
  console.log(findMaxCode('abf ff fcdbccef'))

  /**
   * 不借助temp交换两个数
   * @param {[number, number]} arr
   */
  function swap(arr) {
    return ([arr[0], arr[1]] = [arr[1], arr[0]])
  }
  console.log(swap([1, 2]))

  /**
   * 费波那契
   * @param {number} n
   * @returns
   */
  function Fibonacci(n) {
    const result = []
    let i = 0
    while (i < n) {
      if (i <= 1) {
        result.push(i)
      } else {
        result.push(result[i - 1] + result[i - 2])
      }
      i++
    }
    return result
  }
  console.log(Fibonacci(4))

  /**
   * 找出数组的最大差值
   * @param {number[]} arr
   */
  function getMaxProfit(arr) {
    return Math.max.apply(null, arr) - Math.min.apply(null, arr)
  }

  console.log(getMaxProfit([1, 2, 5, 4, 3]))

  /**
   * 随机生成指定长度的字符串
   * @param {number} length
   */
  function randomString(length) {
    const str = 'abcdefghijklmnopqrstuvwxyz9876543210'
    return Array(length)
      .fill('')
      .map(() => str.charAt(Math.floor(str.length * Math.random())))
      .join('')
  }

  console.log(randomString(5))

  /**
   * 实现getElementsByClassName
   * @param {HTMLElement} element
   * @param {string} className
   */
  function queryClassName(element, className) {
    return Array.from(element.getElementsByTagName('*')).filter(
      e => e.className === className
    )
  }
  console.log(queryClassName(document.getElementById('target'), 'test'))
  /**
   * 注意Math.random包括0不包括1
   * Math.floor向下取整
   *
   * 取min到max但不包括max
   * @param {number} min
   * @param {number} max
   */
  function getRandomNum(max, min = 0) {
    return Math.floor(min + (max - min) * Math.random())
  }
  console.log(getRandomNum(5))

  /**
   * 随机获取数组中的元素
   * @param {number[]} arr
   */
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  console.log(getRandomItem([1, 2, 3, 4, 5]))

  // 输入n输出1, 2, 3, ...n
  function getArray(n) {
    return Array(n)
      .fill(0)
      .map((_, i) => i)
  }
  console.log(getArray(5))

  /**
   * 清空数组0
   * @param {number[]} arr
   */
  function clear0(arr) {
    arr.splice(0, arr.length)
    return arr
  }
  console.log(clear0([1, 2, 3, 4, 5]))
  /**
   * 清空数组1
   * @param {number[]} arr
   */
  function clear1(arr) {
    arr.length = 0
    return arr
  }
  console.log(clear1([1, 2, 3, 4, 5]))

  /**
   * 保留指定小数位
   * @param {number} n
   * @param {number} fractionDigits
   * @returns
   */
  function Fix(n, fractionDigits) {
    return n.toFixed(fractionDigits)
  }
  console.log(Fix(1.2365, 2))

  /**
   * 生成指定长度的随机字母数字字符串(uuid)
   * Math.random().toString(36)输出的结果前面有小数点，
   * 所以利用substr截取后面的部分
   * substr和slice的第一个参数都是起始位置，第二个参数substr是长度，slice是结束位置
   *
   * @param {number} [len=10]
   * @returns
   */
  function uuid(len = 10) {
    let str = ''
    while (str.length < len) {
      str += Math.random()
        .toString(36)
        .substr(2)
    }
    // 控制长度
    return str.slice(0, len)
  }
  console.log(uuid(20))

  // 找出数组中出现次数最的元素，并给出其出现过的位置
  // 这和找出字符串中出现次数最多的字符一个道理
  /**
   * @param {number[]} arr
   */
  function getMaxItem(arr) {
    const obj = {}
    const recode = {}
    // 记录每个元素出现的次数和位置
    arr.forEach((v, i) => {
      if (v in obj) {
        obj[v]++
        recode[v].push(i)
      } else {
        obj[v] = 1
        recode[v] = [i]
      }
    })
    let maxStr = ''
    let max = 0
    // 选出出现次数最多的元素
    Object.entries(obj).forEach(([k, v]) => {
      if (v > max) {
        max = v
        maxStr = k
      }
    })
    // 返回出现次数最多的元素和它的位置
    return { maxStr, indexs: recode[maxStr] }
  }

  console.log(getMaxItem([1, 2, 3, 2, 3, 4, 5, 5, 2, 5, 6, 2, 7, 3]))

  // 数组元素二分查找
  // 注意start、end中间值为 (start + end) / 2
  /**
   * @param {number[]} arr
   * @param {number} item
   */
  function indexOf(arr, item, start = 0, end = arr.length) {
    // 被分为空数组，则返回-1
    if (start === end) return -1
    // 中间索引
    const index = Math.floor((start + end) / 2)
    // 中间值
    const middle = arr[index]
    // 找到目标
    if (middle === item) return index
    // 目标在左边
    if (item < middle) return indexOf(arr, item, start, index)
    // 目标在右边
    if (item > middle) return indexOf(arr, item, index + 1)
  }
  console.log(indexOf([0, 1, 2, 3, 4, 5, 6], 2))
}
