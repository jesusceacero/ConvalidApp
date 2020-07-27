'use strict'

const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Register = require('../models/register');
const error_types = require('./error_types');
const _ = require('lodash');
var nodemailer = require('nodemailer');

let controller = {

    register: (req, res, next) => {
        User.find({ email: req.body.email }, (err, result) => {
            if (result.length > 0) next(new error_types.Error400("El usuario ya existe"));
            else {
                let pass = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
                let user = new User({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    role: req.body.role,
                    password: pass,
                    birthdate: req.body.birthdate,
                    permissions: req.body.permissions,
                    photo: null,
                    course: req.body.course,
                    convalidados: req.body.convalidados,
                    extras: req.body.extras,
                    imparte: req.body.imparte
                });

                user.save((err, user) => {
                    if (err) next(new error_types.Error400(err.message));

                    const payload = {
                        sub: user.id,
                        exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                        email: user.email
                    };

                    let regis = new Register({
                        user: user
                    });

                    regis.save((err, reg) => {
                        var transporter = nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'convalidapp@gmail.com',
                                pass: 'proyecto2dam.'
                            }
                        });
                        var mailOptions = {
                            from: 'convalidapp@gmail.com',
                            to: req.body.email,
                            subject: 'Registro ConvalidApp',
                            text: 'Hola ' + req.body.fullname + '\n\nBienvenido a ConvalidApp. \n\nLe secrivimos este email para que pueda terminar su registro en nuestra App y de esta manera poder disfrutar de ella.\n\n Para poder disfrutar de nuestros servicios devera de terminar su registro en el siguiente enlace:\n\n http://localhost:4200/register/' + reg.id
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log("Email sent");
                            }
                        });
                    })
                    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM });

                    res.status(201).json({
                        user: user,
                        token: token
                    });
                });
            }
        });
    },

    login: (req, res, next) => {
        passport.authenticate("local", { session: false }, (error, user) => {

            if (error || !user) next(new error_types.Error404("El usuario o la contraseña son incorrectos"))
            else {
                const payload = {
                    sub: user.id,
                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                    email: user.email
                };
                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM });
                res.json({
                    usuario: {
                        id: user._id,
                        name: user.fullname,
                        email: user.email,
                        role: user.role,
                        birthdate: user.birthdate,
                        permissions: user.permissions,
                        photo: user.photo
                    },
                    token: token
                });
            }
        })(req, res)
    },

    addUser: (req, res) => {

        let pass = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));

        let user = new User({
            fullname: req.body.fullname,
            role: req.body.role,
            password: pass,
            birthdate: req.body.birthdate,
            permissions: req.body.permissions,
            photo: req.body.photo,
            modules: req.body.module,
        });

        user.save()
            .then(t => res.status(201).json(t))
            .catch(err => res.send(500).json(err.message));
    },

    findAll: (req, res) => {
        User.find((err, user) => {
            if (err) res.send(500).json(err.message);
            res.status(200).json(user);
        });
    },

    findAllProfesor: (req, res) => {
        User.find({ role: "PROFESOR" }, (err, user) => {
            if (err) res.send(500).json(err.message);
            res.status(200).json(user);
        });
    },

    findAllUser: (req, res) => {
        User.find({ role: "USER" }, (err, user) => {
            if (err) res.send(500).json(err.message);
            res.status(200).json(user);
        });
    },

    findOne: (req, res) => {
        User.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404);
            }
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404);
            }
            return res.status(500);
        });
    },

    updateUser: (req, res) => {
        let pass = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));

        User.findByIdAndUpdate(req.params.id, {
            fullname: req.body.fullname,
            birthdate: req.body.birthdate
        }, { new: true })
            .then(user => {
                if (!user) {
                    return res.status(404);
                }
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404);
                }
                return res.status(500);
            });
    },

    deleteUser: (req, res) => {
        User.findByIdAndRemove(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404);
                }
                res.send({ message: "Usuario borrado correctamente" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404);
                }
                return res.status(500);
            });
    },

    updatePassword: (req, res, next) => {
        let pass = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
        User.findById(req.params.id)
        .then(user => {
            if (user.email != req.body.email) {
                next(new error_types.EmailError("Error al introducir el email."));
            } else {
            user.set({password: pass}).save()
            res.status(201).json(user)
            }
        }).catch(err => res.send(500).json(err.message));
    },

    findAllUserConvProfesor: (req, res) => {
        User.find({ convalidados: { $in: [req.params.id] } }, (err, user) => {
            if (err) res.send(500).json(err.message);
            res.status(200).json(user);
        });
    },

    updateImg: (req, res) => {
        User.findById(req.params.id)
            .then(user => {
                user.photo = {
                    data: req.file.buffer.toString('base64'),
                    contentType: req.file.mimetype
                }
                res.status(200).json(user)
                return user.save()
            }).catch(err => res.send(500).json(err.message));
    },

    getImage: (req, res) => {
        User.findById(req.params.id)
            .then(user => {
                if (user.photo != undefined) {
                    res.contentType(user.photo.contentType)
                    res.send(Buffer.from(user.photo.data, 'base64'))
                } else {
                    res.sendStatus(404)
                }
            }).catch(err => res.send(500).json(err.message));
    },

    deleteImg: (req, res) => {
        User.findById(req.params.id)
        .then(user => {
            if (user._id == req.params.id) {
                user.photo = null;
                res.sendStatus(204)
                return user.save();
            } else {
                res.sendStatus(404)
            }
        }).catch(err => res.send(500).json(err.message));
    },

    getregister: (req, res) => {
        Register.findById(req.params.id)
            .then(regis => regis.populate({
                path: 'user',
                model: 'User'
            }).execPopulate())
            .then(reg => {
                if (!reg) {
                    return res.status(404);
                }
                res.status(200).json(reg);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404);
                }
                return res.status(500);
            });
    },
    registerEnd: (req, res) => {
        Register.findById(req.params.id)
            .then(regis => regis.populate({
                path: 'user',
                model: 'User'
            }).execPopulate())
            .then(regi => {
                if (!regi) {
                    return res.status(404);
                }
                let pass = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
                User.findByIdAndUpdate(regi.user._id, {
                    password: pass,
                    birthdate: req.body.birthdate,
                }, { new: true })
                    .then(user => {
                        if (!user) {
                            return res.status(404);
                        }
                        res.send(user);
                    });
                Register.findByIdAndDelete(regi._id)
                .then(r => {
                    console.log("registro de usuario borrado");
                })
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404);
                }
                return res.status(500);
            });
    }
}

module.exports = controller;