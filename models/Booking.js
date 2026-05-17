const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    client_nama: String,

    dukun_nama: String,

    jasa: String,

    harga: Number,

    tanggal: String,

    status: String

}, {

    timestamps: true

});

module.exports =
mongoose.model(
    'Booking',
    bookingSchema
);