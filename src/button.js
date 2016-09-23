'use strict'

const mixinSetters = require('./mixin-setters')
const setValues = require('./set-values')
const Confirm = require('./confirm')

class Button {

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
    this._confirm = null
    this.data = {
      type: 'button'
    }

    setValues(this, values)
  }

  attachment (attachment) {
    this._attachment = attachment

    return this
  }

  val (val) {
    if (val !== null && val !== undefined && typeof val === 'object') {
      val = JSON.stringify(val)
    }

    this.data.value = val

    return this
  }

  end () {
    return this._attachment
  }

  json () {
    var button = Object.assign({}, this.data)

    if (this._confirm) {
      button.confirm = this._confirm.json()
    }

    return button
  }
}

// props for Slack API - true gets a generic setter fn
const PROPS = {
  'name': true,
  'text': true,
  'style': true,
  'type': true,
  'value': function (val) {
    return this.val(val)
  },
  'confirm': function (confirm) {
    if (confirm === null) {
      this._confirm = null
      return this
    }

    this._confirm = Confirm(confirm).button(this)

    return this._confirm
  }
}

mixinSetters(Button.prototype, PROPS)

// export a factory fn
module.exports = (name, text) => {
  return new Button(name, text)
}
