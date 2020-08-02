const Express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('errorHandler')
const http = require('http')

const dbFactory = require('./lib/db')
const authServiceFactory = require('./lib/authService')
const authControllerFactory = require('./lib/authController')

const db = dbFactory('example-db')
const authService = authServiceFactory(db, 'SHHHH!')
const authController = authControllerFactory(authService)


let app = module.exports = new Express();
app.use(bodyParser.json())

app.post('/login', authController.login)
app.get('/checkToken', authController.checkToken)

app.use(errorHandler())
http.createServer(app).listen(3000, () => {
  console.log('Express server started');
})