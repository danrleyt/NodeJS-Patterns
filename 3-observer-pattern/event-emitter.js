// a object that searches a pattern in a file and uses eventemitter to emit states
// big diff between emit and callbacks, callbacks is when results and values must be propagated
// events is when something happened and needs to be communicated
const EventEmitter = require('events').EventEmitter
const fs = require('fs')

class FindPattern extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile(file) {
    this.files.push(file)
    return this;
  }

  find() {
    this.files.forEach(file => {
      fs.readFile(file, 'utf8', (err, content) => {
        if(err) {
          return this.emit('error', err);
        }

        this.emit('fileread', file)
        let match = null
        if (match = content.match(this.regex)) {
          match.forEach(elem => this.emit('found', file, elem))
        }
      })
    })
    return this;
  }
}

// usage 
const findPatternObj = new FindPattern(/hello \w+/g)
findPatternObj
  .addFile('fileA.txt')
  .addFile('fileB.txt')
  .find()
  .on('found', (file, match) => console.log(`FOUND ${match} in ${file}`))
  .on('error', (err) => console.error(err))