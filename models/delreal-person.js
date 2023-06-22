/*
============================================
; Title:  delreal-person.js
; Author: Hannah Del Real
; Date:   21 June 2023
; Description: Person Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create and define a roleSchema
let roleSchema =  new Schema({
    text: { type: String }
});

// Create and define a dependentSchema
let dependentSchema =  new Schema({
    firstName: { type: String },
    lastName: { type: String }
});

// Create and define a personSchema

let personSchema =  new Schema({
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String }
});

module.exports = mongoose.model('Person', personSchema);