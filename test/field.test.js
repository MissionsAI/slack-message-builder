'use strict'

const test = require('ava').test
const Field = require('../src/field')
const value = 'a value'

test('Field() constructor w/ string ', t => {
  var cfm = Field(value)
  t.truthy(cfm)
  t.deepEqual(cfm.data.title, value)
})
