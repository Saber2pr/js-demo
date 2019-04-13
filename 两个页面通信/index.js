/*
 * @Author: saber2pr 
 * @Date: 2019-04-13 23:20:47 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-13 23:40:29
 */
const targetOrigin = 'http://localhost:3000/child/child.html'

document.getElementById('form').onsubmit = event => {
  event.preventDefault()
  const value = document.getElementById('input').value
  document.getElementById('child').contentWindow.postMessage(value, targetOrigin)
}