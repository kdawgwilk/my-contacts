const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../models/user')
const gmail = require('../config/gmail')

router.get('/login', function (req, res) {
    if (req.user) {
        res.redirect('/')
    } else {
        res.render('login')
    }
})

router.post('/login', passport.authenticate('local'), function(req, res) {
    if (req.user) {
        res.redirect('/')
    } else {
        res.render('login', { message: 'Incorrect username or password!' })
    }
})

router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/login')
})

router.get('/signup', function (req, res) {
    if (req.user) {
        res.redirect('/')
    } else {
        res.render('signup')
    }
})

router.post('/signup', function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.render('signup', { message: err })
        }

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Kaden Wilkinson 👻" <no-reply@kadenwilkinson.com>', // sender address
            to: user.username, // list of receivers
            subject: 'Welcome to our Contacts App', // Subject line
            text: 'Hello world ?', // plain text body
            html: '<b>Hello world ?</b>' // html body
        }

        // send mail with defined transport object
        gmail.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            }
            console.log('Message %s sent: %s', info.messageId, info.response)
        })

        passport.authenticate('local')(req, res, function () {
            res.redirect('/')
        })
    })
})

module.exports = router