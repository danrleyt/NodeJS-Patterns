// this example uses a proxy pattern

function createLoggingWritable(writableOrig) {
  const proto = Object.getPrototypeOf(writableOrig)

  function LoggingWritable(writableOrig) {
    this.writableOrig = writableOrig
  }

  LoggingWritable.prototype = Object.create(proto)

  // write is the proxied method
  LoggingWritable.prototype.write = function (chunk, encoding, callback) {
    if(!callback && typeof encoding === 'function') {
      callback = encoding
      encoding = undefined
    }
    console.log(`Writing ${chunk}`)
    return this.writableOrig.write(chunk, encoding, function() {
      console.log(`Finished writing ${chunk}`)
      callback && callback()
    })
  }

  LoggingWritable.prototype.on = function () {
    return this.writableOrig.on.apply(this.writableOrig, arguments)
  }

  LoggingWritable.prototype.end = function () {
    return this.writableOrig.end.apply(this.writableOrig, arguments)
  }

  return new LoggingWritable(writableOrig)
}

// usage
const fs = require('fs')

const writable = fs.createWriteStream('test.txt')
const writableProxy = createLoggingWritable(writable)

writableProxy.write('First CHUNK')
writableProxy.write('SECOND CHUNK')
writable.write('THIS IS NOT LOGGED')
writableProxy.end()

// Using the Proxy object

const person = {
  name: 'Alex',
  surname: 'Kidd'
}

const upperPerson = new Proxy(person, {
  get: (target, property) => target[property].toUpperCase()
})

console.log(upperPerson.name, upperPerson.surname)

// another example using array 

const evenNumbers = new Proxy([], {
  get: (target, index) => index * 2,
  has: (target, number) => number % 2 === 0 
})

console.log(2 in evenNumbers); // true
console.log(evenNumbers[7]); // 14

