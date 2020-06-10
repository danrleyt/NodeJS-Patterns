const net = require('net')
const fs = require('fs')
// Demultiplex that means, from one source, divide it to transmit data to different channels or streams.

function demultiplexChannel(source, destinations) {
  let currentChannel = null
  let currentLength = null
  source
    .on('readable', () => {
      let chunk
      if(currentChannel === null) {
        chunk = source.read(1)
        currentChannel = chunk && chunk.readUInt8(0)
      }

      if(currentLength === null) {
        chunk = source.read(4)
        currentLength = chunk && chunk.readUInt32BE(0)
        if(currentLength === null) {
          return;
        }
      }

      chunk = source.read(currentLength)
      if(chunk === null) {
        return;
      }
      console.log('Received packet from: ' + currentChannel);
      destinations[currentChannel].write(chunk)
      currentChannel = null;
      currentLength = null;
      
    })
    .on('end', () => {
      destinations.forEach(dest => dest.end());
      console.log('Source channel closed'); 
    })
}

net.createServer(socket => {
  const stdoutStream = fs.createWriteStream('stdout.log')
  const stderrStream = fs.createWriteStream('stderr.log')
  demultiplexChannel(socket, [stdoutStream, stderrStream])
}).listen(3000, () => console.log('Server started'))