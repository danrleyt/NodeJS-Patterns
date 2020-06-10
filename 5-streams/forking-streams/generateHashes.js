const fs = require('fs')
const crypto = require('crypto')

// Forking streams, that is from the same source create streams to two different channels

const sha1Stream = crypto.createHash('sha1')
sha1Stream.setEncoding('base64')

const md5Stream = crypto.createHash('md5')
md5Stream.setEncoding("base64")

const inputFile = process.argv[2]
const inputStream = fs.createReadStream(inputFile)
inputStream
  .pipe(sha1Stream)
  .pipe(fs.createWriteStream(inputFile+'.sha1'))
inputStream
  .pipe(md5Stream)
  .pipe(fs.createWriteStream(inputFile+'.md5'))