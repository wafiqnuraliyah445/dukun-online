const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({

    client_nama: String,

    dukun_nama: String,

    review: String,

    rating: Number

},
{
    timestamps: true,
    collection: 'testimonials'
});

module.exports = mongoose.model(
    'Testimonial',
    testimonialSchema
);