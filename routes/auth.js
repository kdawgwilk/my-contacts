const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../models/user')

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

        passport.authenticate('local')(req, res, function () {
            res.redirect('/')
        })
    })
})

module.exports = router