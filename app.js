const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.get('/', (req, res) =>{
    res.sendFile('index.html', {root: './static'});
});

app.get('/login', (req, res) =>{
    res.sendFile('login.html', {root: './static'});
});

app.get('/register', (req, res) =>{
    res.sendFile('register.html', {root: './static'});
});

app.get('/bands', (req, res) =>{
    res.sendFile('bands.html', {root: './static'});
});

app.get('/concerts', (req, res) =>{
    res.sendFile('concerts.html', {root: './static'});
});

app.get('/venues', (req, res) =>{
    res.sendFile('venues.html', {root: './static'});
});

app.get('/reservations', (req, res) =>{
    res.sendFile('reservations.html', {root: './static'});
});

app.get('/users', (req, res) =>{
    res.sendFile('users.html', {root: './static'});
});

app.use(express.static(path.join(__dirname, 'static')));
app.listen(8080);