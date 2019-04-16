/*
 * @Author: saber2pr
 * @Date: 2019-04-16 17:38:53
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-16 18:03:01
 */
const request = axios.create({
  baseURL: 'http://localhost:3005',
  timeout: 1000
})
// 当前域为http://localhost:3005/时，不跨域
// 当前域为http://localhost:3006/，跨域（端口不一致）
// 与http://localhost:3005的后端约定，后端设置cors响应头为当前域
request.get('http://localhost:3005/cors_test').then(console.log)
