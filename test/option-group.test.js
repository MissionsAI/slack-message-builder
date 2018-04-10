'use strict'

const test = require('ava').test
const OptionGroup = require('../src/option-group')

const text = 'option_group_name'
const opt1 = { text: 'text1', value: 'value1' }
const opt2 = { text: 'text2', value: 'value2', description: 'description2' }
const opt3 = { text: 'text3', value: 'value3', description: '' }
var option_groups = [ opt1, opt2, opt3 ] // eslint-disable-line

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
  t.deepEqual(og.data.option_groups, option_groups)
})

test('OptionGroup({text, option_groups})', t => {
  const og = OptionGroup({text, option_groups})

  t.is(og.data.text, text)
  t.deepEqual(og.data.option_groups, option_groups)
})

test('OptionGroup().toJSON()', t => {
  const og = OptionGroup({text, option_groups})
  t.truthy(og)
  t.deepEqual(og.toJSON(), og.json())
})
