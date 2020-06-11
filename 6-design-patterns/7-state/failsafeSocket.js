// The state pattern allows an object to behave different depending or its internal state

const OfflineState = require('./offlineState')
const OnlineState = require('./onlineState')

class FailsafeSocket {
  constructor(options) {
    this.options = options
    this.queue = []
    this.currentState = null
    this.socket = null
    this.states = {
      offline: new OfflineState(this),
      online: new OnlineState(this)
    }
    this.changeState('offline')
  }

  changeState(state) {
    console.log(`Activating state: ${state}`)
    this.currentState = this.states[state]
    this.currentState.activate()
  }

  send(data) {
    this.currentState.send(data)
  }
}

module.exports = options => {
  return new FailsafeSocket(options)
}