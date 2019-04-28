function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-28 20:36:22
   * @Last Modified by: saber2prpr
   * @Last Modified time: 2019-04-28 21:39:2901
   */
  class Slider {
    /**
     * @param {HTMLElement} element
     */
    constructor(element, interval = 1000, startPos = 0) {
      this._content = element
      this._startPos = startPos
      this._current = startPos
      this._interval = interval
      this._isPaused = false
    }
    get width() {
      return this._content.clientWidth
    }
    get length() {
      return this._content.children.length
    }
    get step() {
      return this.width / this.length
    }
    goto(offset) {
      if (offset > 0 || offset < -this.width) return
      this._current = offset
      return this
    }
    end() {
      this._content.style.left = `${this._current}px`
      return this
    }
    last() {
      this.goto(this._current + this.step)
      return this
    }
    next() {
      this.goto(this._current - this.step)
      return this
    }
    _update() {
      if (this._isPaused) return
      if (this._current === -this.width) {
        this.goto(this._startPos).end()
      } else {
        this.next().end()
      }
    }
    start() {
      this.end()
      this.schedule = setInterval(this._update.bind(this), this._interval)
      return this
    }
    pause() {
      this._isPaused = true
      return this
    }
    resume() {
      this._isPaused = false
      return this
    }
    stop() {
      clearInterval(this.schedule)
      return this
    }
  }
  /**
   * @param {string} selector
   * @returns {HTMLElement}
   */
  const $ = selector => document.querySelector(selector)
  const base = $('#slider')
  const content = $('.container>.content')
  const leftBtn = $('#left')
  const rightBtn = $('#right')
  const slider = new Slider(content).start()
  base.addEventListener('mouseover', () => slider.pause())
  base.addEventListener('mouseout', () => slider.resume())
  leftBtn.addEventListener('click', () => slider.next().end())
  rightBtn.addEventListener('click', () => slider.last().end())
  const menu = $('#menu')
  // 事件代理
  menu.addEventListener('mouseover', event => {
    switch (Number(event.target.id)) {
      case 1:
        slider.goto(0).end()
        break
      case 2:
        slider.goto(-slider.step).end()
        break
      case 3:
        slider.goto(-slider.step * 2).end()
        break
      case 4:
        slider.goto(-slider.step * 3).end()
        break
      default:
        break
    }
  })
}
