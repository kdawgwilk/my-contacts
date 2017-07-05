const express = require('express')
const router = express.Router()

const Contact = require('../models/contact')

// Index
router.get('/contacts', function (req, res) {
    Contact.find(function (err, contacts) {
        if (err) {
            res.json(err)
        } else {
            res.json(contacts)
        }
    })
})

// Show
router.get('/contacts/:id', function (req, res) {
    Contact.findById(req.params.id, function (err, contact) {
        if (err) {
            res.json(err)
        } else {
            res.json(contact)
        }
    })
})

// Create
router.post('/contacts', function (req, res) {
    const contact = new Contact(req.body)

    contact.save(function (err) {
        if (err) {
            res.json(err)
        } else {
            res.status(201)
            res.json(contact)
        }
    })
})

// Update
router.put('/contacts/:id', function (req, res) {
    Contact.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        favorite: req.body.favorite
    }, { new: true, runValidators: true }, function (err, contact) {
        if (err) {
            res.json(err)
        } else {
            res.json(contact)
        }
    })
})

// Destroy
router.delete('/contacts/:id', function (req, res) {
    Contact.findByIdAndRemove(req.params.id, function (err, contact) {
        if (err) {
            res.json(err)
        } else {
            res.json(contact)
        }
    })
})


module.exports = router