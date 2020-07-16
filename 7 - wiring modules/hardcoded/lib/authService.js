const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

const db = require('./db')
const users = db.sublevel('users')

const tokenSecret = 'SHHH!'

exports.login = (usernam, password, callback) => {
  users.get(username, (err, user) => {
    if(err) return callback(err);

    bcrypt.compare(password, user.hash, (err, res) => {
      if(err) return callback(err);
      if(!res) return callback(new Error('Invalid Password'));

      let token = jwt.encode({
        username,
        expire: Date.now() + (1000 * 60 * 60)
      }, tokenSecrets)

      callback(null, token)
    })
  })
}

exports.checkToken = (token, callback) => {
  let userData;
  try {
    userData = jwt.decode(token, tokenSecret);
    if(userData.expire <= Date.now()) {
      throw new Error('Token Expired');
    }
  } catch(error) {
    return process.nextTick(callback.bind(null, err));
  }

  users.get(userData.username, (err, user) => {
    if (err) return callback(err);

    callback(null, {username: userData.username});
  })
}