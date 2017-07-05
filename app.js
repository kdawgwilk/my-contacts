const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const contacts = require('./routes/contacts')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Logging Middleware
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.path)
    next()
})

app.use(contacts)

app.get('/', function (req, res) {
    res.json('IT WORKS!')
})


// Start the server
app.listen(3000, function () {
    console.log('Listening on PORT 3000')
})