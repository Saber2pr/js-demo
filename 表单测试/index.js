/*
 * @Author: saber2pr 
 * @Date: 2019-04-15 18:39:21 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-15 18:44:14
 */
document.getElementById('submit').addEventListener('submit', event => {
  event.preventDefault()
  const username = document.querySelector('input[name=username]').value
  const password = document.querySelector('input[name=password]').value
  fetch(`http://localhost:3005/user/?username=${username}&password=${password}`).then(res => res.text()).then(console.log)
  console.log('submit')
})