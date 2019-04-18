function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-18 14:17:43
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-18 14:29:12
   */
  /**
   * @param {string} url
   * @param {string} method
   * @param {object} params
   * @returns
   */
  function request(url, method = 'GET', params = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText)
          } else {
            reject({
              code: xhr.status,
              response: xhr.response
            })
          }
        }
      })
      setTimeout(() => reject('timeout:1000'), 1000)
      xhr.send(JSON.stringify(params))
    })
  }

  request('http://localhost:3005/user/?name=saber&age=21').then(console.log)
  request('http://localhost:3005/user/', 'POST', {
    name: 'saber',
    age: 233
  }).then(console.log)
}
