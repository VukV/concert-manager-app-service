const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

function getCookies(req) {
    if(req.headers.cookie == null){
        return {};
    }

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next){
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if(token == null){
        return res.redirect(301, '/login');
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.redirect(301, '/login');
        }
    
        req.user = user;
        next();
    });
}

app.get('/', authToken, (req, res) =>{
    if(req.user.privilege === 'ADMIN' || req.user.privilege === 'MANAGER'){
        res.sendFile('index.html', {root: './static'});
    }
    res.status(401).send('Not authorized');
});

app.get('/login', (req, res) =>{
    res.sendFile('login.html', {root: './static'});
});

app.get('/register', (req, res) =>{
    res.sendFile('register.html', {root: './static'});
});

app.get('/bands', authToken, (req, res) =>{
    if(req.user.privilege === 'ADMIN' || req.user.privilege === 'MANAGER'){
        res.sendFile('bands.html', {root: './static'});
    }
    else{
        res.status(401).send('Not authorized');
    }
});

app.get('/concerts', authToken, (req, res) =>{
    if(req.user.privilege === 'ADMIN' || req.user.privilege === 'MANAGER'){
        res.sendFile('concerts.html', {root: './static'});
    }
    else{
        res.status(401).send('Not authorized');
    }
});

app.get('/venues', authToken, (req, res) =>{
    if(req.user.privilege === 'ADMIN' || req.user.privilege === 'MANAGER'){
        res.sendFile('venues.html', {root: './static'});
    }
    else{
        res.status(401).send('Not authorized');
    }
});

app.get('/reservations', authToken, (req, res) =>{
    if(req.user.privilege === 'ADMIN' || req.user.privilege === 'MANAGER'){
        res.sendFile('reservations.html', {root: './static'});
    }
    else{
        res.status(401).send('Not authorized');
    }
});

app.get('/users', authToken, (req, res) =>{
    if(req.user.privilege === 'ADMIN'){
        res.sendFile('users.html', {root: './static'});
    }
    else{
        res.status(401).send('Not authorized');
    }
});

app.get('/registration-success', (req, res) =>{
    res.sendFile('registration_success.html', {root: './static'});
});

app.use(express.static(path.join(__dirname, 'static')));
app.listen(8080);