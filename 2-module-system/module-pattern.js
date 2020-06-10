const dep = require('./someDep') // the require function is synchronous

// private function
function somePrivateFunc() {
  /**
   * Some functionality that does not need exposure
   */
}

// The thing that you want actually export and make public

module.exports.run = () => {
  somePrivateFunc()
}

// Named Exports pattern

// file logger.js
exports.info = (message) => {
  console.log(`INFO: ${message}`)
}

exports.verbose = message => {
  console.log(`VERBOSE: ${message}`)
}


// Substack pattern

// file logger.js
module.exports = message => {
  console.log(message)
}

module.exports.verbose = message => {
  console.log(`VERBOSE: ${message}`)
}

// usage of the pattern
const logger = require('./substacklogger')
logger('This is a message')
logger.verbose('this is a verbose message')


// Exporting a constructor 

// using vanilla 

function Logger(name) {
  this.name = name
}

Logger.prototype.log = function (message) {
  console.log(`${this.name}: ${message}`)
}

module.exports = Logger

// Same usage can be achieved by using classes

class Logger {
  constructor(name) {
    this.name = name
  }

  log(message) {
    console.log(`${this.name}: ${message}`)
  }
}

module.exports = Logger

// You can also export a instance
module.exports = new Logger('DEFAULT')