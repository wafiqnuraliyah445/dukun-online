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
app.set('views', path.join(__dirname, 'views'));

// =======================
// BODY PARSER
// =======================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// =======================
// SESSION
// =======================

app.use(
    session({
        secret: 'dukun_secret',
        resave: false,
        saveUninitialized: false
    })
);

// =======================
// MONGODB
// =======================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.log(err);
    });

// =======================
// MIDDLEWARE LOGIN ADMIN
// =======================

function isLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

// =======================
// ROUTES
// =======================

const bookingRoutes = require('./routes/bookingRoutes');

app.use('/', bookingRoutes);

// =======================
// ADMIN LOGIN PAGE
// =======================

app.get('/admin/login', (req, res) => {
    res.render('adminLogin');
});

// =======================
// PROCESS LOGIN ADMIN
// =======================

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '123') {
        req.session.user = username;
        return res.redirect('/admin/dashboard');
    }

    res.send('❌ Login gagal');
});

// =======================
// ADMIN DASHBOARD
// =======================

app.get('/admin/dashboard', isLogin, (req, res) => {
    res.send('✅ Admin Dashboard');
});

// =======================
// LOGOUT
// =======================

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
});

// =======================
// HOME REDIRECT
// =======================

app.get('/', (req, res) => {
    res.redirect('/home');
});

// =======================
// SERVER
// =======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`);
});