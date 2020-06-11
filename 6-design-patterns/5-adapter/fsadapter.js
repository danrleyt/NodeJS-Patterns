// The Adapter pattern allow us to access a functionality of an object through a different interface

// In this example we will make sure that each call to readFile() or writeFile() from the fs module 
// is converted to a db.get or db.put

const path = require('path')
module.exports = function createFsAdapter(db) {
  const fs = {}

  fs.readFile = (filename, options, callback) => {
    if(typeof options === 'function'){
      callback = options
      options = {}
    } else if (typeof options === 'string') {
      options = {encoding: options}
    }

    db.get(path.resolve(filename), {
      valueEncoding: options.encoding
    }, 
    (err, value) => {
      if(err){
        if(err.type === 'NotFoundError') {
          err = new Error(`ENOENT, open "${filename}"`)
          err.code = `ENOENT`
          err.errno = 34
          err.path = filename
        }
        return callback && callback(err)
      }
      callback && callback(null, value)
    })
  }
  
  fs.writeFile = (filename, contents, options, callback) => {
    if(typeof options === 'function') {
      callback = options
      options = {}
    } else if (options === 'string') {
      options = {encoding: options}
    }

    db.put(path.resolve(filename), contents, {
      valueEncoding: options.encoding
    }, callback)
  }

  return fs
}

// Usage
const level = require('level')
const db = require('./fsDB', {valueEncoding: 'binary'})
const fs = createFsAdapter()
// fs.readFile()
