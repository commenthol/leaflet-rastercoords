/* global XMLHttpRequest */

;(function (window) {
  const mapper = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '\t': '  '
  }
  window._xhr = function (url, selector, cb) {
    const req = new XMLHttpRequest()
    req.open('get', url, true)
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    req.onload = function () {
      let text = this.responseText || this.response
      text = text.split('').map(function (char) {
        return mapper[char] || char
      }).join('')
      document.querySelector(selector).innerHTML = text
      cb && cb()
    }
    req.send()
    return this
  }
}(window))
