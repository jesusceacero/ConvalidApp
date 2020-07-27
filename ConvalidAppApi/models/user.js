'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = new Schema({
    data: String, 
    contentType: String
});

const userSchema = new mongoose.Schema({
    email: {type: String},
    fullname: {type: String},
    role: {type: String, enum: ['USER', 'CONSERJE','PROFESOR', 'ADMIN'], default: "USER"},
    password: {type: String},
    birthdate: {type: String},
    permissions: {type: Boolean, default: false},
    photo: imgSchema,
    course: {type: Schema.ObjectId, ref: 'Course'},
    convalidados: [{type: Schema.ObjectId, ref: 'Module'}],
    extras: [{type: Schema.ObjectId, ref: 'Module'}],
    imparte: [{type: Schema.ObjectId, ref: 'Module'}]
});

module.exports = mongoose.model('User', userSchema);