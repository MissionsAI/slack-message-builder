'use strict'

const mixinSetters = require('./mixin-setters')
const setValues = require('./set-values')
const Button = require('./button')
const Field = require('./field')

class Attachment {

  constructor (values) {
    if (typeof values === 'string') {
      values = { text: values }
    }
    this._message = null
    this.data = {
      text: ''
    }

    setValues(this, values)
    // Adds scope of `this` to each setter fn for chaining `.get()`
    this.addSetterScopes()
  }

  message (message) {
    this._message = message

    return this
  }

  // convenience fn for adding a single field
  field (values) {
    var field = Field(values).attachment(this)

    if (!this.data.fields) {
      this.data.fields = []
    }
    this.data.fields.push(field)

    return field
  }

  // creates Button instance, adds it to collection and returns it
  button () {
    var button = Button.apply(Button, arguments).attachment(this)

    if (!this.data.actions) {
      this.data.actions = []
    }
    this.data.actions.push(button)

    return button
  }

  // this.actions() sends here, since button feels more intuitive
  buttons (buttons) {
    if (buttons === null) {
      this.data.actions = null
      return this
    }

    this.data.actions = (buttons || []).map(action => this.action(action))

    return this
  }

  // proxy to `this.button()` for convenience since Slack API calls them actions
  action () {
    return this.button.apply(this, arguments)
  }

  end () {
    return this._message
  }

  json () {
    var attachment = Object.assign({}, this.data)

    if (this.data.actions && this.data.actions.length > 0) {
      attachment.actions = this.data.actions.map(action => action.json())
    }

    if (this.data.fields && this.data.fields.length > 0) {
      attachment.fields = this.data.fields.map(field => field.json())
    }

    return attachment
  }

}

// props for Slack API - true gets a generic setter fn
const PROPS = {
  'text': true,
  'title': true,
  'title_link': true,
  'fallback': true,
  'callback_id': true,
  'color': true,
  'pretext': true,
  'author_name': true,
  'author_link': true,
  'author_icon': true,
  'image_url': true,
  'thumb_url': true,
  'footer': true,
  'footer_icon': true,
  'mrkdwn_in': true,
  'ts': true, // epoch time
  'fields': function (fields) {
    if (fields === null) {
      this.data.fields = null
      return this
    }

    this.data.fields = (fields || []).map(field => this.field(field))

    return this
  },
  'actions': function (actions) {
    return this.buttons(actions)
  }
}

mixinSetters(Attachment.prototype, PROPS)

// export a factory fn
module.exports = (values) => {
  return new Attachment(values)
}
