const express = require('express');
const router = express.Router();

// MODEL BOOKING
const Booking = require('../models/Booking');

// =======================
// HOME
// =======================

router.get('/home', async (req, res) => {

    try {

        const bookings = await Booking.find();

        res.render('home', {
            bookings
        });

    } catch (err) {

        console.log(err);

        res.send('Error ambil data booking');

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