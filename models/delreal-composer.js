/*
============================================
; Title:  delreal-composer.js
; Author: Hannah Del Real
; Date:   14 June 2023
; Description: Composer Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let composerSchema =  new Schema({
    firstName: { type: String },
    lastName: { type: String }
});

module.exports = mongoose.model('Composer', composerSchema);