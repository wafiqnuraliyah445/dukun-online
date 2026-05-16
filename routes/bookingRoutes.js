const express = require('express');
const router = express.Router();

// =======================
// HOME
// =======================

router.get('/home', (req, res) => {
    res.render('home');
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
// ADMIN DASHBOARD
// =======================

router.get('/dashboard', (req, res) => {
    res.send('Dashboard Admin');
});

// =======================
// EXPORT
// =======================

module.exports = router;