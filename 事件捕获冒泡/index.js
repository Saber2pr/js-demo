/*
 * @Author: saber2pr 
 * @Date: 2019-04-13 11:34:40 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-13 12:02:54
 */
function main() {
  /**
   * lisen
   * @param {string[]} ids 
   * @param {boolean} isCatch 
   */
  const lisen = (ids, isCatch) => ids.forEach(id => document.getElementById(id).addEventListener('click', () => alert(id), isCatch))

  // BubbleEvent
  lisen(['root_b', 'first_b', 'second_b', 'target_b'], false)
  // CatchEvent
  lisen(['root_c', 'first_c', 'second_c', 'target_c'], true)
}