'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new mongoose.Schema({
    name: {type: String},
    acronym: {type: String},
    teacher: {type: Schema.Types.ObjectId, ref: 'User'},
    horario: [{type: Schema.Types.ObjectId, ref: 'Schedule'}],
    course: {type: Schema.Types.ObjectId, ref: 'Course'}
});

module.exports = mongoose.model('Module', moduleSchema);