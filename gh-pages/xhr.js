/* global XMLHttpRequest */

;(function (window) {
  var mapper = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '\t': '  '
  }
  window._xhr = function (url, selector, cb) {
    var req = new XMLHttpRequest()
    req.open('get', url, true)
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    req.onload = function () {
      var text = this.responseText || this.response
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
