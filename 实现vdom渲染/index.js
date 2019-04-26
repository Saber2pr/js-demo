function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-26 16:20:04
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-26 16:46:56
   */
  /**
   * 虚拟dom构造函数
   * @param {keyof HTMLElementTagNameMap} type
   * @param {Element} props
   * @param {VDom[]} children
   */
  function VDom(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
  /**
   * @param {keyof HTMLElementTagNameMap} type
   * @param {Element} props
   * @param {VDom[]} children
   */
  function h(type, props, children = []) {
    return new VDom(type, props, children)
  }

  const tree = h('div', {}, [h('p', { innerText: 'hello' })])
  /**
   * @param {VDom} vdom
   * @param {HTMLElement} container
   */
  function renderDom(vdom, container) {
    const dom = document.createElement(vdom.type)
    Object.entries(vdom.props).forEach(([k, v]) => (dom[k] = v))
    container.append(dom)
    vdom.children && vdom.children.forEach(child => renderDom(child, dom))
  }

  renderDom(tree, document.getElementById('root'))

  /**
   * @param {VDom} vdom
   * @param {VDom[]} [stack=[vdom]]
   */
  function* toIterable(vdom, stack = [vdom]) {
    while (stack.length) {
      const node = stack.pop()
      node.children && stack.push(...node.children)
      yield node
    }
  }
  console.log(Array.from(toIterable(tree)))
}
