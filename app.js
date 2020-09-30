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
     servers: ["http://localhost:3000","https://pyranova.herokuapp.com/"]
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

/**
 * @swagger
 *  /addUser:
*     post:
*        summary: Add a user
*        parameters:
*         - in: body
*           name: user
*           description: The user to create.
*           schema:
*                 type: object
*                 required:
*                    - user
*                    - id
*                 properties:
*                    user: 
*                       type: object
*                       properties:
*                          name:
*                             type: string
*                          password:
*                             type: string
*                          profession:
*                             type: string
*                          id:
*                             type: integer
 */


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
 *  /{id}:
*     get:
*        summary: Get a user by ID
*        parameters:
*         - in: path
*           name: id
*           schema:
*              type: integer
*              required: true
*              description: Numeric ID of the user to get
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

/**
 * @swagger
 *  /deleteUser/{id}:
*     delete:
*        summary: delete a user by ID
*        parameters:
*         - in: path
*           name: id
*           schema:
*              type: integer
*              required: true
*              description: Numeric ID of the user to get
 */
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

/**
 * @swagger
 *  /editUser/{id}:
*     patch:
*        summary: Edit user by id
*        parameters:
*         - in: path
*           name: id
*           schema:
*              type: integer
*              required: true
*              description: Numeric ID of the user to get
*       
*         - in: body
*           name: user
*           description: The user to create.
*           schema:
*                 type: object
*                 required:
*                    - user
*                    - id
*                 properties:
*                    user: 
*                       type: object
*                       properties:
*                          name:
*                             type: string
*                          password:
*                             type: string
*                          profession:
*                             type: string
*                          id:
*                             type: integer
 */

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
