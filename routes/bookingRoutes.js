const express = require('express');
const router = express.Router();

// MODEL BOOKING
const Booking = require('../models/Booking');

// =======================
// HOME
// =======================

router.get('/home', async (req, res) => {

    try {

        res.render('home');

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

});

// =======================
// SERVICES
// =======================

router.get('/services', (req, res) => {
    res.render('services');
});

// =======================
// TESTIMONIAL
// =======================

router.get('/testimonial', (req, res) => {
    res.render('testimonial');
});

// =======================
// PAYMENT
// =======================

router.get('/payment', (req, res) => {
    res.render('payment');
});

// =======================
// DASHBOARD
// =======================

router.get('/dashboard', (req, res) => {
    res.send('Dashboard Admin');
});

// =======================
// EXPORT
// =======================

module.exports = router;