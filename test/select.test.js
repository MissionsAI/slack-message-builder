'use strict'

const test = require('ava').test
const Select = require('../src/select')

const name = 'select_name'
const text = 'Select Text'
const value = 'select value'
const dataSource = 'datasource'
const opt1 = { text: 'text1', value: 'value1' }
const opt2 = { text: 'text2', value: 'value2', description: 'description2', selected: true }
const opt3 = { text: 'text3', value: 'value3', description: '', selected: false }
var options = [ opt1, opt2, opt3 ]

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

test('Select({name, text, value, style, dataSource})', t => {
  var sel = Select({name, text, value, options, dataSource})

  t.is(sel.data.name, name)
  t.is(sel.data.text, text)
  t.is(sel.data.value, value)
  t.is(sel.data.options, options)
  t.is(sel.data.data_source, dataSource)
  t.is(sel.data.type, 'select')
})

test('Select() chaining settings', t => {
  var sel = Select()
    .name(name)
    .text(text)
    .value(value)
    .options(options)
    .dataSource(dataSource)

  t.is(sel.data.name, name)
  t.is(sel.data.text, text)
  t.is(sel.data.value, value)
  t.is(sel.data.options, options)
  t.is(sel.data.data_source, dataSource)
  t.is(sel.data.type, 'select')
})

test('Select() chaining each option', t => {
  var sel = Select(name, text)
    .value(value)
    .option(opt1.text, opt1.value)
    .option(opt2.text, opt2.value, opt2.description, opt2.selected)
    .option(opt3.text, opt3.value, opt3.description, opt3.selected)

  t.is(sel.data.name, name)
  t.is(sel.data.text, text)
  t.is(sel.data.value, value)
  t.deepEqual(sel.data.options, options)
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
