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
