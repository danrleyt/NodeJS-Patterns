const createFailsafeSocket = require('./failsafeSocket')
const failsafeSocket = createFailsafeSocket({port: 5000})

setInterval(() => {
  failsafeSocket.send(process.memoryUsage())
}, 1000);
