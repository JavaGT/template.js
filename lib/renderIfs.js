module.exports = renderIfs
var render = require('./render.js')
var evaluate = require('evaluate.js')
var REGEX_IF = /{{if:\s*([\s\S]*?)\s*([\s\S]*?)\s*?}}([\s\S]*?)(?={{)(?:{{else:\s*\1\s*}})?([\s\S]*?){{\/if:\s*\1\s*}}/g
function renderIfs(s, o) {
  return s.replace(REGEX_IF, function(a, s, d, f, g) {
    return render((evaluate(d, o) ? f : g), o)
  })
}
