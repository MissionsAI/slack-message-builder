'use strict'

const test = require('ava').test
const Confirm = require('../src/confirm')

const title = 'confirm_title'
const text = 'Button Text'

test('Confirm().toJSON() ', t => {
  var cfm = Confirm({ title, text })
  t.truthy(cfm)
  t.deepEqual(cfm.toJSON(), cfm.json())
})
