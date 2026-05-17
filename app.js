const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const path = require('path');

const session = require('express-session');

const app = express();

// =======================
// VIEW ENGINE
// =======================

app.set('view engine', 'ejs');

app.set(
    'views',
    path.join(__dirname, 'views')
);

// =======================
// BODY PARSER
// =======================

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// =======================
// SESSION
// =======================

app.use(session({

    secret: 'dukun_secret',

    resave: false,

    saveUninitialized: false

}));

// =======================
// MONGODB
// =======================

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


// =======================
// USER ROUTES
// =======================

const bookingRoutes =
require('./routes/bookingRoutes');

// USER SIDE
app.use('/',
bookingRoutes);


// =======================
// SERVER
// =======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`);
});

app.get('/',
(req,res)=>{

    res.redirect('/home');

});

