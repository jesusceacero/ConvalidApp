'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
    name: {type: String},
    acronym: {type: String},
    modules: [{type: Schema.ObjectId, ref: 'Module'}]
});

module.exports = mongoose.model('Course', courseSchema);