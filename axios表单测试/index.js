/*
 * @Author: saber2pr 
 * @Date: 2019-04-15 18:39:21 
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-15 22:02:15
 */
const username = document.querySelector('input[name=username]')
const password = document.querySelector('input[name=password]')

document.getElementById('submit').addEventListener('submit', event => {
  event.preventDefault()

  const request = axios.create({
    baseURL: 'http://localhost:3005',
    timeout: 1000
  })

  request.get('/user/', {
    params: {
      username: username.value,
      password: password.value
    }
  }).then(res => {
    console.log('GET:', res)
  })

  request.post(`/user/`, {
      username: username.value,
      password: password.value
    })
    .then(res => {
      console.log('POST:', res)
    })

  console.log('submit')
})