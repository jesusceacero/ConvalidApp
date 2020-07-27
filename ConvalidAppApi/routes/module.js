'use strict'

var express = require('express');
var router = express.Router();
const moduleController = require('../controllers/module');
const adminrMiddleware = require('../middleware/has_role_admin');
const authMiddleware = require("../middleware/auth");


router.post('/add',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin, moduleController.addModule);
router.get('/',authMiddleware.ensureAuthenticated,moduleController.findAll);
router.get('/:id',authMiddleware.ensureAuthenticated,moduleController.findOne);
router.put('/edit/:id',authMiddleware.ensureAuthenticated,moduleController.updateModule);
router.delete('/delete/:id',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin,moduleController.deleteMolude);
router.post('/list',authMiddleware.ensureAuthenticated,moduleController.findListCourse);

module.exports = router;