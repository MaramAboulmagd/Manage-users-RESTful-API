const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/login.html', function (req, res) {
    res.sendFile( __dirname + "/" + "views/login.html" );
 })

 app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "views/home.html" );
 })

 app.get('/Home.html', function (req, res) {
    res.sendFile( __dirname + "/" + "views/home.html" );
 })

 app.post('/Logout.html', function (req, res) {
    res.sendFile( __dirname + "/" + "views/home.html" );
 })



module.exports=app;
