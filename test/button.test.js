'use strict'

const test = require('ava').test
const Button = require('../src/button')

const name = 'button_name'
const text = 'Button Text'
const value = 'button value'
const style = 'primary'
const url = 'http://url'

test('Button()', t => {
  var btn = Button()

  t.is(btn.data.name, undefined)
  t.is(btn.data.text, undefined)
  t.is(btn.data.value, undefined)
  t.is(btn.data.url, undefined)
  t.is(btn.data.type, 'button')
})

test('Button(name, text)', t => {
  var btn = Button(name, text)

  t.is(btn.data.name, name)
  t.is(btn.data.text, text)
  t.is(btn.data.value, undefined)
  t.is(btn.data.type, 'button')
})

test('Button(name, text).val(value)', t => {
  var btn = Button(name, text).val(value)

  t.is(btn.data.name, name)
  t.is(btn.data.text, text)
  t.is(btn.data.value, value)
  t.is(btn.data.type, 'button')
})

test('Button({name, text, value, style})', t => {
  var btn = Button({name, text, value, style})

  t.is(btn.data.name, name)
  t.is(btn.data.text, text)
  t.is(btn.data.value, value)
  t.is(btn.data.style, style)
  t.is(btn.data.type, 'button')
})

test('Button({text, url})', t => {
  var btn = Button({ name, text, url })

  t.is(btn.data.text, text)
  t.is(btn.data.url, url)
  t.is(btn.data.type, 'button')
})

test('Button() chaining settings', t => {
  var btn = Button()
    .name(name)
    .text(text)
    .style(style)
    .value(value)

  t.is(btn.data.name, name)
  t.is(btn.data.text, text)
  t.is(btn.data.value, value)
  t.is(btn.data.style, style)
  t.is(btn.data.type, 'button')
})

test('Button() encoding value', t => {
  var value = { foo: 'bar' }
  var btn = Button().value(value)

  t.is(btn.data.value, JSON.stringify(value))
})

test('Button().confirm()', t => {
  var title = 'Confirm Title'
  var text = 'Confirm Text'

  var btn = Button()
    .confirm()
      .title(title)
      .text(text)
      .end()
    .json()

  t.truthy(btn)
  t.truthy(btn.confirm)
  t.is(btn.confirm.title, title)
  t.is(btn.confirm.text, text)
})

test('Button().confirm() w/ null', t => {
  var btn = Button()
    .confirm(null)

  t.truthy(btn)
  t.is(btn.data.confirm, null)
  t.falsy(btn.end())
})
