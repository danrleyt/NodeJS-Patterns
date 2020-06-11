const JsonConfig = require('./jsonConfig')

const jsonConfig = new JsonConfig()
jsonConfig.read('samples/conf.json')
jsonConfig.set(`nodejs`, `design patterns`)
jsonConfig.save(`samples/config_mod.json`)