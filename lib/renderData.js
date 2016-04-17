module.exports = renderData
var dot = require('dot.js')
var REGEX_DATA = /{{(?![\S]*?:)\s*([\s\S]*?)\s*}}/g

function renderData(s, o){
  return s.replace(REGEX_DATA, function(a,b){
    return dot(b, o)
  })
}
