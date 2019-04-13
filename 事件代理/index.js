/*
 * @Author: saber2pr 
 * @Date: 2019-04-13 11:26:06 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-13 11:29:23
 */
const proxy = document.getElementById('proxy')

proxy.addEventListener('click', event => {
  const currentTarget = event.target
  const id = currentTarget.id
  switch (id) {
    case '1':
      console.log(1)
      break;
    case '2':
      console.log(2)
      break;
    case '3':
      console.log(3)
      break;
    default:
      break;
  }
})