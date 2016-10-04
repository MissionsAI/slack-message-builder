'use strict'

const camelcase = require('camelcase')

module.exports = (receiver, props) => {
  // Add setter fns for each property (camelcased fn names)
  Object.keys(props).forEach(prop => {
    var setterFn = null
    var propVal = props[prop]
    var fnName = camelcase(prop)

    // generic setter fn
    if (propVal === true) {
      setterFn = function (val) {
        this.data[prop] = val

        return this
      }
    }

    // alias setter fn
    if (typeof propVal === 'string') {
      prop = propVal
      setterFn = function () {
        return this[propVal].apply(this, arguments)
      }
    }

    // custom setter fn
    if (typeof propVal === 'function') {
      setterFn = propVal
    }

    if (setterFn) {
      receiver[fnName] = setterFn

      // Add a .get(idx) function to setter to return value and optionally index in array
      setterFn.get = function (idx) {
        var scope = this.scope
        if (!scope) {
          return null
        }

        var val = scope.data[prop]

        // return indexed value
        if (idx !== undefined && Array.isArray(val)) {
          if (idx < 0) {
            idx = val.length + idx
          }
          return val[idx]
        }

        return val
      }
    }
  })

  // stores a `scope` property on each setter to use for chaining fns like `.get()`
  receiver.addSetterScopes = function () {
    Object.keys(props).forEach(prop => {
      var fnName = camelcase(prop)

      if (typeof this[fnName] === 'function') {
        this[fnName].scope = this
      }
    })
  }
}
