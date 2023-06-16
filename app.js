/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Modified by: Hannah Del Real
; Date:   22 April 2023
; Description: App.js file in WEB 420 RESTful APIs Repository
;===========================================
*/
const express = require('express');
const http = require('http');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose =require('mongoose');

// Set app to use express function. 
let app = express();

// Set the port to 3000
const PORT = process.env.PORT || 3000;

// Set app to use express.json()
app.use(express.json());

//Set app to use express.urlencoded
app.use(express.urlencoded({ extended: true }));

// Set up the routing for /api endpoints
const composerAPI =  require('./routes/delreal-composer-routes');

app.use('/api', composerAPI);

// Connect to MongoDB
const conn = 'mongodb+srv://web420_user:s3cret@bellevueuniversity.ozktyyu.mongodb.net/web420DB?retryWrites=true&w=majority';

// Verify server is connected to database
mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Connection to MongoDB Atlas was successful!');
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
})


// Create an object literal named options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    // this indicates the files containing annotations for the OpenAPI specification 
    apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options); 

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));

//listen on port 3000.
http.createServer(app).listen(PORT, function() {
    console.log("Application started listening on PORT " + PORT);
})
