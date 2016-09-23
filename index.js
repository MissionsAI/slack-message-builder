'use strict'

const Message = require('./src/message')

// creates a new slack message
module.exports = (msg) => {
  var message = new Message(msg)

  return message
}
