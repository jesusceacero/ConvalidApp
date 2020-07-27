'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new mongoose.Schema({
    dia: {type: String, enum: ['Lunes', 'Martes','Miercoles', 'Jueves', 'Viernes']},
    hora: {type: String, enum: ['8:00', '9:00','10:00', '11:30', '12:30', '13:30']}
});

module.exports = mongoose.model('Schedule', scheduleSchema);