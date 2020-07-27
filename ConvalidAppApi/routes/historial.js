var express = require('express');
var router = express.Router();
const historialController = require('../controllers/hitorial');

const authMiddleware = require("../middleware/auth");
const adminrMiddleware = require('../middleware/has_role_admin');

router.post('/add',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin,historialController.addHistorial);
router.get('/',authMiddleware.ensureAuthenticated,historialController.findAll);
router.get('/:id',authMiddleware.ensureAuthenticated,historialController.findOne);
router.put('/edit/:id',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin,historialController.updateHistorial);
router.delete('/delete/:id',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin,historialController.deleteHistorial);

module.exports = router;