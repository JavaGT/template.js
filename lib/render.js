module.exports = render
var renderLoops = require('./renderLoops.js')
var renderIfs = require('./renderIfs.js')
var renderData = require('./renderData.js')
function render(s, o){
  s = renderData(s, o)
  s = renderLoops(s, o)
  s = renderIfs(s, o)
  return s
}
