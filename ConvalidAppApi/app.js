'use strict'

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
var logger = require('morgan');
const middleware = require('./middleware/auth');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/course');
var historialRouter = require('./routes/historial');
var modulesRouter = require('./routes/module');
var scheduleRouter = require('./routes/schedule');
const User = require('./models/user');

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Conectado!');
});

passport.use(new LocalStrategy((email, password, done) => {
  let busqueda = { email: email };
  User.findOne(busqueda, (err, user) => {
      if (err || !user) return done(null, false);
      if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
      }
      return done(null, user);
  });
}));

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  User.findById(jwt_payload.sub, (err, user) => {
      if (err) return done(null, false);
      else return done(null, user);
  });
}));

var app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())

app.use('/users', usersRouter);
app.use('/modules', modulesRouter);
app.use('/historial', historialRouter);
app.use('/courses', coursesRouter);
app.use('/schedules',scheduleRouter);
app.use(middleware.notFoundHandler);
app.use(middleware.errorHandler);


User.countDocuments({role: 'ADMIN'}, function(err, count){
  if (err) console.log(err)
  let pass = bcrypt.hashSync('123456', parseInt(process.env.BCRYPT_ROUNDS));
  if (count < 1) {
    User.create({
      fullname: 'Angel Naranjo',
      email: 'admin@triana.salesianos.edu',
      course: null,
      password: pass,
      role: 'ADMIN',
      permissions: true,
      photo: null,
      convalidados: [],
      extras: [],
      imparte: []
    })
    .then((user) => console.log('Usuario admin creado'))
    .catch(err)
  } else
    console.log('Ya existe un usuario administrador')
})
module.exports = app;
