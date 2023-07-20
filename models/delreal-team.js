/*
============================================
; Title:  delreal-team.js
; Author: Hannah Del Real
; Date:   17 July 2023
; Description: Team Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let playerSchema =  new Schema({
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number }
});

let teamSchema =  new Schema({
    name: { type: String },
    mascot: { type: String },
    players: [playerSchema]
});

module.exports = mongoose.model('Team', teamSchema);