/*
 * @Author: saber2pr
 * @Date: 2019-04-16 17:41:59
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-16 18:02:21
 */
const { Nana } = require('@saber2pr/nana')
// 域为http://localhost:3006/
Nana.fileServer().listen('3006', () => console.log('http://localhost:3006/'))
