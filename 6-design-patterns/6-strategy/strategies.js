// Strategies
module.exports.json = {
  deserialize: data => JSON.parse(data),
  serialize: data => JSON.stringify(data, null, ' ')
}
const ini = require('ini')
module.exports.ini = {
  deserialize: data => ini.parse(data),
  serialize: data => ini.stringify(data)
}