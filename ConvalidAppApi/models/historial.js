'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new mongoose.Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    module: {type: Schema.ObjectId, ref: 'Module'},
    horario: {type: Schema.Types.ObjectId, ref: 'Schedule'},
    fechayhora: {type: Date}
});

module.exports = mongoose.model('Historial', scheduleSchema);