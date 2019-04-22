function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-22 21:36:38
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-22 23:19:48
   */
  /**
   * 模拟移动端touchmove事件
   * @param {HTMLElement} element
   * @param {(event:MouseEvent) => void} listener
   */
  const clickmove = (element, listener) => {
    // 设置鼠标按下的锁
    let status = false
    const unlock = () => (status = true)
    const effect = event => status && listener(event)
    const lock = () => (status = false)
    element.addEventListener('mousedown', unlock)
    element.addEventListener('mousemove', effect)
    element.addEventListener('mouseup', lock)
    element.addEventListener('mouseleave', lock)
    // 取消订阅
    return () => {
      element.removeEventListener('mousedown', unlock)
      element.removeEventListener('mousemove', effect)
      element.removeEventListener('mouseup', lock)
      element.removeEventListener('mouseleave', lock)
    }
  }
  /**
   * 节流
   * @param {Function} callback
   * @param {number} delta
   * @param {string} metaKey
   */
  const throttle = (callback, delta = 16, metaKey = '__$$count') => {
    const next = () => Reflect.set(throttle, metaKey, Date.now() + delta)
    Reflect.has(throttle, metaKey) || next()
    if (Date.now() > Reflect.get(throttle, metaKey)) {
      next()
      callback()
    }
  }

  /**
   * @param {string} className
   * @returns {HTMLElement}
   */
  const $ = className => document.querySelector(className)

  const platform = $('.platform')
  const target = $('.target')

  clickmove(target, event =>
    throttle(() => {
      const width = event.target.clientWidth
      const height = event.target.clientHeight
      // event.x表示触发事件元素的坐标x，减去自身一般宽度则为中心坐标x
      event.target.style.left = `${event.x - width / 2}px`
      event.target.style.top = `${event.y - height / 2}px`

      testEnter(
        platform,
        target,
        () => (platform.style.backgroundColor = 'red'),
        () => (platform.style.backgroundColor = 'green')
      )
    })
  )

  /**
   * 测试相交元素
   * 
   * `请确保两个元素在同一个父元素下`
   * @param {HTMLElement} element1
   * @param {HTMLElement} element2
   * @param {Function} onEnter
   * @param {Function} onOut
   */
  const testEnter = (element1, element2, onEnter, onOut) => {
    // clientWidth表示内容宽，包含内边距
    const width1 = element1.clientWidth
    const height1 = element1.clientHeight
    const width2 = element2.clientWidth
    const height2 = element2.clientHeight
    // offsetLeft表示相对父元素左边的距离
    const x1 = element1.offsetLeft
    const y1 = element1.offsetTop
    const x2 = element2.offsetLeft
    const y2 = element2.offsetTop

    // 坐标区间测试
    if (
      x1 > x2 - width1 &&
      x1 < x2 + width2 &&
      y1 > y2 - height1 &&
      y1 < y2 + height2
    ) {
      onEnter && onEnter()
    } else {
      onOut && onOut()
    }
  }
  /**
   * 总结一下
   * 
   * 1. 拖放元素首先要模拟touchmove，通过设置鼠标点击的锁判断元素是否被按住
   * 2. event.x event.y就是触发事件元素的具体坐标(根据position类型而定)
   * 3. js改变元素位置通过改变元素css style的top、left等属性实现
   * 4. 文档的坐标原点为左上角
   * 5. 动画元素最好设置绝对定位(脱离文档流)，否则频繁大面积回流
   * 6. 判断两个二维区间相交
   */
}