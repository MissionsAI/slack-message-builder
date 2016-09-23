'use strict'

const mixinSetters = require('./mixin-setters')
const setValues = require('./set-values')

class Confirm {

  constructor (values) {
    this.data = {}

    setValues(this, values)
  }

  button (button) {
    this._button = button

    return this
  }

  // convenience fn for ok_text
  ok (val) {
    this.data.ok_text = val

    return this
  }

  // convenience fn for dismiss_text
  dismiss (val) {
    this.data.dismiss_text = val

    return this
  }

  end () {
    return this._button
  }

  json () {
    return Object.assign({}, this.data)
  }

}

// props for Slack API - true gets a generic setter fn
const PROPS = {
  'title': true,
  'text': true,
  'ok_text': function (val) {
    return this.ok(val)
  },
  'dismiss_text': function (val) {
    return this.dismiss(val)
  }
}

mixinSetters(Confirm.prototype, PROPS)

// export a factory fn
module.exports = (values) => {
  return new Confirm(values)
}
