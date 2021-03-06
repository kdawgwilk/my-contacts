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
const Contact       = require('./models/contact')

const gmail         = require('./config/gmail')

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
    if (req.user) {
        Contact.find({ userId: req.user._id }, function (err, contacts) {
            if (err) {
                res.send(err)
            } else {
                const selectedId = req.query.selectedId
                if (selectedId) {
                    Contact.findById(selectedId, (err, contact) => {
                        var selectedContact
                        if (contact.userId.equals(req.user._id)) {
                            selectedContact = contact
                        }
                        res.render('index', {
                            user: req.user,
                            contacts: contacts,
                            selectedContact: selectedContact
                        })
                    })
                } else {
                    res.render('index', { 
                        user: req.user,
                        contacts: contacts
                    })
                }
                        
            }
        })
    } else {
        res.redirect('/login')
    }
})


// Start the server
app.listen(3000, function () {
    console.log('Listening on PORT 3000')
})