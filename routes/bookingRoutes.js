const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');
const Testimonial = require('../models/Testimonial');
const Service = require('../models/Service');
const Payment = require('../models/Payment');

// =======================
// USER HOME
// =======================

router.get('/home', (req, res) => {

    res.render('home');

});

// =======================
// ADMIN DASHBOARD
// =======================

router.get('/dashboard', async (req, res) => {

    try {

        const bookings =
        await Booking.find()
        .sort({ createdAt: -1 });

        res.render('index', {
            bookings
        });

    } catch (err) {

        console.error(err);

        res.status(500).send(
            "Gagal mengambil booking"
        );

    }

});

// =======================
// SERVICES PAGE
// =======================

router.get('/services', async (req, res) => {

    try {

        const services =
        await Service.find();

        res.render('services', {
            services
        });

    } catch (err) {

        console.error(err);

        res.status(500).send(
            "Gagal mengambil services"
        );

    }

});

// =======================
// FORM ADD BOOKING
// =======================

router.get('/add', async (req, res) => {

    try {

        const services =
        await Service.find();

        const selectedService =
        req.query.service || '';

        res.render('add', {

            services,
            selectedService

        });

    } catch (err) {

        console.error(err);

        res.send(
            "Gagal membuka form booking"
        );

    }

});

// =======================
// SAVE BOOKING
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

        if (
            !client_nama ||
            !dukun_nama ||
            !jasa ||
            !tanggal
        ) {

            return res.status(400).send(
                "Semua field wajib diisi!"
            );

        }

        // cari service
        const selectedService =
        await Service.findOne({
            nama_jasa: jasa
        });

        if (!selectedService) {

            return res.status(404).send(
                "Service tidak ditemukan"
            );

        }

        const newBooking =
        new Booking({

            client_nama:
            client_nama.trim(),

            dukun_nama:
            dukun_nama.trim(),

            jasa:
            jasa.trim(),

            // FIX HARGA
            harga:
            selectedService.harga_jasa,

            tanggal,

            status:
            status || 'diproses'

        });

        await newBooking.save();

        console.log(
            "✅ Booking berhasil"
        );

        res.redirect(
            `/payment/${newBooking._id}`
        );

    } catch (err) {

        console.error(err);

        res.status(500).send(
            "Gagal tambah booking"
        );

    }

});

// =======================
// EDIT BOOKING
// =======================

router.get('/edit/:id', async (req, res) => {

    try {

        const booking =
        await Booking.findById(
            req.params.id
        );

        const services =
        await Service.find();

        if (!booking) {

            return res.status(404).send(
                "Booking tidak ditemukan"
            );

        }

        res.render('edit', {

            booking,
            services

        });

    } catch (err) {

        console.error(err);

        res.status(500).send(
            "Gagal membuka edit"
        );

    }

});

router.post('/edit/:id', async (req, res) => {

    try {

        const {

            client_nama,
            dukun_nama,
            jasa,
            tanggal,
            status

        } = req.body;

        const selectedService =
        await Service.findOne({
            nama_jasa: jasa
        });

        await Booking.findByIdAndUpdate(

            req.params.id,

            {

                client_nama:
                client_nama.trim(),

                dukun_nama:
                dukun_nama.trim(),

                jasa:
                jasa.trim(),

                // FIX HARGA
                harga:
                selectedService.harga_jasa,

                tanggal,

                status:
                status.trim()

            }

        );

        console.log(
            "✅ Booking berhasil diupdate"
        );

        res.redirect('/dashboard');

    } catch (err) {

        console.error(err);

        res.status(500).send(
            "Gagal update booking"
        );

    }

});

// =======================
// DELETE BOOKING
// =======================

router.get('/delete/:id', async (req, res) => {

    try {

        await Booking.findByIdAndDelete(
            req.params.id
        );

        console.log(
            "🗑️ Booking berhasil dihapus"
        );

        res.redirect('/dashboard');

    } catch (err) {

        console.error(err);

        res.status(500).send(
            "Gagal hapus booking"
        );

    }

});

// =======================
// RESET BOOKING
// =======================

router.get('/reset', async (req, res) => {

    try {

        await Booking.deleteMany({});

        console.log(
            "🗑️ Semua booking dihapus"
        );

        res.redirect('/dashboard');

    } catch (err) {

        console.error(err);

        res.status(500).send(
            "Gagal reset booking"
        );

    }

});

// =======================
// PAYMENT PAGE
// =======================

router.get('/payment/:id', async (req, res) => {

    try {

        const booking =
        await Booking.findById(
            req.params.id
        );

        if (!booking) {

            return res.status(404).send(
                "Booking tidak ditemukan"
            );

        }

        res.render('payment', {

            booking,

            jumlah:
            booking.harga || 0

        });

    } catch (err) {

        console.error(err);

        res.status(500).send(
            "Gagal membuka payment"
        );

    }

});

// =======================
// SAVE PAYMENT
// =======================

router.post('/payment', async (req, res) => {

    try {

        const {

            booking_id,
            metode

        } = req.body;

        const booking =
        await Booking.findById(
            booking_id
        );

        if (!booking) {

            return res.status(404).send(
                "Booking tidak ditemukan"
            );

        }

        const newPayment =
        new Payment({

            booking_id:
            booking._id,

            client_nama:
            booking.client_nama,

            jumlah:
            booking.harga,

            metode,

            status: 'pending',

            tanggal_bayar:
            new Date()
            .toISOString()
            .split('T')[0]

        });

        await newPayment.save();

        console.log(
            "✅ Payment berhasil"
        );

        res.redirect('/home');

    } catch (err) {

        console.error(err);

        res.status(500).send(
            "Gagal payment"
        );

    }

});

// =======================
// PAYMENT ADMIN
// =======================

router.get('/payment-admin', async (req, res) => {

    try {

        const payments =
        await Payment.find()
        .sort({ createdAt: -1 });

        res.render('paymentAdmin', {
            payments
        });

    } catch (err) {

        console.error(err);

        res.status(500).send(
            'Gagal mengambil payment'
        );

    }

});

// =======================
// TESTIMONIAL PAGE
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

        console.error(err);

        res.status(500).send(
            "Gagal mengambil testimonial"
        );

    }

});

// =======================
// ADD TESTIMONIAL FORM
// =======================

router.get('/testimonial/add', (req, res) => {

    res.render('addTestimonial');

});

// =======================
// SAVE TESTIMONIAL
// =======================

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

            client_nama:
            client_nama.trim(),

            dukun_nama:
            dukun_nama.trim(),

            review:
            review.trim(),

            rating

        });

        await newTestimonial.save();

        console.log(
            "✅ Testimonial berhasil"
        );

        res.redirect('/testimonial');

    } catch (err) {

        console.error(err);

        res.status(500).send(
            "Gagal tambah testimonial"
        );

    }

});

module.exports = router;