/*
 * @Author: saber2pr 
 * @Date: 2019-04-13 11:26:06 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-13 11:57:16
 */
const proxy = document.getElementById('proxy')

proxy.addEventListener('click', event => {
  const currentTarget = event.target
  const id = currentTarget.id
  switch (id) {
    case '1':
      alert(`proxy: ${1}`)
      break;
    case '2':
      alert(`proxy: ${2}`)
      break;
    case '3':
      alert(`proxy: ${3}`)
      break;
    default:
      break;
  }
})