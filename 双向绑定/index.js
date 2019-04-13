/*
 * @Author: saber2pr 
 * @Date: 2019-04-13 12:41:57 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-13 14:21:48
 */
function main() {
  /**
   * bind
   * @param {object} target 
   * @param {object} model 
   * @param {object} map 
   */
  const bind = (target, model, map) =>
    Object.keys(map || target).forEach(key =>
      Object.defineProperty(target, key, {
        set(value) {
          const mkey = map ? map[key] : key
          model[mkey] = value
        },
        get() {
          const mkey = map ? map[key] : key
          return model[mkey]
        }
      }))

  window.__alternate = {}
  const p = document.getElementById('p')

  bind(__alternate, p, {
    'value': 'innerHTML'
  })

}