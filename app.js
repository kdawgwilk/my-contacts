const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')
const mongoose      = require('mongoose')
const handlebars    = require('express-handlebars')
const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy
const cookieParser  = require('cookie-parser')
const session       = require('express-session')

const contacts      = require('./routes/contacts')
const auth          = require('./routes/auth')

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
app.use(cookieParser())
app.use(session({ secret: 'mysupersecretsessionkey' }))
app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Logging Middleware
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.path)
    next()
})

app.use(contacts)
app.use(auth)

app.get('/', function (req, res) {
    res.json('IT WORKS!')
})


// Start the server
app.listen(3000, function () {
    console.log('Listening on PORT 3000')
})