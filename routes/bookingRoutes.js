const express = require('express');
const router = express.Router();

// =======================
// IMPORT MODEL
// =======================

const Booking = require('../models/Booking');
const Testimonial = require('../models/Testimonial');
const Payment = require('../models/Payment');

// =======================
// MIDDLEWARE LOGIN ADMIN
// =======================

function isLogin(req, res, next) {

    if (req.session.user) {

        next();

    } else {

        res.redirect('/admin/login');

    }

}

// =======================
// ROOT
// =======================

router.get('/', (req, res) => {

    res.redirect('/home');

});

// =======================
// HOME
// =======================

router.get('/home', (req, res) => {

    try {

        res.render('home');

    } catch (err) {

        console.log(err);

        res.send('Gagal membuka home');

    }

});

// =======================
// SERVICES
// =======================

router.get('/services', (req, res) => {

    try {

        res.render('services');

    } catch (err) {

        console.log(err);

        res.send('Gagal membuka services');

    }

});

// =======================
// TESTIMONIAL
// =======================

router.get('/testimonial', async (req, res) => {

    try {

        const testimonials =
        await Testimonial.find()
        .sort({ createdAt: -1 });

        res.render('testimonial', {
            testimonials
        });

    } catch (err) {

        console.log(err);

        res.send('Gagal membuka testimonial');

    }

});

// =======================
// TAMBAH TESTIMONIAL
// =======================

router.get('/testimonial/add', (req, res) => {

    res.render('addTestimonial');

});

router.post('/testimonial/add', async (req, res) => {

    try {

        const {
            client_nama,
            dukun_nama,
            review,
            rating
        } = req.body;

        const newTestimonial =
        new Testimonial({

            client_nama,
            dukun_nama,
            review,
            rating

        });

        await newTestimonial.save();

        res.redirect('/testimonial');

    } catch (err) {

        console.log(err);

        res.send('Gagal tambah testimonial');

    }

});

// =======================
// FORM BOOKING
// =======================

router.get('/add', (req, res) => {

    try {

        res.render('add');

    } catch (err) {

        console.log(err);

        res.send('Gagal membuka form booking');

    }

});

// =======================
// SIMPAN BOOKING
// =======================

router.post('/add', async (req, res) => {

    try {

        const {

            client_nama,
            dukun_nama,
            jasa,
            tanggal,
            status

        } = req.body;

        const newBooking =
        new Booking({

            client_nama,
            dukun_nama,
            jasa,
            tanggal,

            status:
            status || 'diproses'

        });

        await newBooking.save();

        res.redirect('/home');

    } catch (err) {

        console.log(err);

        res.send('Gagal tambah booking');

    }

});

// =======================
// PAYMENT
// =======================

router.get('/payment', (req, res) => {

    try {

        res.render('payment');

    } catch (err) {

        console.log(err);

        res.send('Gagal membuka payment');

    }

});

// =======================
// LOGIN ADMIN
// =======================

router.get('/admin/login', (req, res) => {

    res.render('adminLogin');

});

router.post('/admin/login', (req, res) => {

    const {
        username,
        password
    } = req.body;

    if (

        username === 'admin'
        &&
        password === '123'

    ) {

        req.session.user = username;

        return res.redirect(
            '/admin/dashboard'
        );

    }

    res.send('Login gagal');

});

// =======================
// LOGOUT
// =======================

router.get('/logout', (req, res) => {

    req.session.destroy();

    res.redirect('/admin/login');

});

// =======================
// DASHBOARD ADMIN
// =======================

router.get(
'/admin/dashboard',

isLogin,

async (req, res) => {

    try {

        const bookings =
        await Booking.find()
        .sort({ createdAt: -1 });

        res.render('index', {
            bookings
        });

    } catch (err) {

        console.log(err);

        res.send('Gagal membuka dashboard');

    }

});

// =======================
// EDIT BOOKING
// =======================

router.get(
'/edit/:id',

isLogin,

async (req, res) => {

    try {

        const booking =
        await Booking.findById(
            req.params.id
        );

        res.render('edit', {
            booking
        });

    } catch (err) {

        console.log(err);

        res.send('Gagal membuka edit');

    }

});

// =======================
// UPDATE BOOKING
// =======================

router.post(
'/edit/:id',

isLogin,

async (req, res) => {

    try {

        const {

            client_nama,
            dukun_nama,
            jasa,
            tanggal,
            status

        } = req.body;

        await Booking.findByIdAndUpdate(

            req.params.id,

            {

                client_nama,
                dukun_nama,
                jasa,
                tanggal,
                status

            }

        );

        res.redirect(
            '/admin/dashboard'
        );

    } catch (err) {

        console.log(err);

        res.send('Gagal update booking');

    }

});

// =======================
// DELETE BOOKING
// =======================

router.get(
'/delete/:id',

isLogin,

async (req, res) => {

    try {

        await Booking.findByIdAndDelete(
            req.params.id
        );

        res.redirect(
            '/admin/dashboard'
        );

    } catch (err) {

        console.log(err);

        res.send('Gagal hapus booking');

    }

});

// =======================
// PAYMENT ADMIN
// =======================

router.get(
'/admin/payment',

isLogin,

async (req, res) => {

    try {

        const payments =
        await Payment.find()
        .sort({ createdAt: -1 });

        res.render('paymentAdmin', {
            payments
        });

    } catch (err) {

        console.log(err);

        res.send('Gagal membuka payment admin');

    }

});

// =======================
// EXPORT
// =======================

module.exports = router;