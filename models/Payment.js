const mongoose = require('mongoose');

const paymentSchema =
new mongoose.Schema({

    booking_id: {

        type:
        mongoose.Schema.Types.ObjectId,

        ref: 'Booking'

    },

    client_nama: String,

    jumlah: Number,

    metode: String,

    status: {

        type: String,

        default: 'pending'

    },

    tanggal_bayar: String

});

module.exports =
mongoose.model(
    'Payment',
    paymentSchema
);