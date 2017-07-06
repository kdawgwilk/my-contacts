const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')
const handlebars = require('express-handlebars')


const contacts = require('./routes/contacts')

// connect to your local DB
// mongod
mongoose.connect('mongodb://localhost/MyContacts', {
    useMongoClient: true
})
// connect to DJ's DB
// mongoose.connect('mongodb://mongodb.cs.dixie.edu/YourName')

app.engine('.hbs', handlebars({ defaultLayout: 'single', extname: '.hbs' }))
app.set('view engine', '.hbs')


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

app.get('/login', function (req, res) {
    res.render('login')
})

app.post('/login', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.render('login', {
            message: 'Both fields are required'
        })
    } else {
        res.send('Logging in...')
    }
})


// Start the server
app.listen(3000, function () {
    console.log('Listening on PORT 3000')
})