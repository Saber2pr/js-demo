/*
 * @Author: saber2pr 
 * @Date: 2019-04-13 13:52:36 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-13 14:23:26
 */
function main() {
  /**
   * bind
   * @param {object} model 
   * @param {object} map 
   */
  const bind = (model, map) => new Proxy(map || model, {
    get(_, key) {
      const mkey = map ? map[key] : key
      return Reflect.get(model, mkey)
    },
    set(_, key, value) {
      const mkey = map ? map[key] : key
      return Reflect.set(model, mkey, value)
    }
  })

  window.__alternate = bind(document.getElementById('p'), {
    'value': 'innerHTML'
  })
}