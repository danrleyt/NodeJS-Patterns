// Revealing constructor pattern - is pattern that accepts a function as parameter in the constructor 
// and this function (called executor function) is called by the constructor allowing it to manipulate only 
// a limited part of the internal state of the object under construction. the most popular example is the 
// Promise object

// As an example we will create a read only event-emitter using this pattern
// that means a special event-emitter that is not possible to call emit 

const EventEmitter = require('events')
module.exports = class Roee extends EventEmitter {
  constructor(executor) {
    super()
    const emit = this.emit.bind(this) // make a backup of the emit method
    this.emit = undefined // remove it from the class, so it is not possible to call it anymore 
    executor(emit) // pass our back of the emit to executor, only place where the emit will be available
  }
}

// usage example
const Roee = require('./roee')

const ticker = new Roee((emit) => {
  let tickCount = 0;
  setInterval(() => emit('tick', tickCount++), 1000)
})

ticker.on('tick', (tickCount) => console.log(tickCount, 'TICK'))
// ticker.emit('something', {}) <- this fails