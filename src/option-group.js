'use strict'

const mixinSetters = require('./mixin-setters')
const setValues = require('./set-values')

class OptionGroup {

  constructor (text) {
    let values = {}
    if (typeof text === 'object') {
      values = text
    } else if (typeof text === 'string') {
      values.text = text
    }

    this._select = null
    this.data = {}

    setValues(this, values)
    // Adds scope of `this` to each setter fn for chaining `.get()`
    this.addSetterScopes()
  }

  select (select) {
    this._select = select

    return this
  }

  end () {
    return this._select
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
  text: true,
  options: true,
  option: function (text, value, description) {
    if (value !== null && value !== undefined && typeof value === 'object') {
      value = JSON.stringify(value)
    }
    let option = { text, value }
    if (description !== undefined) option.description = description
    if (!Array.isArray(this.data.options)) {
      this.data.options = []
    }
    this.data.options.push(option)
    return this
  }
}

mixinSetters(OptionGroup.prototype, PROPS)

// export a factory fn
module.exports = (text) => {
  return new OptionGroup(text)
}

// msg.attachment()
//   .callbackId('callback_id')
//   .text('pic some stuff')
//   .select()
//   .optionGroup()
//     .text('option header')
//     .option('Opt 1', 'option 1 value')
//     .option('Opt 2', 'option 2 value')
//     .option('Opt 3', 'option 3 value', 'option 3 description')
//     .option('Opt 4', 'option 4 value', '', true)
//     .end()
//   .end()
