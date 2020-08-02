const Express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('errorHandler')
const http = require('http')

const diContainer = require('./lib/diContainer')

diContainer.register('dbName', 'example-db')
diContainer.register('tokenSecret', 'SHHH!')
diContainer.factory('db', require('./lib/db'))
diContainer.factory('authService', require('./lib/authService'))
diContainer.factory('authController', require('./lib/authController'))

const authController = diContainer.get('authController')

let app = module.exports = new Express();
app.use(bodyParser.json())

app.post('/login', authController.login)
app.get('/checkToken', authController.checkToken)

app.use(errorHandler())
http.createServer(app).listen(3000, () => {
  console.log('Express server started');
})