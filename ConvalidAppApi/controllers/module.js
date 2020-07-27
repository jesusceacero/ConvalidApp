'use strict'

const Module = require('../models/module');
const Course = require('../models/course');
const User = require('../models/user');

let controller ={

    addModule: (req, res) =>{
        let modu = new Module({
            name: req.body.name,
            acronym: req.body.acronym,
            teacher: req.body.teacher,
            horario: req.body.horario,
            course : req.body.course
        });
        modu.save()
        .then(modulo => modulo.populate({
            path:'horario',
            model: 'Schedule',
        }).populate({
            path:'teacher',
            model: 'User',
        }).execPopulate())
        .then(modulo => {
            console.log(modulo)
            Course.findById(modulo.course)
            .then(cur =>{
                cur.modules.push(modulo._id);
                cur.save();
            })
            User.findById(modulo.teacher)
            .then(tea => {
                tea.imparte.push(modulo.id)
                tea.save();
            })
            res.status(201).json(modulo)
        })
        .catch(err => res.status(500).json(err.message))
    },
    findAll : (req, res) => {
        Module.find((err, curso) => {
            if(err) res.send(500).json(err.message);
            res.status(200).json(curso);
        }).populate({
            path: 'horario',
            model:'Schedule'
        })
        .populate({
            path: 'teacher',
            model:'User'
        });
    },
    findOne : (req, res) => {
        Module.findById(req.params.id)
        .then(modulo => modulo.populate({
            path:'horario',
            model: 'Schedule',
        }).populate({
            path:'teacher',
            model: 'User',
        }).execPopulate())
        .then(modulo => {
            if(!modulo){
                return res.status(404);
            }
            res.status(200).json(modulo);
        }).catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404);
            }
            return res.status(500);
        });
    },
    updateModule : (req ,res) => {
        Module.findById(req.params.id)
        .then(mod=>{
            Module.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                acronym: req.body.acronym,
                teacher: req.body.teacher,
                horario: req.body.horario,
                course: req.body.course
            }, {new: true})
            .then(modulo => {
                if(!modulo){
                    return res.status(404);
                }
                Course.findById(mod.course)
                .then(cur =>{
                    const b = cur.modules.indexOf(mod._id)
                    cur.modules.splice(b,1);
                    cur.save();
                    Course.findById(req.body.course)
                    .then(curs => {
                        curs.modules.push(modulo._id);
                        curs.save();
                        });
                });
                User.findById(mod.user)
                .then(tea => {
                    const t = tea.imparte.indexOf(mod)
                    tea.imparte.splice(t,1);
                    tea.save();
                    User.findById(req.body.teacher)
                    .then(teac => {
                        teac.imparte.push(modulo._id)
                        teac.save();
                    });
                });
                res.send(modulo);
            });
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404);
            }
            return res.status(500); 
        });
    },
    deleteMolude: (req,res) => {
        Module.findByIdAndDelete(req.params.id)
        .then(modulo => {
            console.log(modulo);
            
            if(!modulo){
                return res.status(404);
            }
            Course.findById(modulo.course._id)
            .then(cur =>{
                
                console.log(cur);
                const b = cur.modules.indexOf(req.params.id)
                console.log(b);
                cur.modules.splice(b,1);
                console.log(cur)
                cur.save();
            });
            User.findById(modulo.teacher._id)
            .then(tea => {
                console.log(tea)
                const t = tea.imparte.indexOf(req.params.id)
                tea.imparte.splice(t,1);
                tea.save();
            })
            res.send({message: "Modulo borrado correctamente"});;
        }).catch(err => {
            if(err.kind === 'ObjectId'|| err.name === 'NotFound') {
                return res.status(404);
            }
            return res.status(500);
        });
    },
    findListCourse: (req, res) => {
        Module.find( { '_id' : { $in : req.body.modules }})
        .populate({
            path: 'horario',
            model:'Schedule'
        })
        .populate({
            path: 'teacher',
            model:'User'
        })
        .then(modulos => {
            if(!modulos){
                return res.status(404);
            }
            res.send(modulos);
        }).catch(err =>{
            if(err.kind === 'ObjectId') {
                return res.status(404);
            }
            return res.status(500);
        });
    }
};

module.exports = controller;