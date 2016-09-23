const camelcase = require('camelcase')

module.exports = (obj, values) => {
  // populate any properties passed into constructor
  Object.keys(values || {}).forEach(prop => {
    var val = values[prop]
    var propFn = camelcase(prop)

    if (typeof obj[propFn] === 'function') {
      obj[propFn](val)
    }
  })
}
