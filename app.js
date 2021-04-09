require('dotenv').config();
const express = require('express')
const app = express()
const hbs = require('hbs');
require('./hbs/helpers');
const port = process.env.PORT || 3000;
app.set('view engine','hbs')
app.use (express.static('public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/fragmentos');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/inicio', (req, res) => {
    res.render('inicio');
});

app.listen(port)
