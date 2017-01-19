'use strict'

const mixinSetters = require('./mixin-setters')
const setValues = require('./set-values')

class Confirm {

  constructor (values) {
    this.data = {}

    setValues(this, values)
    // Adds scope of `this` to each setter fn for chaining `.get()`
    this.addSetterScopes()
  }

  button (button) {
    return this.action(button)
  }

  action (action) {
    this._action = action

    return this
  }

  end () {
    return this._action
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
  text: true,
  ok_text: true,
  // alias for ok_text
  ok: 'ok_text',
  dismiss_text: true,
  // alias for dismiss_text
  dismiss: 'dismiss'
}

mixinSetters(Confirm.prototype, PROPS)

// export a factory fn
module.exports = (values) => {
  return new Confirm(values)
}
