/*
 * @Author: saber2pr 
 * @Date: 2019-04-14 17:17:21 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-14 17:22:04
 */
function main() {
  /**
   * bracketBalance
   *
   * @param {string} str
   * @param {string} left
   */
  function bracketBalance(str, left, right) {
    const stack = []
    const items = str.split('')
    for (let item of items) {
      if (item === left) {
        stack.push(item)
      } else if (item === right) {
        if (stack.length === 0) {
          return false
        } else {
          stack.pop()
        }
      }
    }
    return stack.length === 0
  }

  return bracketBalance('()()()())', '(', ')')
}