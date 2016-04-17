var assert = require('chai').assert
var r = require('./index.js')

var o = {
  string: 'Arthur Dent',
  info: {
    luckyNumber: 42
  },
  numbers: [0,1,2]
}

describe('Templating', function(){
  describe('Loops', function () {
    it('Single Loop', function(){
      assert.equal(r('{{for:1 numbers}}{{1: .}}{{/for:1}}', o), o.numbers.join(''))
    })
    it('Loop in Loop', function(){
      var string = ''
      o.numbers.forEach(function(a){
        o.numbers.forEach(function(b){
          string += a + '' + b
        })
      })
      assert.equal(r('{{for:1 numbers}}{{for:2 numbers}}{{1: .}}{{2: .}}{{/for:2}}{{/for:1}}', o), string)
    })
  })
  describe('If Statments', function(){
    it('If (true)', function(){
      assert.equal(r('{{if:1 4>2}}YES!{{/if:1}}', o), 'YES!')
    })
    it('If (false)', function(){
      assert.equal(r('{{if:1 4<2}}YES!{{/if:1}}', o), '')
    })
    it('If / Else (true)', function(){
      assert.equal(r('{{if:1 4>2}}YES!{{else:1}}NO!{{/if:1}}', o), 'YES!')
    })
    it('If / Else (false)', function(){
      assert.equal(r('{{if:1 4<2}}YES!{{else:1}}NO!{{/if:1}}', o), 'NO!')
    })
  })
  describe('Data Insertion', function(){
    it('Value', function(){
      assert.equal(r('Hello: {{string}}', o), 'Hello: ' + o.string)
    })
    it('Nested Value', function(){
      assert.equal(r('{{info.luckyNumber}}', o), o.info.luckyNumber)
    })
    it('Array Value', function(){
      assert.equal(r('{{numbers.2}}', o), o.numbers[2])
    })
  })
})
