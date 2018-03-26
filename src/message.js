'use strict'

const mixinSetters = require('./mixin-setters')
const setValues = require('./set-values')
const Attachment = require('./attachment')

const Message = module.exports = class {

  constructor (text) {
    var values = {}
    if (typeof text === 'object') {
      values = text
    } else if (typeof text === 'string') {
      values.text = text
    }

    this.data = {}

    // populate any properties passed into constructor
    setValues(this, values, PROPS)
    // Adds scope of `this` to each setter fn for chaining `.get()`
    this.addSetterScopes()
  }

  // should create an Attachment object and add it to the collection
  attachment (values) {
    var attachment = Attachment(values).message(this)

    if (!this.data.attachments) {
      this.data.attachments = []
    }
    this.data.attachments.push(attachment)

    return attachment
  }

  // convert Message into an object the slack api can consume
  json () {
    var message = Object.assign({}, this.data)

    if (this.data.attachments && this.data.attachments.length > 0) {
      message.attachments = this.data.attachments.map(attachment => attachment.json())
    }
    return message
  }

  toJSON () {
    return this.json()
  }

}

// props for Slack API - true gets a generic setter fn
const PROPS = {
  text: true,
  response_type: true,
  replace_original: true,
  delete_original: true,
  token: true,
  channel: true,
  user: true,
  parse: true,
  link_names: true,
  unfurl_links: true,
  unfurl_media: true,
  as_user: true,
  icon_url: true,
  ts: true,
  thread_ts: true,
  reply_broadcast: true,
  attachments: function (attachments) {
    if (attachments === null) {
      this.data.attachments = null
      return this
    }

    // TODO: remove reassignment here, just wipe then set
    this.data.attachments = (attachments || []).map(attachment => {
      return this.attachment(attachment)
    })

    return this
  },
  // bot's username for msg - as_user must be false, or ignored
  username: function (val) {
    this.data.username = val
    this.data.as_user = false

    return this
  },
  // as_user must be false, or ignored
  iconEmoji: function (val) {
    this.data.icon_emoji = val
    this.data.as_user = false

    return this
  }
}

mixinSetters(Message.prototype, PROPS)
