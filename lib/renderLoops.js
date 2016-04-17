module.exports = renderLoops
var dot = require('dot.js')
var render = require('./render.js')
var REGEX_FOR = /{{for:\s*([\s\S]*?)\s*([\s\S]*?)\s*}}([\s\S]*?){{\/for:\s*\1\s*}}/g

function renderLoops(s, obj) {
  var m;
  while ((m = REGEX_FOR.exec(s)) !== null) {
    if (m.index === REGEX_FOR.lastIndex) {
      REGEX_FOR.lastIndex++;
    }
    if (m) {
      var temp = ''
      dot(m[2], obj).forEach(function(subdata) {
        temp += render(m[3].replace(RegExp('{{'+m[1]+':\\s*([\\s\\S]*?)\\s*}}','g'), function(a,s){
          return dot(s, subdata) || ''
        }), obj)
      })
      s = s.replace(m[0], temp)
    }
  }
  return s
}
