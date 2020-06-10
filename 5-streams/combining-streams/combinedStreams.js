const zlib = require('zlib')
const crypto = require('crypto')
const combine = require('multipipe')

// Combining streams, that means make two or more pipes behave as one

module.exports.compressAndEncrypt = password => {
  return combine(
    zlib.createGzip(),
    crypto.createCipher('aes-192-gcm', password)
  )
}

module.exports.decryptAndDecompress = password => {
  return (
    crypto.createDecipher('aes-192-gcm', password),
    zlib.createGunzip()
  )
}