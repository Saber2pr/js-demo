/*
 * @Author: saber2pr 
 * @Date: 2019-04-15 16:02:47 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-15 18:05:42
 */
function main() {
  /**
   * 节流
   * @param {Function} callback 
   * @param {number} delta 
   * @param {string} metaKey 
   */
  const throttle = (callback, delta = 500, metaKey = '__$$count') => {
    const next = () => Reflect.set(throttle, metaKey, Date.now() + delta)
    Reflect.has(throttle, metaKey) || next()
    if (Date.now() > Reflect.get(throttle, metaKey)) {
      next()
      callback()
    }
  }
  document.getElementById('input').addEventListener('input', event =>
    throttle(() => document.getElementById('view').innerText = event.target.value))

  /**
   * 防抖
   * @param {{onSuccess, onFail}} callback 
   * @param {number} delta 
   * @param {string} metaKey 
   */
  const debounce = ({
    onSuccess,
    onFail,
  }, delta = 1000, metaKey = '__$$count') => {
    const now = () => Reflect.set(debounce, metaKey, Date.now())
    if (!Reflect.has(debounce, metaKey)) {
      now()
      onSuccess()
    } else {
      if (Date.now() - Reflect.get(debounce, metaKey) < delta) {
        onFail()
      } else {
        onSuccess()
      }
      now()
    }
  }

  const submitResult = document.getElementById('submitResult')

  document.getElementById('submit').addEventListener('click', () =>
    debounce({
      onSuccess: () => submitResult.innerText = '提交成功！',
      onFail: () => submitResult.innerText = '手速太快了！'
    }))
}