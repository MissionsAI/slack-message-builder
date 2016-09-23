'use strict'

const camelcase = require('camelcase')

module.exports = (receiver, props) => {
  // Add setter fns for each property (camelcased fn names)
  Object.keys(props).forEach(prop => {
    var propVal = props[prop]
    var fnName = camelcase(prop)

    // Add generic setter fn
    if (propVal === true) {
      receiver[fnName] = function (val) {
        this.data[prop] = val

        return this
      }
    }

    // Add custom setter fn
    if (typeof propVal === 'function') {
      receiver[camelcase(prop)] = propVal
    }
  })
}
