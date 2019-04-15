/*
 * @Author: saber2pr 
 * @Date: 2019-04-13 12:02:27 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-15 17:27:37
 */
if (main) {
  const output = document.getElementById('output')
  const result = main()
  if (output) output.innerText = JSON.stringify(result, null, 2)
}

const pre = document.getElementById('code')

if (pre) {
  pre.innerHTML = main.toString()
  pre.style.backgroundColor = '#b5ffe6'
  pre.style.padding = '1rem'
  pre.style.borderRadius = '10px'
  pre.style.overflowX = 'auto'
}