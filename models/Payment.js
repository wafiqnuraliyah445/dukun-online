const mongoose = require('mongoose');

const paymentSchema =
new mongoose.Schema({

    booking_id: String,

    client_nama: String,

    jumlah: Number,

    metode: String,

    status: String,

    tanggal_bayar: String

}, {

    timestamps: true

});

module.exports =
mongoose.model(
    'Payment',
    paymentSchema
);