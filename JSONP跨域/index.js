function main() {
  /*
   * @Author: saber2pr
   * @Date: 2019-04-16 16:42:18
   * @Last Modified by: saber2pr
   * @Last Modified time: 2019-04-16 23:01:37
   */
  /**
   * @param {string} url
   */
  const jsonp = url =>
    new Promise((resolve, reject) => {
      // 创建标签
      const script = document.createElement('script')
      // 设置回调名
      const callbackId = `jsonp_${Date.now()}`
      // 拼接请求的url，异步请求在这里，判断是否已经有参数
      script.src = url.includes('?')
        ? `${url}&callback=${callbackId}`
        : `${url}?callback=${callbackId}`
      // 设置读取返回结果的回调函数, 必须设置在window上
      window[callbackId] = result => {
        // 释放内存
        delete window[callbackId]
        document.body.removeChild(script)
        // 结果
        result ? resolve(result) : reject('404')
      }
      script.addEventListener('error', () => reject('script create fail'))
      // 发出请求
      document.body.appendChild(script)
    })

  jsonp('http://localhost:3005/jsonp?name=saber2pr&age=21').then(console.log)
}
