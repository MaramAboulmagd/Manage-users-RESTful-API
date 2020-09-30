const express = require('express');
const app = express();
const fs  = require('fs');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions={
   swaggerDefinition: {
      info: {
         title: "Manage Users",
         description: "Add, delete, update and view users",
      },
     servers: ["http://localhost:3000"]
   },
   apis: ['app.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


/**
 * @swagger
 * /listUsers:
 *   get:
 *     description: list all users 
 *   
 */
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})



app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user" + req.body.user.id] = req.body.user;
      fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data, null, 4), function (err)   {
         if (err) 
         return console.log(err);  
      });
      console.log( data);
      res.json( data);
   });
})


/**
 * @swagger
 * /:id:
 *   get:
 *     description: get user with a specific id 
 * Parameters: id
 *   
 */
app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})


app.delete('/deleteUser/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + req.params.id];
      fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data, null, 4), function (err)   {
         if (err) 
         return console.log(err);  
      });

      res.end( JSON.stringify(data));
   });
})

app.patch('/editUser/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user" + req.params.id]=req.body.user;
      fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data, null, 4), function (err)   {
         if (err) 
         return console.log(err);  
      });

      res.end( JSON.stringify(data));
   });
})
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
