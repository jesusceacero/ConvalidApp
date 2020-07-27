var express = require('express');
var router = express.Router();
const courseController = require('../controllers/course');

const authMiddleware = require("../middleware/auth");
const adminrMiddleware = require('../middleware/has_role_admin');


router.post('/add',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin, courseController.addCourse);
router.get('/',authMiddleware.ensureAuthenticated,courseController.findAll);
router.get('/:id',authMiddleware.ensureAuthenticated,courseController.findOne);
router.put('/edit/:id',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin,courseController.updateCourse);
router.delete('/delete/:id',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin,courseController.deleteCourse);

module.exports = router;