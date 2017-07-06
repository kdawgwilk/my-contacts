const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../models/user')

router.get('/login', function (req, res) {
    res.render('login')
})

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/')
})

router.get('/signup', function (req, res) {
    res.render('signup')
})

router.post('/signup', function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.render('signup', { message: err })
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/')
        });
    });
})

module.exports = router