function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-24 21:47:24
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-24 23:08:25
   */
  /**
   * 虚拟dom构造函数
   * @param {{}} props
   * @param {VDom[]} children
   */
  function VDom(props, children) {
    this.props = props
    this.children = children
  }
  /**
   * Fiber构造函数
   * @param {VDom} instance
   * @param {Fiber} parent
   * @param {Fiber} child
   * @param {Fiber} sibling
   */
  function Fiber(instance, parent, child, sibling) {
    this.instance = instance
    this.parent = parent
    this.child = child
    this.sibling = sibling
  }
  /**
   * 链接fiber实例vdom的children为单向链表，并返回第一个子节点
   * 若fiber实例vdom没有children，则返回null
   * @param {Fiber} fiber
   * @returns {Fiber}
   */
  function link(fiber) {
    if (!fiber.instance.children) return null
    return (fiber.child = fiber.instance.children.reduceRight(
      (sibling, current) => new Fiber(current, fiber, null, sibling),
      null
    ))
  }
  /**
   * Fiber迭代算法(深度优先遍历)
   * @param {Fiber} fiber
   */
  function next(fiber) {
    const child = link(fiber)
    if (child) return child
    let current = fiber
    while (current) {
      if (current.sibling) return current.sibling
      current = current.parent
    }
  }
  /**
   * 循环迭代
   * @param {Fiber} fiber
   * @param {(fiber:Fiber) => void} callback
   */
  function loop(fiber, callback) {
    let current = fiber
    while (current) {
      callback(current)
      current = next(current)
    }
  }

  // 虚拟dom树
  const root = new VDom({ value: 1 }, [
    new VDom({ value: 2 }, [new VDom({ value: 4 })]),
    new VDom({ value: 3 }, [new VDom({ value: 5 })])
  ])

  // 虚拟dom树转为fiber链表，开始遍历
  loop(new Fiber(root), fiber => console.log(fiber.instance.props))

  let __current = new Fiber(root)
  // 使用浏览器调度API-requestIdleCallback
  function work(dline) {
    console.log(__current.instance.props, dline.timeRemaining())
    __current = next(__current)
    if (__current) requestIdleCallback(work)
  }

  requestIdleCallback(work)
}
