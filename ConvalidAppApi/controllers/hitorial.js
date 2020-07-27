'use strict'

const Historial = require('../models/historial');

let controller = {
    addHistorial: (req, res) => {
        let histo = new Historial({
            user : req.body.user,
            module : req.body.module,
            horario : req.body.horario,
            fechayhora : new Date()
        });
        histo.save()
        .then(historial => res.status(201).json(historial))
        .catch(err => res.sen(500).json(err.message))
    },
    findAll : (req , res) => {
        Historial.find((err, historial) => {
            if(err) res.send(500).json(err.message);
            res.status(200).json(historial);
        });
    },
    findOne : (req, res) => {
        Historial.findById(req.params.id)
        .then(historial => {
            if(!historial){
                return res.status(404);
            }
            res.status(200).json(historial);
        }).catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404);
            }
            return res.status(500);
        });
    },
    updateHistorial : (req ,res) => {
        Historial.findByIdAndUpdate(req.params.id, {
            user : req.body.user,
            module : req.body.module,
            horario : req.body.horario,
        }, {new: true})
        .then(historial => {
            if(!historial){
                return res.status(404);
            }
            res.send(historial);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404);
            }
            return res.status(500); 
        });
    },
    deleteHistorial: (req,res) => {
        Historial.findOneAndRemove(req.params.id)
        .then(historial => {
            if(!historial){
                return res.status(404);
            }
            res.send({message: "Historial borrado correctamente"});;
        }).catch(err => {
            if(err.kind === 'ObjectId'|| err.name === 'NotFound') {
                return res.status(404);
            }
            return res.status(500);
        });
    }
};

module.exports = controller;