const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

    nama_jasa: String,

    nama_dukun: String,

    deskripsi: String,

    harga_jasa: Number

});

module.exports =
mongoose.model(
    'Service',
    serviceSchema
);