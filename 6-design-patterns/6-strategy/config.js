const fs = require('fs')
const objectPath = require('object-path')

class Config {
  constructor(strategy) {
    this.data = {}
    this.strategy = strategy
  }

  get(path) {
    return objectPath.get(this.data, path)
  }

  set(path, value) {
    return objectPath.set(this.data, path, value)
  }

  read(file) {
    console.log(`Deserializing from ${file}`)
    this.data = this.strategy.deserialize(fs.readFileSync(file, 'utf-8'))
  }

  save(file) {
    console.log(`Serializing to ${file}`)
    fs.writeFileSync(file, this.strategy.serialize(this.data))
  }
}

module.exports = Config



// Strategy pattern comes in handy when you need that an Object (context) behaves differently based 
// on inputs, conditions, configurations

// configTest
// const Config = require('./Config')
const strategies = require('./strategies')
// Same object 'Config' supports different formats
const jsonConfig = new Config(strategies.json)
jsonConfig.read('samples/conf.json')
jsonConfig.set('book.nodejs', 'design patterns')
jsonConfig.save('samples/conf_mod.json')

const iniConfig = new Config(strategies.ini)
iniConfig.read('samples/conf.ini')
iniConfig.set('book.nodejs', 'design patterns')
iniConfig.save('samples/conf_mod.ini')