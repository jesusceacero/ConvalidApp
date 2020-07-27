'use strict'

const Course = require('../models/course');
const Module = require('../models/module');

let controller = {
    addCourse: (req, res) => {
        let cour = new Course({
            name : req.body.name,
            acronym: req.body.acronym,
            modules: []
        });
        cour.save()
        .then(course => course.populate({
            path: 'modules',
            model: 'Module',
            populate: [{
                path: 'horario',
                model: 'Schedule'
            },{
                path: 'teacher',
                model: 'User'
            }]
        }).execPopulate())
        .then(course => res.status(201).json(course))
        .catch(err => res.send(500).json(err.message))
    },
    findAll: (req, res) =>{
        Course.find((err, curso) => {
            if(err) res.send(500).json(err.message);
            res.status(200).json(curso);
        });
    },
    findOne : (req, res) => {
        Course.findById(req.params.id)
        .then(curso => {
            if(!curso){
                return res.status(404);
            }
            res.status(200).json(curso);
        }).catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404);
            }
            return res.status(500);
        });
    },
    updateCourse : (req ,res) => {
        Course.findByIdAndUpdate(req.params.id, {
            name : req.body.name,
            acronym: req.body.acronym,
            modules: req.body.modules
        }, {new: true})
        .then(curso => {
            if(!curso){
                return res.status(404);
            }
            res.send(curso);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404);
            }
            return res.status(500); 
        });
    },
    deleteCourse: (req,res) => {
        Course.findByIdAndDelete(req.params.id)
        .then(curso => {
            if(!curso){
                return res.status(404);
            }
            Module.find( { '_id' : { $in : curso.modules }})
            .then(modulos => {
                console.log(modulos);
                modulos.forEach(element => {
                    element.course = null
                    element.save();
                });
            })
            res.send({message: "Curso borrado correctamente"});;
        }).catch(err => {
            if(err.kind === 'ObjectId'|| err.name === 'NotFound') {
                return res.status(404);
            }
            return res.status(500);
        });
    }
};

module.exports = controller;