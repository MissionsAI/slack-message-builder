'use strict'

const mixinSetters = require('./mixin-setters')
const setValues = require('./set-values')

class Field {

  constructor (values) {
    if (typeof values === 'string') {
      values = { title: values }
    }
    this._attachment = null
    this.data = {}

    setValues(this, values)
    // Adds scope of `this` to each setter fn for chaining `.get()`
    this.addSetterScopes()
  }

  attachment (attachment) {
    this._attachment = attachment

    return this
  }

  end () {
    return this._attachment
  }

  json () {
    return Object.assign({}, this.data)
  }

  toJSON () {
    return this.json()
  }
}

// props for Slack API - true gets a generic setter fn
const PROPS = {
  title: true,
  value: true,
  short: true
}

mixinSetters(Field.prototype, PROPS)

// export a factory fn
module.exports = (values) => {
  return new Field(values)
}
