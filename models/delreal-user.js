/*
============================================
; Title:  delreal-user.js
; Author: Hannah Del Real
; Date:   28 June 2023
; Description: User Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema =  new Schema({
    userName: { type: String },
    Password: { type: String },
    emailAddress: { type: Array }
});

module.exports = mongoose.model('User', userSchema);