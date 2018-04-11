'use strict'

const mixinSetters = require('./mixin-setters')
const setValues = require('./set-values')
const Confirm = require('./confirm')
const OptionGroup = require('./option-group')

class Select {

  constructor (name, text) {
    var values = {}
    if (typeof name === 'object') {
      values = name
    } else {
      if (typeof name === 'string') {
        values.name = name
      }
      if (typeof text === 'string') {
        values.text = text
      }
    }

    this._attachment = null
    this.data = {
      type: 'select'
    }

    setValues(this, values)
    // Adds scope of `this` to each setter fn for chaining `.get()`
    this.addSetterScopes()
  }

  attachment (attachment) {
    this._attachment = attachment

    return this
  }

  optionGroup () {
    const optionGroup = OptionGroup.apply(OptionGroup, arguments).select(this)

    if (!this.data.option_groups) {
      this.data.option_groups = []
    }
    this.data.option_groups.push(optionGroup)

    return optionGroup
  }

  end () {
    return this._attachment
  }

  json () {
    var select = Object.assign({}, this.data)

    if (this.data.confirm) {
      select.confirm = this.data.confirm.json()
    }

    if (this.data.option_groups && this.data.option_groups.length > 0) {
      select.option_groups = this.data.option_groups.map(optionGroup => optionGroup.json())
    }

    return select
  }

  toJSON () {
    return this.json()
  }
}

// props for Slack API - true gets a generic setter fn
const PROPS = {
  name: true,
  text: true,
  type: true,
  data_source: true,
  min_query_length: true,
  options: true,
  selected_options: true,
  value: function (val) {
    if (val !== null && val !== undefined && typeof val === 'object') {
      val = JSON.stringify(val)
    }

    this.data.value = val

    return this
  },
  // alias for value
  val: 'value',
  confirm: function (confirm) {
    if (confirm === null) {
      this.data.confirm = null
      return this
    }

    this.data.confirm = Confirm(confirm).action(this)

    return this.data.confirm
  },
  selectedOption: function (text, value) {
    if (value !== null && value !== undefined && typeof value === 'object') {
      value = JSON.stringify(value)
    }
    let option = { text, value }
    if (!Array.isArray(this.data.selected_options)) {
      this.data.selected_options = []
    }
    this.data.selected_options.push(option)
    return this
  },
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

mixinSetters(Select.prototype, PROPS)

// export a factory fn
module.exports = (name, text) => {
  return new Select(name, text)
}

// msg.attachment()
//   .callbackId('callback_id')
//   .text('pic some stuff')
//   .select('name1', 'Select a channel')
//     .dataSource('channels')
//     .end()
//   .select('name2', 'Select a person')
//     .dataSource('users')
//     .end()
//   .select('name3', 'Select from list of static options')
//     .option('Opt 1', 'option 1 value')
//     .option('Opt 2', 'option 2 value')
//     .option('Opt 3', 'option 3 value', 'option 3 description')
//     .option('Opt 4', 'option 4 value', '', true)
//     .end()
//   .select('name 3', 'Select from dynamic')
//     .dataSource('external')
//     .end()
