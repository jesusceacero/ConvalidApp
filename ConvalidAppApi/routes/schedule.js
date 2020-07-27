var express = require('express');
var router = express.Router();
const scheduleController = require('../controllers/schedule');
const adminrMiddleware = require('../middleware/has_role_admin');
const authMiddleware = require("../middleware/auth");

router.post('/add',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin,scheduleController.addSchedule);
router.get('/',authMiddleware.ensureAuthenticated,scheduleController.findAll);
router.get('/:id',authMiddleware.ensureAuthenticated,scheduleController.findOne);
router.put('/edit/:id',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin,scheduleController.updateSchedule);
router.delete('/delete/:id',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin,scheduleController.deleteSchedule);

module.exports = router