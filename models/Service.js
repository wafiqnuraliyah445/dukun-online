const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

    nama_jasa: String,

    harga_jasa: Number,

    durasi_hari: Number,

    efek_samping: String

});

module.exports =
mongoose.model(
    'Service',
    serviceSchema
);