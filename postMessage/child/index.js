/*
 * @Author: saber2pr 
 * @Date: 2019-04-13 23:23:25 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-13 23:44:16
 */
function main() {
  window.addEventListener('message', event => document.getElementById('receive').innerHTML = event.data)
}