// Factory Pattern - separates the object creation from its implementation
// that means we can create instances of an object without having to alter its constructor or implementation

// Example here is a profiler that counts the initial time and end time

class Profiler {
  constructor(label) {
    this.label = label
    this.lastTime = null
  }

  start() {
    this.lastTime = process.hrtime()
  }

  end() {
    const diff = process.hrtime(this.lastTime)
    console.log(`Timer "${this.label}" took ${diff[0]} second and ${diff[1]} nanoseconds.`)
  }
}

// Our factory
module.exports = function(label) {
  if(process.env.NODE_ENV === 'development') {
    return new Profiler(label)
  } else if (process.env.NODE_ENV === 'production') {
    return {
      // this is called duck typing where we pass a 'empty' object
      start: function() {},
      end: function() {}
    } 
  } else {
    throw new Error('Must set NODE_ENV')
  }
}

// Usage example 
const profiler = require('./profiler')
function getRandomArray(len) {
  const p = profiler(`Generating a ${len} items long array`)
  p.start()
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Math.random());
  }
  p.end()
}

getRandomArray(1e6) 
console.log('Done')