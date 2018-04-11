'use strict'

const test = require('ava').test
const OptionGroup = require('../src/option-group')

const text = 'option_group_name'
const opt1 = { text: 'text1', value: 'value1' }
const opt2 = { text: 'text2', value: 'value2', description: 'description2' }
const opt3 = { text: 'text3', value: 'value3', description: '' }
const opt4 = { text: 'text3', value: {foo: 'bar'} }
var options = [ opt1, opt2, opt3 ]

test('OptionGroup()', t => {
  const og = OptionGroup()

  t.truthy(og.data)
})

test('OptionGroup(text)', t => {
  const og = OptionGroup(text)

  t.is(og.data.text, text)
})

test('OptionGroup() chaining options', t => {
  const og = OptionGroup(text)
        .option(opt1.text, opt1.value)
        .option(opt2.text, opt2.value, opt2.description)
        .option(opt3.text, opt3.value, opt3.description)

  t.is(og.data.text, text)
  t.deepEqual(og.data.options, options)
})

test('OptionGroup() chaining with value objects', t => {
  const og = OptionGroup(text)
        .option(opt4.text, opt4.value)

  t.is(og.data.text, text)
  const expected = [opt4]
  expected[0].value = JSON.stringify(opt4.value)

  t.deepEqual(og.data.options, expected)
})

test('OptionGroup({text, options})', t => {
  const og = OptionGroup({text, options})

  t.is(og.data.text, text)
  t.deepEqual(og.data.options, options)
})

test('OptionGroup().select()', t => {
  const og = OptionGroup()
  t.truthy(og.select())
})

test('OptionGroup().end()', t => {
  const select = { foo: 'bar' }
  const og = OptionGroup()
    .select(select)
  t.is(og.end(), select)
})

test('OptionGroup().toJSON()', t => {
  const og = OptionGroup({text, options})
  t.truthy(og)
  t.deepEqual(og.toJSON(), og.json())
})
