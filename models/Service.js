const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

    nama_jasa: String,

    durasi_hari: Number,

    efek_samping: String,

    harga_jasa: Number

});

module.exports =
mongoose.model(
    'Service',
    serviceSchema
);