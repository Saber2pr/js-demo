function main() {
  /*
   * @Author: saber2pr 
   * @Date: 2019-04-23 12:01:13 
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-23 12:38:41
   */
  const target = document.getElementById('async2')
  const height = target.clientHeight
  /**
   * 节流
   * @param {Function} callback
   * @param {number} delta
   * @param {string} metaKey
   */
  const throttle = (callback, delta = 100, metaKey = '__$$count') => {
    const next = () => Reflect.set(throttle, metaKey, Date.now() + delta)
    Reflect.has(throttle, metaKey) || next()
    if (Date.now() > Reflect.get(throttle, metaKey)) {
      next()
      callback()
    }
  }

  window.addEventListener('scroll', () => throttle(() => {
    testClientRect(target, () => {
      target.style.backgroundColor = 'red'
    }, () => {
      target.style.backgroundColor = 'green'
    }, -height / 2, height / 2)
  }))

  /**
   * 进入视口范围检测
   *
   * @param {HTMLElement} element
   * @param {VoidFunction} onEnter
   * @param {VoidFunction} onOut
   * @param {number} [deltaTop=0]
   * @param {number} [deltaBottom=0]
   */
  function testClientRect(element, onEnter, onOut, deltaTop = 0, deltaBottom = 0) {
    const rect = element.getBoundingClientRect()
    // 坐标区间检测
    if (rect.y < window.innerHeight + deltaTop && rect.y > -rect.height + deltaBottom) {
      onEnter && onEnter()
    } else {
      onOut && onOut()
    }
  }
}