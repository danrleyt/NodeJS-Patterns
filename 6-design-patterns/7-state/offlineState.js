const jot = require('json-over-tcp')

module.exports = class OfflineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket
  }

  send(data) {
    this.failsafeSocket.queue.push(data)
  }

  activate() {
    const retry = () => {
      setTimeout(() => this.activate(), 500)
    }

    this.failsafeSocket.socket = jot.connect(
      this.failsafeSocket.options, 
      () => {
        this.failsafeSocket.socket.removeListener('error', retry)
        this.failsafeSocket.changeState('online')
      }
    )
    this.failsafeSocket.socket.once('error', retry)
  }
}