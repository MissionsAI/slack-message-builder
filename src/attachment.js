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
    this._actions = []
    this._fields = []
    this.data = {
      text: ''
    }

    setValues(this, values)
  }

  message (message) {
    this._message = message

    return this
  }

  // convenience fn for adding a single field
  field (values) {
    var field = Field(values).attachment(this)

    this._fields.push(field)

    return field
  }

  // creates Button instance, adds it to collection and returns it
  button () {
    var button = Button.apply(Button, arguments).attachment(this)

    this._actions.push(button)

    return button
  }

  // this.actions() sends here, since button feels more intuitive
  buttons (buttons) {
    if (buttons === null) {
      this._actions = null
      return this
    }

    this._actions = (buttons || []).map(action => this.action(action))

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

    if (this._actions.length > 0) {
      attachment.actions = this._actions.map(action => action.json())
    }

    if (this._fields.length > 0) {
      attachment.fields = this._fields.map(field => field.json())
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
      this._fields = null
      return this
    }

    this._fields = (fields || []).map(field => this.field(field))

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
