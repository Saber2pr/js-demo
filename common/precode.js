/*
 * @Author: saber2pr 
 * @Date: 2019-04-13 12:02:27 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-13 12:06:22
 */
main && main()

const pre = document.getElementById('code')

if (pre) {
  pre.innerHTML = main.toString()
  pre.style.backgroundColor = '#b5ffe6'
  pre.style.padding = '1rem'
  pre.style.borderRadius = '10px'
  pre.style.overflowX = 'auto'
}