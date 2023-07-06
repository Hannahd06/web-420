/*
============================================
; Title:  delreal-customer.js
; Author: Hannah Del Real
; Date:   5 July 2023
; Description: Customer Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create lineItem Schema
let lineItemSchema =  new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});

// Create invoiceSchema
let invoiceSchema =  new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema]
});

// Create customerSchema
let customerSchema =  new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema]
});

module.exports = mongoose.model('Customer', customerSchema);