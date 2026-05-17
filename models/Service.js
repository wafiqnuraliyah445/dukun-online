const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

    nama_jasa: {

        type: String,

        required: true

    },

    nama_dukun: {

        type: String,

        required: true

    },

    deskripsi: {

        type: String,

        required: true

    },

    harga_jasa: {

        type: Number,

        required: true

    }

}, {

    timestamps: true

});

module.exports = mongoose.model(
    'Service',
    serviceSchema,
    'services'
);