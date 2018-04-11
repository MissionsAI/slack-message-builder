'use strict'

const test = require('ava').test
const Select = require('../src/select')

const name = 'select_name'
const text = 'Select Text'
const value = 'select value'
const dataSource = 'datasource'
const minQueryLength = 3
const opt1 = { text: 'text1', value: 'value1' }
const opt2 = { text: 'text2', value: 'value2', description: 'description2' }
const opt3 = { text: 'text3', value: 'value3', description: '' }
var options = [ opt1, opt2, opt3 ]
var selectedOptions = [ opt1 ]

test('Select()', t => {
  var sel = Select()

  t.is(sel.data.name, undefined)
  t.is(sel.data.text, undefined)
  t.is(sel.data.value, undefined)
  t.is(sel.data.options, undefined)
  t.is(sel.data.type, 'select')
})

test('Select(name, text)', t => {
  var sel = Select(name, text)

  t.is(sel.data.name, name)
  t.is(sel.data.text, text)
  t.is(sel.data.value, undefined)
  t.is(sel.data.type, 'select')
})

test('Select(name, text).val(value)', t => {
  var sel = Select(name, text).val(value)

  t.is(sel.data.name, name)
  t.is(sel.data.text, text)
  t.is(sel.data.value, value)
  t.is(sel.data.type, 'select')
})

test('Select({name, text, value, options, selectedOptions, dataSource, minQueryLength})', t => {
  var sel = Select({name, text, value, options, selectedOptions, dataSource, minQueryLength})

  t.is(sel.data.name, name)
  t.is(sel.data.text, text)
  t.is(sel.data.value, value)
  t.is(sel.data.options, options)
  t.is(sel.data.selected_options, selectedOptions)
  t.is(sel.data.data_source, dataSource)
  t.is(sel.data.min_query_length, minQueryLength)
  t.is(sel.data.type, 'select')
})

test('Select() chaining settings', t => {
  var sel = Select()
    .name(name)
    .text(text)
    .value(value)
    .options(options)
    .selectedOptions(selectedOptions)
    .dataSource(dataSource)
    .minQueryLength(minQueryLength)

  t.is(sel.data.name, name)
  t.is(sel.data.text, text)
  t.is(sel.data.value, value)
  t.is(sel.data.options, options)
  t.is(sel.data.selected_options, selectedOptions)
  t.is(sel.data.data_source, dataSource)
  t.is(sel.data.min_query_length, minQueryLength)
  t.is(sel.data.type, 'select')
})

test('Select() chaining each option', t => {
  var sel = Select(name, text)
    .value(value)
    .option(opt1.text, opt1.value)
    .option(opt2.text, opt2.value, opt2.description)
    .option(opt3.text, opt3.value, opt3.description)

  t.is(sel.data.name, name)
  t.is(sel.data.text, text)
  t.is(sel.data.value, value)
  t.deepEqual(sel.data.options, options)
  t.is(sel.data.type, 'select')
})

test('Select() chaining each selectedOption', t => {
  var sel = Select()
  selectedOptions.forEach(opt => sel.selectedOption(opt.text, opt.value))

  t.deepEqual(sel.data.selected_options, selectedOptions)
  t.is(sel.data.type, 'select')
})

test('Select() auto-stringify values that are objects', t => {
  var val = { some: 'object', nested: { down: 'here' } }
  var strVal = JSON.stringify(val)
  var sel = Select(name, text)
    .option(text, val)

  t.is(1, sel.data.options.length)
  t.is(text, sel.data.options[0].text)
  t.is(strVal, sel.data.options[0].value)
  t.is(sel.data.type, 'select')
})

test('Select() auto-stringify selected_options values that are objects', t => {
  var val = { some: 'object', nested: { down: 'here' } }
  var strVal = JSON.stringify(val)
  var sel = Select(name, text)
    .selectedOption(text, val)

  t.is(1, sel.data.selected_options.length)
  t.is(text, sel.data.selected_options[0].text)
  t.is(strVal, sel.data.selected_options[0].value)
  t.is(sel.data.type, 'select')
})

test('Select() encoding value', t => {
  var value = { foo: 'bar' }
  var sel = Select().value(value)

  t.is(sel.data.value, JSON.stringify(value))
})

test('Select().confirm()', t => {
  var title = 'Confirm Title'
  var text = 'Confirm Text'

  var sel = Select()
    .confirm()
      .title(title)
      .text(text)
      .end()
    .json()

  t.truthy(sel)
  t.truthy(sel.confirm)
  t.is(sel.confirm.title, title)
  t.is(sel.confirm.text, text)
})

test('Select().confirm() w/ null', t => {
  var sel = Select()
    .confirm(null)

  t.truthy(sel)
  t.is(sel.data.confirm, null)
  t.falsy(sel.end())
})

test('Select().optionGrouop()', t => {
  const title = 'option title'

  const sel = Select()
    .optionGroup()
      .text(title)
      .option(opt1.text, opt1.value)
      .end()
    .json()

  t.truthy(sel)
  t.truthy(sel.option_groups[0])
  t.is(sel.option_groups[0].text, title)
  t.truthy(sel.option_groups[0].options)
  t.is(sel.option_groups[0].options[0].text, opt1.text)
  t.is(sel.option_groups[0].options[0].value, opt1.value)
})

test('Select().attachment()', t => {
  var attachment = { foo: 'bar' }
  var sel = Select()
    .attachment(attachment)

  t.truthy(sel)
  t.is(sel.end(), attachment)
})

test('Select().toJSON() ', t => {
  var sel = Select({name, text, value, options})
  t.truthy(sel)
  t.deepEqual(sel.toJSON(), sel.json())
})
