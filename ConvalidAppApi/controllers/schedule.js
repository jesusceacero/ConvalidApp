'use strict'

const Schedule = require('../models/schedule');

let controller ={
    addSchedule: (req, res) =>{
        let modu = new Schedule({
            dia: req.body.dia,
            hora: req.body.hora
        });
        modu.save()
        .then(m => res.status(201).json(m))
        .catch(err => res.status(500).json(err.message))
    },
    findAll : (req, res) => {
        Schedule.find((err, horario) => {
            if(err) res.send(500).json(err.message);
            res.status(200).json(horario);
        });
    },
    findOne: (req, res) => {
        Schedule.findById(req.params.id)
        .then(horario => {
            if(!horario){
                return res.status(404);
            }
            res.send(horario);
        }).catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404);
            }
            return res.status(500);
        });
    },
    updateSchedule: (req, res) => {
        Schedule.findByIdAndUpdate(req.params.id, {
            dia : req.body.dia,
            hora : req.body.hora
        }, {new: true})
        .then(horario => {
            if(!horario){
                return res.status(404);
            }
            res.send(horario);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404);
            }
            return res.status(500); 
        });
    },
    deleteSchedule: (req,res) => {
        Schedule.findByIdAndRemove(req.params.id)
        .then(horario => {
            if(!horario){
                return res.status(404);
            }
            res.send({message: "Horario borrado correctamente"});;
        }).catch(err => {
            if(err.kind === 'ObjectId'|| err.name === 'NotFound') {
                return res.status(404);
            }
            return res.status(500);
        });
    }
};

module.exports = controller;