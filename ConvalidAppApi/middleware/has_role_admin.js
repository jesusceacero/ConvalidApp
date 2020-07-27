'use strict'

const passport = require('passport');

let middlewares = {
    
    ensureAdmin: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (info) { return next(new error_types.Error401(info.message)); }
            if (err) { return next(err); }
            if (user.role != "ADMIN") { return next(new error_types.Error403("You are not allowed to access.")); }
            req.user = user;
            next();
        })(req, res, next);
    }
}
    
module.exports = middlewares;